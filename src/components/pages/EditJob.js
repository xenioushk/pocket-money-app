import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import JobItem from "../jobs/JobItem"
import axios from "axios"
import loader from "../../loader.gif"

const EditJob = () => {
  // get ID from url
  const params = useParams()

  console.log(params.id) // {userId: '4200'}

  const [isLoaded, setIsLoaded] = useState(false)
  const [singleJob, setSingleJob] = useState([])
  const [postId] = useState(params.id)

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    // const postId = {id: "[hexValue]", token: "[userToken]"}
    const fetchData = () => {
      axios
        .get(`/wp-json/pmapi/v1/jobs?p_id=${postId}`)
        .then((res) => {
          setIsLoaded(true)
          setSingleJob((prev) => prev.concat(res.data.job_data))
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [postId])

  return (
    <div className="container px-4 mx-auto items-center mt-4 md:px-0">
      {isLoaded ? (
        <>
          <div className="grid grid-cols-1 gap-y-4 mt-4">
            {singleJob.map((job, index) => (
              <JobItem key={index} job={job} single={true} />
            ))}
          </div>
        </>
      ) : (
        <div className="grid justify-items-center">
          <img src={loader} alt="Logo" />
        </div>
      )}
    </div>
  )
}

export default EditJob
