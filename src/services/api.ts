import axios from "axios"
import { toast } from "react-toastify"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_PM_API_URL || "http://localhost:5002",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Request interceptor - add auth token when available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized - try token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refreshToken")

      if (refreshToken) {
        try {
          console.log("Token expired, attempting refresh...")

          // Try to refresh the token
          const response = await axios.post(
            `${import.meta.env.VITE_PM_API_URL || "http://localhost:5002"}/api/auth/refresh`,
            { refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          console.log("Refresh response:", response.data)

          const newToken = response.data.data?.token || response.data.token
          const newRefreshToken = response.data.data?.refreshToken || response.data.refreshToken

          if (!newToken) {
            throw new Error("No token received from refresh endpoint")
          }

          localStorage.setItem("token", newToken)
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken)
          }

          console.log("Token refreshed successfully, retrying original request...")

          // Update the Authorization header with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          // Retry the original request with new token
          return api(originalRequest)
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError)
          console.error("Refresh error details:", refreshError.response?.data)

          // Only logout if refresh token is actually invalid
          if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
            console.log("Refresh token invalid, logging out...")
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("user")
            toast.error("Your session has expired. Please login again.")
            window.location.href = "/login"
          }

          return Promise.reject(refreshError)
        }
      } else {
        console.log("No refresh token available, redirecting to login...")
        // No refresh token, redirect to login
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.info("Please login to continue.")
        window.location.href = "/login"
      }
    }

    // Handle other errors
    if (error.response) {
      switch (error.response.status) {
        case 403:
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
