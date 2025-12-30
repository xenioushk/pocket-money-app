import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Page from "./Page"
import categoryService from "../../services/categoryService"
import { Category } from "../../types"
import loader from "../../loader.gif"
import { useToast } from "../../hooks/useToast"
import ConfirmDialog from "../base/ConfirmDialog"

const ManageCategories = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  })
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    variant?: "danger" | "warning" | "info"
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  })

  useEffect(() => {
    document.title = "Manage Categories | Pocket Money"

    if (!isAuthenticated || user?.role !== "admin") {
      window.location.href = "/"
      return
    }

    fetchCategories()
  }, [isAuthenticated, user])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const data = await categoryService.getCategories()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from name if name changes and not editing
      ...(name === "name" &&
        !editingCategory && {
          slug: value
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
        }),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData)
        toast.success("Category updated successfully!")
      } else {
        await categoryService.createCategory(formData)
        toast.success("Category created successfully!")
      }

      setFormData({ name: "", slug: "", description: "" })
      setShowForm(false)
      setEditingCategory(null)
      fetchCategories()
    } catch (error: any) {
      console.error("Failed to save category:", error)
      toast.error(error.message || "Failed to save category")
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    })
    setShowForm(true)
  }

  const handleDelete = (category: Category) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Category",
      message: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      variant: "danger",
      onConfirm: async () => {
        try {
          await categoryService.deleteCategory(category.id)
          toast.success("Category deleted successfully!")
          fetchCategories()
        } catch (error) {
          console.error("Failed to delete category:", error)
          toast.error("Failed to delete category")
        }
      },
    })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingCategory(null)
    setFormData({ name: "", slug: "", description: "" })
  }

  return (
    <Page title="Manage Categories">
      <div className="container px-4 mx-auto mt-6 md:px-0">
        <div className="card-modern p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-Green-500 to-Green-900 bg-clip-text text-transparent">Category Management</h1>
            <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-Green-500 to-Green-900 text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold">
              {showForm ? "Cancel" : "Add Category"}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-green-200 dark:border-green-800">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Gardening" className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="e.g., gardening" className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" required />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">URL-friendly version (auto-generated from name)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief description of the category" rows={3} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white resize-y" />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-Green-500 to-Green-900 text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold">
                    {editingCategory ? "Update Category" : "Create Category"}
                  </button>
                  <button type="button" onClick={handleCancel} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories List */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <img src={loader} alt="Loading..." className="w-16" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No categories found. Create your first category!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">/{category.slug}</p>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">{category.count || 0} jobs</span>
                  </div>

                  {category.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{category.description}</p>}

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(category)} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(category)} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} variant={confirmDialog.variant} onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
    </Page>
  )
}

export default ManageCategories
