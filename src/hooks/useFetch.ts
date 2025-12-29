import { useState, useEffect } from "react"

interface UseFetchOptions {
  skip?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Generic data fetching hook
 * @param fetchFn - Async function that fetches data
 * @param dependencies - Array of dependencies to trigger refetch
 * @param options - Optional configuration
 */
export const useFetch = <T = any>(fetchFn: () => Promise<T>, dependencies: any[] = [], options: UseFetchOptions = {}): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(!options.skip)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  useEffect(() => {
    if (options.skip) {
      setLoading(false)
      return
    }

    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn()

        if (isMounted) {
          setData(result)
          options.onSuccess?.(result)
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error("An error occurred")
          setError(error)
          options.onError?.(error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, refetchTrigger])

  const refetch = () => setRefetchTrigger((prev) => prev + 1)

  return { data, loading, error, refetch }
}

export default useFetch
