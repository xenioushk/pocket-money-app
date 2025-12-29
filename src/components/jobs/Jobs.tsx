import { useState, useEffect } from "react"
import JobItem from "./JobItem"
import axios from "axios"
import loader from "../../loader.gif"
import Breadcrumb from "../base/Breadcrumb"
import { Job } from "../../types"

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
    const catFilter = catSlug ? `&catslug=${catSlug}` : ""
    const apiLink = `/wp-json/pmapi/v1/jobs?limit=4&&page=${page}${catFilter}`

    const fetchData = () => {
      axios
        .get(apiLink)
        .then((res) => {
          setLoadMoreBtnText("Load More")
          setLoadMoreBtnDisabled(false)
          setMaxPages(res.data.max_pages)
          setIsLoaded(true)
          setStatus(res.data.status)

          if (catSlug) {
            setCateName(res.data.cat_name)
          }

          setLoadMoreBtn(res.data.max_pages > 1)
          setJobs((prev) => prev.concat(res.data.job_data))
        })
        .catch((err) => console.error("Failed to fetch jobs:", err))
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
