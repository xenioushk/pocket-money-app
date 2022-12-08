import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JobItem from "../jobs/JobItem"
import AlertMessage from "../base/AlertMessage"
import axios from "axios"
import loader from "../../loader.gif"
import Breadcrumb from "../base/Breadcrumb"

const SingleJob = () => {
  // get ID from url
  const params = useParams()

  // console.log(params.id) // {userId: '4200'}

  const [isLoaded, setIsLoaded] = useState(false)
  const [singleJob, setSingleJob] = useState([])
  const [postId] = useState(params.id)
  const [jobTitle, setJobTitle] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [jobCategorySlug, setJobCategorySlug] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    // const postId = {id: "[hexValue]", token: "[userToken]"}
    const fetchData = () => {
      axios
        .get(`/wp-json/pmapi/v1/job?p_id=${postId}`)
        .then((res) => {
          setIsLoaded(true)
          setStatus(res.data.status)
          setJobTitle(res.data.job_data[0].title)
          setJobCategory(res.data.job_data[0].category)
          setJobCategorySlug(res.data.job_data[0].cat_slug)
          setSingleJob((prev) => prev.concat(res.data.job_data))
          document.title = `${res.data.job_data[0].title} | Pocket Money`
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [postId])

  return (
    <div className="container px-4 mx-auto items-center mt-4 md:px-0">
      {isLoaded ? (
        <div className="grid grid-cols-1 gap-y-4 mt-4">
          <Breadcrumb title={jobTitle} category={jobCategory} catSlug={jobCategorySlug} />
          {status === true ? singleJob.map((job, index) => <JobItem key={index} job={job} single={true} />) : <AlertMessage type="warning" title="No Job Post Found!" />}
        </div>
      ) : (
        <div className="grid justify-items-center">
          <img src={loader} alt="Logo" />
        </div>
      )}
    </div>
  )
}

export default SingleJob
