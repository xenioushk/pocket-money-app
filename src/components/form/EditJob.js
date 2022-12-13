import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import FormLabel from "./FormLabel"
import JobCategories from "./JobCategories"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const EditJob = () => {
  document.title = "Edit Job | Pocket Money"

  const warningText = "text-red-500"
  const [modifyJobInfo, setModifyJobInfo] = useState(0)
  const [modifyJobInfoMsg, setModifyJobInfoMsg] = useState("")
  const [status, setStatus] = useState(0)
  const [statusMessage, setstatusMessage] = useState("")
  const [formOverLay, setformOverLay] = useState(1)
  const { jobHash, jobId } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const getJobData = useCallback(
    async (jobHash) => {
      try {
        const resp = await axios.get(`wp-json/pmapi/v1/job?p_id=${jobHash}`)

        if (resp.data.job_data.status === false) {
          setModifyJobInfo(1)
          setModifyJobInfoMsg(`<h2 class="w-full text-center text-lg font-bold mb-3">No job post found!<br></h2><a href="/" class="bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block rounded">Browse all jobs</a>`)
        } else {
          var jobData = resp.data.job_data[0]
          reset({
            taskTitle: jobData.title,
            taskDetails: jobData.excerpt,
            taskCategory: jobData.cat_id,
            taskDay: jobData.date,
            taskDuration: jobData.duration,
            taskPrice: jobData.price,
            city: jobData.city,
          })
          setformOverLay(0)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [reset]
  )

  // Load job data in edit form.
  useEffect(() => {
    getJobData(jobHash)
  }, [getJobData, jobHash])

  const sendPostRequest = async (data) => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
      data.jobId = jobId
      setStatus(1)
      setstatusMessage("Please wait .....")
      setformOverLay(1)

      const resp = await axios.post("/wp-json/pmapi/v1/edit", data)

      if (resp.data.status === 1) {
        setstatusMessage(resp.data.msg)
        setModifyJobInfo(1)
        setModifyJobInfoMsg(`<a href="/job/${jobHash}" class="bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block rounded">Go to job page</a>`)
        setformOverLay(0)
        setTimeout(() => {
          setStatus(0)
        }, 3000)
      }
    } catch (err) {
      // Handle Error Here
      setstatusMessage("Unable to edit job post.")
      setformOverLay(0)
      // console.error(err)
    }
  }
  const onSubmit = (data) => {
    sendPostRequest(data)
  }

  // Delete Job Post.
  const deleteJobData = async () => {
    const resp = await axios.delete("/wp-json/pmapi/v1/delete", { data: { jobId: jobId } })
    if (resp.data.status === 1) {
      setstatusMessage(resp.data.msg)
      setModifyJobInfo(1)
      setModifyJobInfoMsg(`<a href="/" class="bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block rounded">Browse all jobs</a>`)
    }
  }
  const deleteJob = () => {
    const confirmDelete = window.confirm("Are you sure to remove the job?")
    if (confirmDelete === true) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      deleteJobData()
      setModifyJobInfo(0)
      setStatus(1)
      setstatusMessage("Please Wait...")
    }
  }

  return (
    <>
      <div className={`text-center bg-brightRed justify-center mx-auto w-1/3 p-3 text-white ${status ? "" : "hidden"}`} dangerouslySetInnerHTML={{ __html: statusMessage }} />

      {!modifyJobInfo ? (
        <>
          <div className="flex flex-wrap justify-center mt-3">
            <h1 className="text-4xl underline underline-offset-4">Edit Task</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 flex flex-wrap justify-center">
                <div className={`overflow-hidden shadow rounded-md" ${formOverLay === 1 ? "form-overlay" : ""}`}>
                  <div className="bg-white p-6 md:px-4 py-5">
                    <div className="grid grid-cols-10 gap-6">
                      {/* Title of the Task */}
                      <div className="col-span-10">
                        <FormLabel id="taskTitle" title="Title" />
                        <input type="text" name="taskTitle" id="taskTitle" {...register("taskTitle", { required: true, minLength: 3, maxLength: 100 })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                        {errors.taskTitle && <span className={warningText}>Task title is required (Max length is 100 characters).</span>}
                      </div>

                      {/* Details of the Task */}
                      <div className="col-span-10">
                        <FormLabel id="taskDetails" title=" Details" />
                        <textarea name="taskDetails" id="taskDetails" {...register("taskDetails", { required: true, minLength: 3, maxLength: 1200 })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" rows={5}></textarea>
                        {errors.taskDetails && <span className={warningText}>Task details is required (Max length is 1200 characters).</span>}
                      </div>
                      {/* Title of the Task */}
                      <div className="col-span-10">
                        <FormLabel id="taskCategory" title="Task Category" />
                        <select name="taskCategory" id="taskCategory" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("taskCategory", { required: true })}>
                          <JobCategories />
                        </select>
                        {errors.taskCategory && <span className={warningText}>Task Category is required</span>}
                      </div>

                      {/* Duration of the Task */}
                      <div className="col-span-5">
                        <FormLabel id="taskDay" title="Day" />
                        <input type="text" placeholder="01.01.2022" name="taskDay" id="taskDay" {...register("taskDay", { required: true, pattern: /^\d{2}\.\d{2}\.\d{4}$/ })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                        {errors.taskDay && <span className={warningText}>Day is required. (Format: 22.11.2022)</span>}
                      </div>

                      {/* Duration*/}
                      <div className="col-span-5">
                        <FormLabel id="taskDuration" title="Duration" />
                        <input type="text" placeholder="In Hours" name="taskDuration" id="taskDuration" {...register("taskDuration", { required: true, pattern: /^[0-9]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                        {errors.taskDuration && <span className={warningText}>Duration is required (Only numbers allowed).</span>}
                      </div>

                      {/* Duration of the Task */}
                      <div className="col-span-5">
                        <FormLabel id="taskPrice" title="Price" />
                        <input type="text" placeholder="In Euros" name="taskPrice" id="taskPrice" {...register("taskPrice", { required: true, pattern: /^[0-9.]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                        {errors.taskPrice && <span className={warningText}>Price is required (Only numbers allowed).</span>}
                      </div>

                      {/* Location */}
                      <div className="col-span-5">
                        <FormLabel id="city" title="Location" />
                        <select name="city" id="city" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 block rounded" {...register("city", { required: true })}>
                          <option value="">Select</option>
                          <option value="Helsinki">Helsinki</option>
                          <option value="Tampere">Tampere</option>
                        </select>
                        {errors.city && <span className={warningText}>Location is required.</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between bg-gray-50 px-4 py-3 sm:px-6">
                    <Link to="#" onClick={deleteJob} className="rounded mt-3 bg-brightRed text-white font-bold text-underline-none p-2 block hover:bg-brightRedLight md:px-4 py-2 inline-block ">
                      Delete
                    </Link>
                    &nbsp;
                    <button type="submit" className="rounded mt-3 bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-wrap justify-center mt-3" dangerouslySetInnerHTML={{ __html: modifyJobInfoMsg }} />
      )}
    </>
  )
}

export default EditJob
