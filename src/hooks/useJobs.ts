import { useQuery, useMutation, useQueryClient, UseQueryOptions } from "@tanstack/react-query"
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
 * Hook to search jobs
 */
export const useSearchJobs = (searchTerm: string) => {
  return useQuery({
    queryKey: jobKeys.search(searchTerm),
    queryFn: () => jobService.getJobs({ search: searchTerm, limit: 10 }),
    enabled: searchTerm.length >= 3,
    staleTime: 2 * 60 * 1000,
  })
}

/**
 * Hook to fetch paginated jobs
 */
export const useJobs = (page: number = 1, limit: number = 4, catSlug: string | null = null, options?: Omit<UseQueryOptions<PaginatedResponse<Job>>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: jobKeys.list(page, limit, catSlug),
    queryFn: () =>
      jobService.getJobs({
        page,
        limit,
        ...(catSlug && { category_id: parseInt(catSlug) }),
      }),
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
    queryFn: () => jobService.getJobById(parseInt(jobId)),
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    ...options,
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
    },
  })
}

/**
 * Hook to update a job
 */
export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ jobId, jobData }: { jobId: number; jobData: Partial<JobFormData> }) => jobService.updateJob(jobId, jobData),
    onSuccess: (_, variables) => {
      // Invalidate specific job and lists
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.jobId.toString()) })
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
  })
}

/**
 * Hook to delete a job
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: number) => jobService.deleteJob(jobId),
    onMutate: async (jobId) => {
      const jobIdStr = jobId.toString()
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: jobKeys.detail(jobIdStr) })

      // Snapshot previous value
      const previousJob = queryClient.getQueryData(jobKeys.detail(jobIdStr))

      // Return context with snapshot
      return { previousJob, jobId: jobIdStr }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() })
    },
    onError: (_error: any, _jobId, context) => {
      // Rollback on error
      if (context?.previousJob) {
        queryClient.setQueryData(jobKeys.detail(context.jobId), context.previousJob)
      }
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
      queryFn: () =>
        jobService.getJobs({
          page,
          limit,
          ...(catSlug && { category_id: parseInt(catSlug) }),
        }),
      staleTime: 5 * 60 * 1000,
    })
  }
}
