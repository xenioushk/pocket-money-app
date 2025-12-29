import api from "./api"
import type { Category } from "../types"

const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/api/categories")
    return response.data
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get<Category>(`/api/categories/${slug}`)
    return response.data
  },
}

export default categoryService
