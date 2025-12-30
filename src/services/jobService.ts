import api from "./api"
import type { Job, JobFormData, PaginatedResponse, JobQueryParams } from "../types"

/**
 * Job Service - Handles all job-related API calls
 * Integrated with new Node.js backend
 */

const jobService = {
  /**
   * Get all jobs with filters and pagination
   */
  getJobs: async (params: JobQueryParams = {}): Promise<PaginatedResponse<Job>> => {
    try {
      const queryParams = new URLSearchParams()

      if (params.category_id) queryParams.append("category_id", params.category_id.toString())
      if (params.city) queryParams.append("city", params.city)
      if (params.status) queryParams.append("status", params.status)
      if (params.min_price) queryParams.append("min_price", params.min_price.toString())
      if (params.max_price) queryParams.append("max_price", params.max_price.toString())
      if (params.page) queryParams.append("page", params.page.toString())
      if (params.limit) queryParams.append("limit", params.limit.toString())
      if (params.search) queryParams.append("search", params.search)

      const response = await api.get<PaginatedResponse<Job>>(`/api/jobs?${queryParams.toString()}`)
      return response.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Get single job by ID
   */
  getJobById: async (jobId: number): Promise<Job> => {
    try {
      const response = await api.get<{ success: boolean; data: Job }>(`/api/jobs/${jobId}`)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Create a new job
   */
  createJob: async (jobData: JobFormData): Promise<Job> => {
    try {
      console.log("Creating job with data:", jobData)
      const response = await api.post<{ success: boolean; data: Job }>("/api/jobs", jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("Job created response:", response.data)
      return response.data.data
    } catch (error: any) {
      console.error("Create job error:", error.response?.data)
      throw error.response?.data || error
    }
  },

  /**
   * Update an existing job
   */
  updateJob: async (jobId: number, jobData: Partial<JobFormData>): Promise<Job> => {
    try {
      const response = await api.put<{ success: boolean; data: Job }>(`/api/jobs/${jobId}`, jobData)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Delete a job
   */
  deleteJob: async (jobId: number): Promise<void> => {
    try {
      await api.delete(`/api/jobs/${jobId}`)
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Update job status
   */
  updateJobStatus: async (jobId: number, status: string): Promise<Job> => {
    try {
      const response = await api.patch<{ success: boolean; data: Job }>(`/api/jobs/${jobId}/status`, { status })
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Get jobs by user
   */
  getUserJobs: async (userId: number): Promise<Job[]> => {
    try {
      const response = await api.get<{ success: boolean; data: Job[] }>(`/api/jobs/user/${userId}`)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Upload images for a job
   */
  uploadJobImages: async (jobId: number, images: File[]): Promise<any> => {
    try {
      const formData = new FormData()
      images.forEach((image) => {
        formData.append("images", image)
      })

      const response = await api.post(`/api/jobs/${jobId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Get job images
   */
  getJobImages: async (jobId: number): Promise<any[]> => {
    try {
      const response = await api.get<{ success: boolean; data: any[] }>(`/api/jobs/${jobId}/images`)
      return response.data.data
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Delete job image
   */
  deleteJobImage: async (jobId: number, imageId: number): Promise<void> => {
    try {
      await api.delete(`/api/jobs/${jobId}/images/${imageId}`)
    } catch (error: any) {
      throw error.response?.data || error
    }
  },

  /**
   * Set primary image
   */
  setPrimaryImage: async (jobId: number, imageId: number): Promise<void> => {
    try {
      await api.patch(`/api/jobs/${jobId}/images/${imageId}/primary`)
    } catch (error: any) {
      throw error.response?.data || error
    }
  },
}

export default jobService
