import api from "./api"
import type { Job, PaginatedResponse, SearchParams } from "../types"

/**
 * Search Service - Handles search functionality
 */

const searchService = {
  /**
   * Search jobs by keyword
   */
  searchJobs: async (params: SearchParams): Promise<PaginatedResponse<Job>> => {
    try {
      const queryParams = new URLSearchParams()
      
      queryParams.append("q", params.q)
      if (params.page) queryParams.append("page", params.page.toString())
      if (params.limit) queryParams.append("limit", params.limit.toString())
      
      const response = await api.get<PaginatedResponse<Job>>(`/api/search?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },
}

export default searchService
