import { useState, useMemo } from "react"

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
}

interface UsePaginationReturn {
  currentPage: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
  setPageSize: (size: number) => void
  reset: () => void
  getPageRange: () => { start: number; end: number }
}

/**
 * Custom hook for pagination logic
 * @param options - Configuration options
 */
export const usePagination = ({ initialPage = 1, initialPageSize = 10, totalItems = 0 }: UsePaginationOptions = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize) || 1
  }, [totalItems, pageSize])

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const handleSetPageSize = (size: number) => {
    setPageSize(size)
    // Reset to first page when changing page size
    setCurrentPage(1)
  }

  const reset = () => {
    setCurrentPage(initialPage)
    setPageSize(initialPageSize)
  }

  const getPageRange = () => {
    const start = (currentPage - 1) * pageSize
    const end = Math.min(start + pageSize, totalItems)
    return { start, end }
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
    setPageSize: handleSetPageSize,
    reset,
    getPageRange,
  }
}

export default usePagination
