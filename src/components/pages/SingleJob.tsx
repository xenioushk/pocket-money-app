import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JobItem from "../jobs/JobItem"
import AlertMessage from "../base/AlertMessage"
import loader from "../../loader.gif"
import Breadcrumb from "../base/Breadcrumb"
import jobService from "../../services/jobService"
import { Job } from "../../types"

const SingleJob = () => {
  // get ID from url
  const params = useParams()

  // console.log(params.id) // {userId: '4200'}

  const [isLoaded, setIsLoaded] = useState(false)
  const [singleJob, setSingleJob] = useState<Job | null>(null)
  const [postId] = useState(params.id)
  const [jobTitle, setJobTitle] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [jobCategorySlug, setJobCategorySlug] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) return

        const job = await jobService.getJobById(parseInt(postId))
        setIsLoaded(true)
        setStatus(true)
        setJobTitle(job.title)
        setJobCategory(job.category_name || "")
        setJobCategorySlug(job.category_id.toString())
        setSingleJob(job)
        document.title = `${job.title} | Pocket Money`
      } catch (err) {
        console.error(err)
        setIsLoaded(true)
        setStatus(false)
      }
    }

    fetchData()
  }, [postId])

  return (
    <div className="container px-4 mx-auto items-center mt-4 md:px-0">
      {isLoaded ? (
        <div className="grid grid-cols-1 gap-y-4 mt-4">
          <Breadcrumb title={jobTitle} category={jobCategory} catSlug={jobCategorySlug} />
          {status === true && singleJob ? <JobItem job={singleJob} single={true} /> : <AlertMessage type="warning" title="No Job Post Found!" />}
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
