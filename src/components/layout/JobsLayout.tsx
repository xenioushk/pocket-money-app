import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import categoryService from "../../services/categoryService"
import { Category } from "../../types"

interface JobsLayoutProps {
  children: React.ReactNode
  selectedCategoryId?: number
}

const JobsLayout = ({ children, selectedCategoryId }: JobsLayoutProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="container px-4 mx-auto mt-6 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Categories</h2>

            {isLoading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <nav className="space-y-2">
                {/* All Jobs Link */}
                <Link to="/" className={`block px-4 py-2 rounded-md transition ${!selectedCategoryId ? "bg-Green-500 text-white font-semibold" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                  <span className="flex items-center justify-between">
                    <span>All Jobs</span>
                    <span className="text-xs opacity-75">{categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}</span>
                  </span>
                </Link>

                {/* Category Links */}
                {categories.map((category) => (
                  <Link key={category.id} to={`/category/${category.id}`} className={`block px-4 py-2 rounded-md transition ${selectedCategoryId === category.id ? "bg-Green-500 text-white font-semibold" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                    <span className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-xs opacity-75">({category.count || 0})</span>
                    </span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </aside>

        {/* Jobs Content */}
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  )
}

export default JobsLayout
