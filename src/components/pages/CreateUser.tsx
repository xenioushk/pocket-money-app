import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import Page from "./Page"
import FormInput from "../form/FormInput"
import { useToast } from "../../hooks/useToast"

const CreateUser = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "user",
  })

  if (!isAuthenticated || user?.role !== "admin") {
    window.location.href = "/"
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create user")
      }

      toast.success("User created successfully!")
      navigate("/admin")
    } catch (error: any) {
      console.error("Error creating user:", error)
      toast.error(error.message || "Failed to create user. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Page title="Create New User">
      <div className="container px-4 mx-auto mt-6 md:px-0">
        <div className="max-w-2xl mx-auto card-modern p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput label="First Name" type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter first name" required />

            <FormInput label="Last Name" type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter last name" required />

            <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />

            <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-Green-500 to-Green-900 text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {isLoading ? "Creating..." : "Create User"}
              </button>
              <button type="button" onClick={() => navigate("/admin")} className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 font-semibold">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default CreateUser
