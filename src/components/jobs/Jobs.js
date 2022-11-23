import React, { useState, useEffect } from "react"
import JobItem from "./JobItem"
import axios from "axios"

const Jobs = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState([])
  const [maxPages, setMaxPages] = useState(1)
  // const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [loadMoreBtn, setLoadMoreBtn] = useState(0)

  useEffect(() => {
    // GET request using axios inside useEffect React hook

    const fetchData = () => {
      axios
        .get(`/wp-json/pmapi/v1/jobs?limit=4&&page=${page}`)
        .then((res) => {
          setMaxPages(res.data.max_pages)
          setIsLoaded(true)

          // maximum number of page value is greater than 1 then we are going to show the button.

          res.data.max_pages > 1 ? setLoadMoreBtn(1) : setLoadMoreBtn(0)

          // setJobs(jobs.push(res.data.job_data))
          setJobs((prev) => prev.concat(res.data.job_data))
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [page])

  const onClick = (e) => {
    //Remove it later.

    // setLimit((prev) => prev)

    let currentPage
    setPage((currentPage = parseInt(page) + 1))

    if (currentPage === maxPages) {
      e.target.remove()
    }
  }

  return (
    <>
      {isLoaded ? (
        <div className="container px-4 mx-auto items-center md:px-0">
          <div className="grid grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <JobItem key={index} job={job} single={false} />
            ))}
          </div>

          {loadMoreBtn ? (
            <div className="grid grid-cols-1 gap-y-4">
              <button className="bg-gray-600 text-white text-underline-none font-bold px-4 py-4 rounded hover:bg-gray-800 btn-inline p-3 w-1/4 mx-auto" onClick={onClick}>
                Load More
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </>
  )
}

export default Jobs
