import api from "./api"
import type { Favorite } from "../types"

/**
 * Favorites Service - Handles favorite jobs
 */

const favoriteService = {
  /**
   * Get user's favorite jobs
   */
  getFavorites: async (): Promise<Favorite[]> => {
    try {
      const response = await api.get<{ success: boolean; data: Favorite[] }>("/api/favorites")
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Add job to favorites
   */
  addFavorite: async (jobId: number): Promise<void> => {
    try {
      await api.post("/api/favorites", { job_id: jobId })
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Remove job from favorites
   */
  removeFavorite: async (jobId: number): Promise<void> => {
    try {
      await api.delete(`/api/favorites/${jobId}`)
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Check if job is favorited
   */
  isFavorited: async (jobId: number): Promise<boolean> => {
    try {
      const favorites = await favoriteService.getFavorites()
      return favorites.some((fav) => fav.job_id === jobId)
    } catch (error) {
      return false
    }
  },
}

export default favoriteService
