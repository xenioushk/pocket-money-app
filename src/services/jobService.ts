import api from "./api"
import type { Job, JobFormData, ApiResponse, PaginatedResponse, SearchParams } from "../types"

/**
 * Job Service - Handles all job-related API calls
 * Ready for new backend integration - just update endpoints
 */

const jobService = {
  /**
   * Get all jobs with pagination and optional category filter
   */
  getJobs: async (page: number = 1, limit: number = 4, catSlug: string | null = null): Promise<PaginatedResponse<Job>> => {
    try {
      const catFilter = catSlug ? `&catslug=${catSlug}` : ""
      const response = await api.get<PaginatedResponse<Job>>(`/wp-json/pmapi/v1/jobs?limit=${limit}&page=${page}${catFilter}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Get single job by ID
   */
  getJobById: async (jobId: string): Promise<Job> => {
    try {
      const response = await api.get<Job>(`/wp-json/pmapi/v1/job?p_id=${jobId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Create a new job
   */
  createJob: async (jobData: JobFormData): Promise<ApiResponse<Job>> => {
    try {
      const response = await api.post<ApiResponse<Job>>("/wp-json/pmapi/v1/create", jobData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Update an existing job
   */
  updateJob: async (jobData: Partial<Job> & { jobId: string }): Promise<ApiResponse<Job>> => {
    try {
      const response = await api.post<ApiResponse<Job>>("/wp-json/pmapi/v1/edit", jobData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Delete a job
   */
  deleteJob: async (jobId: string): Promise<ApiResponse<void>> => {
    try {
      const response = await api.delete<ApiResponse<void>>("/wp-json/pmapi/v1/delete", {
        data: { jobId },
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Search jobs
   */
  searchJobs: async (searchTerm: string): Promise<Job[]> => {
    try {
      const response = await api.get<Job[]>(`/wp-json/pmapi/v1/search?s=${searchTerm}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Get jobs by user (when backend is ready)
   */
  getUserJobs: async (userId: string): Promise<Job[]> => {
    try {
      // This will be implemented when new backend is ready
      // const response = await api.get(`/api/jobs/user/${userId}`)
      throw new Error("getUserJobs: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },

  /**
   * Update job status (when backend is ready)
   */
  updateJobStatus: async (jobId: string, status: string): Promise<ApiResponse<Job>> => {
    try {
      // This will be implemented when new backend is ready
      // const response = await api.patch(`/api/jobs/${jobId}/status`, { status })
      throw new Error("updateJobStatus: Not yet implemented - waiting for new backend")
    } catch (error) {
      throw error
    }
  },
}

export default jobService
