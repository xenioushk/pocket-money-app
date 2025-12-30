import api from "./api"
import type { Category } from "../types"

/**
 * Category Service - Handles category operations
 * Integrated with new Node.js backend
 */

const categoryService = {
  /**
   * Get all categories
   */
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get<{ success: boolean; data: Category[] }>("/api/categories")
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Get category by slug
   */
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    try {
      const response = await api.get<{ success: boolean; data: Category }>(`/api/categories/${slug}`)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Create a new category
   */
  createCategory: async (data: { name: string; slug: string; description?: string }): Promise<Category> => {
    try {
      const response = await api.post<{ success: boolean; data: Category }>("/api/categories", data)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Update an existing category
   */
  updateCategory: async (id: number, data: { name: string; slug: string; description?: string }): Promise<Category> => {
    try {
      const response = await api.put<{ success: boolean; data: Category }>(`/api/categories/${id}`, data)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Delete a category
   */
  deleteCategory: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/categories/${id}`)
    } catch (error: any) {
      throw error.response?.data || error
    }
  },
}

export default categoryService
