import api from "./api"
import type { AuthResponse, RegisterData, User } from "../types"

/**
 * Authentication Service
 * Handles user authentication with new Node.js backend
 */

const authService = {
  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/api/auth/login", { email, password })
      
      if (response.data.success && response.data.data) {
        const { token, refreshToken, user } = response.data.data
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("user", JSON.stringify(user))
      }
      
      return response.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/api/auth/register", userData)
      
      if (response.data.success && response.data.data) {
        const { token, refreshToken, user } = response.data.data
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("user", JSON.stringify(user))
      }
      
      return response.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      // Call backend logout to invalidate tokens
      await api.post("/api/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<{ success: boolean; data: User }>("/api/auth/me")
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<{ success: boolean; data: User }>("/api/users/me", userData)
      
      // Update local storage
      const currentUser = authService.getStoredUser()
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data.data }
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
      
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.patch<{ success: boolean; message: string }>("/api/users/me/password", {
        currentPassword,
        newPassword,
      })
      return response.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token")
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem("token")
  },

  /**
   * Get stored user
   */
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  },
}

export default authService
