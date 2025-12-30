interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* First and Previous */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition" title="First page">
        &lt;&lt;
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition" title="Previous page">
        &lt;
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button key={index} onClick={() => typeof page === "number" && onPageChange(page)} disabled={page === "..."} className={`px-4 py-2 rounded transition ${page === currentPage ? "bg-Green-500 text-white font-bold" : page === "..." ? "cursor-default" : "bg-gray-200 hover:bg-gray-300"}`}>
          {page}
        </button>
      ))}

      {/* Next and Last */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition" title="Next page">
        &gt;
      </button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition" title="Last page">
        &gt;&gt;
      </button>
    </div>
  )
}

export default Pagination
