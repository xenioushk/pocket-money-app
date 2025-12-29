import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
import { toast } from "react-toastify"
import jobService from "../services/jobService"
import type { Job, JobFormData, PaginatedResponse } from "../types"

// Query keys for cache management
export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (page: number, limit: number, catSlug?: string | null) => [...jobKeys.lists(), { page, limit, catSlug }] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  search: (term: string) => [...jobKeys.all, "search", term] as const,
}

/**
 * Hook to fetch paginated jobs
 */
export const useJobs = (page: number = 1, limit: number = 4, catSlug: string | null = null, options?: Omit<UseQueryOptions<PaginatedResponse<Job>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: jobKeys.list(page, limit, catSlug),
    queryFn: () => jobService.getJobs(page, limit, catSlug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

/**
 * Hook to fetch a single job
 */
export const useJob = (jobId: string, options?: Omit<UseQueryOptions<Job>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: jobKeys.detail(jobId),
    queryFn: () => jobService.getJobById(jobId),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

/**
 * Hook to search jobs with debounced query
 */
export const useSearchJobs = (searchTerm: string) => {
  return useQuery({
    queryKey: jobKeys.search(searchTerm),
    queryFn: () => jobService.searchJobs(searchTerm),
    enabled: searchTerm.length > 2, // Only search if term is 3+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  })
}

/**
 * Hook to create a new job
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobData: JobFormData) => jobService.createJob(jobData),
    onSuccess: () => {
      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
      toast.success("Job created successfully!")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create job")
    },
  })
}

/**
 * Hook to update a job
 */
export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobData: Partial<Job> & { jobId: string }) => jobService.updateJob(jobData),
    onSuccess: (_, variables) => {
      // Invalidate specific job and lists
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.jobId) })
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
      toast.success("Job updated successfully!")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update job")
    },
  })
}

/**
 * Hook to delete a job
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: string) => jobService.deleteJob(jobId),
    onMutate: async (jobId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobId) })

      // Snapshot previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobId))

      // Return context with snapshot
      return { previousJob, jobId }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
      toast.success("Job deleted successfully!")
    },
    onError: (error: any, _, context) => {
      // Rollback on error
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(context.jobId), context.previousJob)
      }
      toast.error(error.response?.data?.message || "Failed to delete job")
    },
  })
}

/**
 * Hook to prefetch next page of jobs
 */
export const usePrefetchJobs = () => {
  const queryClient = useQueryClient()

  return (page: number, limit: number = 4, catSlug: string | null = null) => {
    queryClient.prefetchQuery({
      queryKey: jobKeys.list(page, limit, catSlug),
      queryFn: () => jobService.getJobs(page, limit, catSlug),
      staleTime: 5 * 60 * 1000,
    })
  }
}
