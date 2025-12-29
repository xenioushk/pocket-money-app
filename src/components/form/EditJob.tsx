import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FormLabel from "./FormLabel"
import JobCategories from "./JobCategories"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useJob, useUpdateJob, useDeleteJob } from "../../hooks/useJobs"

const EditJob = () => {
  document.title = "Edit Job | Pocket Money"

  const warningText = "text-red-500"
  const [modifyJobInfo, setModifyJobInfo] = useState(false)
  const { jobHash, jobId } = useParams()
  const navigate = useNavigate()

  // TanStack Query hooks
  const { data: jobData, isLoading, isError } = useJob(jobHash)
  const updateJobMutation = useUpdateJob()
  const deleteJobMutation = useDeleteJob()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Load job data into form when available
  useEffect(() => {
    if (jobData && jobData.job_data && jobData.job_data.length > 0) {
      const job = jobData.job_data[0]
      reset({
        taskTitle: job.title,
        taskDetails: job.excerpt,
        taskCategory: job.cat_id,
        taskDay: job.date,
        taskDuration: job.duration,
        taskPrice: job.price,
        city: job.city,
      })
    }
  }, [jobData, reset])

  // Handle error or no job found
  useEffect(() => {
    if (isError || (jobData && jobData.job_data?.status === false)) {
      setModifyJobInfo(true)
      toast.error("No job post found!")
      setTimeout(() => navigate("/"), 2000)
    }
  }, [isError, jobData, navigate])

  const onSubmit = (data) => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    updateJobMutation.mutate(
      { ...data, jobId, jobHash },
      {
        onSuccess: () => {
          setModifyJobInfo(true)
          setTimeout(() => navigate(`/job/${jobHash}`), 2000)
        },
      }
    )
  }

  const deleteJob = () => {
    const confirmDelete = window.confirm("Are you sure to remove the job?")
    if (confirmDelete) {
      window.scrollTo({ top: 0, behavior: "smooth" })

      deleteJobMutation.mutate(jobId, {
        onSuccess: () => {
          setModifyJobInfo(true)
          setTimeout(() => navigate("/"), 2000)
        },
      })
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="grid justify-items-center mt-10">
        <div className="text-center">Loading job data...</div>
      </div>
    )
  }

  return (
    <>
      {!modifyJobInfo ? (
        <>
          <div className="flex flex-wrap justify-center mt-3">
            <h1 className="text-4xl underline underline-offset-4">Edit Task</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 flex flex-wrap justify-center">
                <div className={`overflow-hidden shadow rounded-md" ${updateJobMutation.isPending || deleteJobMutation.isPending ? "form-overlay" : ""}`}>
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
      ) : null}
    </>
  )
}

export default EditJob
