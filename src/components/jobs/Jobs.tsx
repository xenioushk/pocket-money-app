import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import JobItem from "./JobItem"
import loader from "../../loader.gif"
import Breadcrumb from "../base/Breadcrumb"
import Pagination from "../base/Pagination"
import { Job } from "../../types"
import jobService from "../../services/jobService"

interface JobsProps {
  catSlug?: string
}

type SortField = "date" | "price" | "title"
type SortOrder = "asc" | "desc"

const Jobs = ({ catSlug }: JobsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [maxPages, setMaxPages] = useState(1)
  const [catName, setCateName] = useState("")

  // Get page from URL or default to 1
  const page = parseInt(searchParams.get("page") || "1", 10)

  // Get sort parameters from URL or use defaults
  const [sortField, setSortField] = useState<SortField>((searchParams.get("sortBy") as SortField) || "date")
  const [sortOrder, setSortOrder] = useState<SortOrder>((searchParams.get("order") as SortOrder) || "desc")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false)
      try {
        const response = await jobService.getJobs({
          page,
          limit: 8,
          category_id: catSlug ? parseInt(catSlug) : undefined,
          status: "approved",
        })

        setMaxPages(response.pagination.pages)
        setIsLoaded(true)

        // Get category name if filtering by category
        if (catSlug && response.data.length > 0) {
          setCateName(response.data[0].category_name || "")
        }

        setJobs(response.data)
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        setIsLoaded(true)
        setJobs([])
      }
    }

    fetchData()
  }, [page, catSlug])

  // Sort jobs based on selected criteria
  const sortedJobs = [...jobs].sort((a, b) => {
    let comparison = 0

    if (sortField === "date") {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    } else if (sortField === "price") {
      comparison = a.price - b.price
    } else if (sortField === "title") {
      comparison = a.title.localeCompare(b.title)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleSortChange = (field: SortField) => {
    const newOrder = field === sortField ? (sortOrder === "asc" ? "desc" : "asc") : "desc"
    const newField = field

    setSortField(newField)
    setSortOrder(newOrder)

    // Update URL with sort parameters
    const params = new URLSearchParams(searchParams)
    params.set("sortBy", newField)
    params.set("order", newOrder)
    setSearchParams(params)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container px-4 mx-auto items-center md:px-0">
      {isLoaded ? (
        <>
          {jobs.length > 0 ? (
            <>
              {catSlug && <Breadcrumb category={catName} catSlug={catSlug} />}

              {/* Sorting Controls */}
              <div className="mb-6 flex flex-wrap gap-3 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleSortChange("date")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortField === "date" ? "bg-green-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                      Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button onClick={() => handleSortChange("price")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortField === "price" ? "bg-green-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                      Price {sortField === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                    <button onClick={() => handleSortChange("title")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${sortField === "title" ? "bg-green-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                      Title {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                    </button>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {sortedJobs.map((job) => (
                  <JobItem key={job.id} job={job} single={false} />
                ))}
              </div>

              <Pagination currentPage={page} totalPages={maxPages} onPageChange={handlePageChange} />
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">No jobs found!</p>
          )}
        </>
      ) : (
        <div className="grid justify-items-center py-12">
          <img src={loader} alt="Loading..." />
        </div>
      )}
    </div>
  )
}

export default Jobs
