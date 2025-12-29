import axios from "axios"

// Create axios instance with base configuration
// Using Vite environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_PM_API_URL || "https://pmapi.bluewindlab.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor - add auth token when available
api.interceptors.request.use(
  (config) => {
    // When we integrate the new backend, add JWT token here
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("token")
          window.location.href = "/login"
          break
        case 403:
          // Forbidden
          console.error("Access forbidden")
          break
        case 404:
          console.error("Resource not found")
          break
        case 500:
          console.error("Server error")
          break
        default:
          console.error("An error occurred:", error.response.data)
      }
    }
    return Promise.reject(error)
  }
)

export default api
