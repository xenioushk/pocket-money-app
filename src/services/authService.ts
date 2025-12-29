import api from "./api"
import type { AuthResponse, RegisterData, User } from "../types"

/**
 * Authentication Service
 * Ready for new backend integration
 */

const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // This will be implemented when new backend is ready
      const response = await api.post<AuthResponse>("/api/auth/login", { email, password })
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }
      return response.data
      // throw new Error("login: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },

  /**
   * Register new user
   * @param {object} userData - User registration data
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      // This will be implemented when new backend is ready
      const response = await api.post<AuthResponse>("/api/auth/register", userData)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }
      return response.data
      // throw new Error("register: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    window.location.href = "/login"
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      // This will be implemented when new backend is ready
      const response = await api.get<User>("/api/users/me")
      return response.data
      // throw new Error("getCurrentUser: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },

  /**
   * Update user profile
   * @param {object} userData - Updated user data
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      // This will be implemented when new backend is ready
      const response = await api.put<User>("/api/users/me", userData)
      return response.data
      // throw new Error("updateProfile: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },

  /**
   * Change password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      // This will be implemented when new backend is ready
      const response = await api.patch<{ success: boolean; message: string }>("/api/users/me/password", {
        oldPassword,
        newPassword,
      })
      return response.data
      // throw new Error("changePassword: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
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
}

export default authService
