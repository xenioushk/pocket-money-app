import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FormLabel from "./FormLabel"
import JobCategories from "./JobCategories"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useJob, useUpdateJob, useDeleteJob } from "../../hooks/useJobs"
import { useAuth } from "../../hooks/useAuth"
import ConfirmDialog from "../base/ConfirmDialog"
import loader from "../../loader.gif"

const EditJob = () => {
  document.title = "Edit Job | Pocket Money"

  const warningText = "text-red-500"
  const [modifyJobInfo, setModifyJobInfo] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  })
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // TanStack Query hooks
  const { data: jobData, isLoading, isError } = useJob(jobId!)
  const updateJobMutation = useUpdateJob()
  const deleteJobMutation = useDeleteJob()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Authorization check
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to edit jobs")
      navigate("/login")
      return
    }

    if (jobData && user) {
      // Check if user is the owner or admin
      if (jobData.user_id !== user.id && user.role !== "admin") {
        toast.error("You are not authorized to edit this job")
        navigate("/")
      }
    }
  }, [jobData, user, isAuthenticated, navigate])

  // Load job data into form when available
  useEffect(() => {
    if (jobData) {
      reset({
        taskTitle: jobData.title,
        taskDetails: jobData.description || "",
        taskCategory: jobData.category_id,
        taskDay: jobData.date,
        taskDuration: jobData.duration,
        taskPrice: jobData.price,
        city: jobData.city,
      })
    }
  }, [jobData, reset])

  // Handle error or no job found
  useEffect(() => {
    if (isError) {
      setModifyJobInfo(true)
      toast.error("No job post found!")
      setTimeout(() => navigate("/"), 2000)
    }
  }, [isError, navigate])

  const onSubmit = (data: any) => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Map form fields to backend format
    const jobData = {
      title: data.taskTitle,
      description: data.taskDetails,
      category_id: parseInt(data.taskCategory),
      date: data.taskDay,
      duration: data.taskDuration,
      price: parseFloat(data.taskPrice),
      city: data.city,
    }

    updateJobMutation.mutate(
      { jobId: parseInt(jobId!), jobData },
      {
        onSuccess: () => {
          setModifyJobInfo(true)
          toast.success("Job updated successfully!")
          setTimeout(() => navigate(`/job/${jobId}`), 2000)
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to update job")
        },
      }
    )
  }

  const deleteJob = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Job",
      message: "Are you sure you want to delete this job? This action cannot be undone.",
      onConfirm: () => {
        window.scrollTo({ top: 0, behavior: "smooth" })

        deleteJobMutation.mutate(parseInt(jobId!), {
          onSuccess: () => {
            setModifyJobInfo(true)
            toast.success("Job deleted successfully!")
            setTimeout(() => navigate("/"), 2000)
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to delete job")
          },
        })
      },
    })
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mt-10">
        <div className="card-modern p-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-Green-500/20 to-Green-900/20 rounded w-48 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading job data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {!modifyJobInfo ? (
        <div className="container mx-auto px-4 mt-6">
          <div className="card-modern max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-Green-500 to-Green-900 bg-clip-text text-transparent text-center mb-8">Edit Task</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`space-y-6 ${updateJobMutation.isPending || deleteJobMutation.isPending ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Title of the Task */}
                <div>
                  <FormLabel id="taskTitle" title="Title" />
                  <input type="text" name="taskTitle" id="taskTitle" {...register("taskTitle", { required: true, minLength: 3, maxLength: 100 })} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" />
                  {errors.taskTitle && <span className={warningText}>Task title is required (Max length is 100 characters).</span>}
                </div>

                {/* Details of the Task */}
                <div>
                  <FormLabel id="taskDetails" title="Details" />
                  <textarea name="taskDetails" id="taskDetails" {...register("taskDetails", { required: true, minLength: 3, maxLength: 1200 })} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" rows={5}></textarea>
                  {errors.taskDetails && <span className={warningText}>Task details is required (Max length is 1200 characters).</span>}
                </div>

                {/* Task Category */}
                <div>
                  <FormLabel id="taskCategory" title="Task Category" />
                  <select name="taskCategory" id="taskCategory" className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" {...register("taskCategory", { required: true })}>
                    <JobCategories />
                  </select>
                  {errors.taskCategory && <span className={warningText}>Task Category is required</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Day */}
                  <div>
                    <FormLabel id="taskDay" title="Day" />
                    <input type="text" placeholder="01.01.2022" name="taskDay" id="taskDay" {...register("taskDay", { required: true, pattern: /^\d{2}\.\d{2}\.\d{4}$/ })} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" />
                    {errors.taskDay && <span className={warningText}>Day is required. (Format: 22.11.2022)</span>}
                  </div>

                  {/* Duration */}
                  <div>
                    <FormLabel id="taskDuration" title="Duration" />
                    <input type="text" placeholder="In Hours" name="taskDuration" id="taskDuration" {...register("taskDuration", { required: true, pattern: /^[0-9]+$/i })} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" />
                    {errors.taskDuration && <span className={warningText}>Duration is required (Only numbers allowed).</span>}
                  </div>

                  {/* Price */}
                  <div>
                    <FormLabel id="taskPrice" title="Price" />
                    <input type="text" placeholder="In Euros" name="taskPrice" id="taskPrice" {...register("taskPrice", { required: true, pattern: /^[0-9.]+$/i })} className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" />
                    {errors.taskPrice && <span className={warningText}>Price is required (Only numbers allowed).</span>}
                  </div>

                  {/* Location */}
                  <div>
                    <FormLabel id="city" title="Location" />
                    <select name="city" id="city" className="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white" {...register("city", { required: true })}>
                      <option value="">Select</option>
                      <option value="Helsinki">Helsinki</option>
                      <option value="Tampere">Tampere</option>
                    </select>
                    {errors.city && <span className={warningText}>Location is required.</span>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button type="button" onClick={deleteJob} className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Delete Job
                  </button>
                  <button type="submit" disabled={updateJobMutation.isPending} className="flex-1 bg-gradient-to-r from-Green-500 to-Green-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    {updateJobMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-10">
          <div className="card-modern max-w-md mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h2>
            <p className="text-gray-600 dark:text-gray-400">Redirecting you...</p>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} variant="danger" onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
    </>
  )
}

export default EditJob
