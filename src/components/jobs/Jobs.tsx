import { useState, useEffect } from "react"
import JobItem from "./JobItem"
import loader from "../../loader.gif"
import Breadcrumb from "../base/Breadcrumb"
import { Job } from "../../types"
import jobService from "../../services/jobService"

interface JobsProps {
  catSlug?: string
}

const Jobs = ({ catSlug }: JobsProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [maxPages, setMaxPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loadMoreBtn, setLoadMoreBtn] = useState(false)
  const [status, setStatus] = useState(false)
  const [catName, setCateName] = useState("")
  const [loadMoreBtnText, setLoadMoreBtnText] = useState("Load More")
  const [loadMoreBtnDisabled, setLoadMoreBtnDisabled] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await jobService.getJobs({
          page,
          limit: 4,
          category_id: catSlug ? parseInt(catSlug) : undefined,
          status: "approved",
        })

        setLoadMoreBtnText("Load More")
        setLoadMoreBtnDisabled(false)
        setMaxPages(response.pagination.pages)
        setIsLoaded(true)
        setStatus(response.data.length > 0)

        // Get category name if filtering by category
        if (catSlug && response.data.length > 0) {
          setCateName(response.data[0].category_name || "")
        }

        setLoadMoreBtn(response.pagination.pages > 1)
        setJobs((prev) => prev.concat(response.data))
      } catch (err) {
        console.error("Failed to fetch jobs:", err)
        setIsLoaded(true)
        setStatus(false)
      }
    }

    fetchData()
  }, [page, catSlug])

  const onClick = () => {
    const currentPage = parseInt(String(page)) + 1
    setPage(currentPage)
    setLoadMoreBtnText("Loading....")
    setLoadMoreBtnDisabled(true)
  }

  return (
    <div className="container px-4 mx-auto items-center md:px-0">
      {isLoaded ? (
        <>
          {status ? (
            <>
              {catSlug && <Breadcrumb category={catName} catSlug={catSlug} />}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {jobs.map((job, index) => (
                  <JobItem key={index} job={job} single={false} />
                ))}
              </div>

              {loadMoreBtn && page < maxPages && (
                <div className="grid grid-cols-1 gap-y-4 mt-4 md:mt-6">
                  <button disabled={loadMoreBtnDisabled} className="transition bg-Green-900 text-white font-bold px-4 py-4 rounded hover:bg-gray-800 btn-inline p-3 mx-auto w-1/2 md:w-1/4" onClick={onClick}>
                    {loadMoreBtnText}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No Post Found!</p>
          )}
        </>
      ) : (
        <div className="grid justify-items-center">
          <img src={loader} alt="Loading..." />
        </div>
      )}
    </div>
  )
}

export default Jobs
