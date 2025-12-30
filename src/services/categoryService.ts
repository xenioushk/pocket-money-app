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
}

export default categoryService
