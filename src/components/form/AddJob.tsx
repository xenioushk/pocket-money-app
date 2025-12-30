import { useState, useEffect } from "react"
import FormLabel from "./FormLabel"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import JobCategories from "./JobCategories"
import { useCreateJob } from "../../hooks/useJobs"
import { useAuth } from "../../hooks/useAuth"
import jobService from "../../services/jobService"

interface JobFormInputs {
  taskTitle: string
  taskCategory: string
  taskDay: string
  taskDuration: string
  taskPrice: string
  city: string
  agree: boolean
}

const AddJob = () => {
  document.title = "Add A New Job | Pocket Money"

  const { user, isAuthenticated } = useAuth()
  const createJobMutation = useCreateJob()
  const [taskDetails, setTaskDetails] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState("")
  const [userJobCount, setUserJobCount] = useState(0)
  const [postLimitError, setPostLimitError] = useState("")

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login"
    }
  }, [isAuthenticated])

  // Check user's job count on mount
  useEffect(() => {
    const fetchUserJobCount = async () => {
      if (user) {
        try {
          const response = await jobService.getJobs({ page: 1, limit: 100 })
          const userJobs = response.data.filter((job) => job.user_id === user.id)
          setUserJobCount(userJobs.length)
        } catch (error) {
          console.error("Failed to fetch user job count:", error)
        }
      }
    }
    fetchUserJobCount()
  }, [user])

  const defaultValues: JobFormInputs = {
    taskTitle: "",
    taskCategory: "",
    taskDay: "",
    taskDuration: "",
    taskPrice: "",
    city: "",
    agree: false,
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormInputs>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<JobFormInputs> = async (data) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setPostLimitError("")

    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (!token) {
      setPostLimitError("You must be logged in to post a job. Redirecting to login...")
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
      return
    }

    // Check if user has reached post limit
    if (userJobCount >= 15) {
      setPostLimitError("You have reached the maximum limit of 15 job posts. Please delete an existing post to create a new one.")
      return
    }

    if (!taskDetails || taskDetails.trim() === "") {
      setPostLimitError("Please add a description for the task.")
      return
    }

    // Validate and parse form data
    const categoryId = parseInt(data.taskCategory)
    const price = parseFloat(data.taskPrice)

    if (isNaN(categoryId)) {
      setPostLimitError("Please select a valid category.")
      return
    }

    if (isNaN(price)) {
      setPostLimitError("Please enter a valid price.")
      return
    }

    const newJob = {
      title: data.taskTitle,
      description: taskDetails,
      category_id: categoryId,
      price: price,
      duration: data.taskDuration,
      city: data.city,
      date: data.taskDay,
      status: "pending" as const, // All jobs start as pending for moderation
    }

    console.log("Submitting job:", newJob)

    try {
      const result = await createJobMutation.mutateAsync(newJob)
      console.log("Job created successfully:", result)

      // Upload image if selected
      if (selectedImage && result) {
        console.log("Uploading image for job:", result.id)
        await jobService.uploadJobImages(result.id, [selectedImage])
      }

      // Reset form
      reset(defaultValues)
      setTaskDetails("")
      setSelectedImage(null)
      setImageError("")
      setUserJobCount(userJobCount + 1)

      // Show success message
      setPostLimitError("")
      alert("Job posted successfully! It will be reviewed before being published.")
    } catch (error: any) {
      console.error("Failed to create job:", error)
      console.error("Error details:", error.response?.data)

      // Show error message to user
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.message).join(", ")
        setPostLimitError(`Failed to create job: ${errorMessages}`)
      } else if (error.response?.data?.message) {
        setPostLimitError(`Failed to create job: ${error.response.data.message}`)
      } else {
        setPostLimitError("Failed to create job. Please try again.")
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("")
    const file = e.target.files?.[0]

    if (file) {
      // Check file size (max 1MB)
      if (file.size > 1024 * 1024) {
        setImageError("Image size must be less than 1MB")
        e.target.value = ""
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setImageError("Please select a valid image file")
        e.target.value = ""
        return
      }

      setSelectedImage(file)
    }
  }

  const warningText = "text-red-500"

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className={`overflow-hidden shadow rounded-md ${createJobMutation.isPending ? "form-overlay" : ""}`}>
                <div className="bg-white p-6 md:px-4 py-5">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Post Limit Error */}
                    {postLimitError && (
                      <div className="col-span-12 mb-4 rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{postLimitError}</h3>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <div className="col-span-12">
                      <FormLabel id="taskTitle" title="Title" />
                      <input type="text" id="taskTitle" {...register("taskTitle", { required: true, minLength: 3, maxLength: 100 })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskTitle && <span className={warningText}>Add the task title (Maximum 100 characters).</span>}
                    </div>

                    {/* Details - Simple Markdown Textarea */}
                    <div className="col-span-12">
                      <FormLabel id="taskDetails" title="Details" />
                      <textarea id="taskDetails" value={taskDetails} onChange={(e) => setTaskDetails(e.target.value)} placeholder="Describe the task in detail... (Markdown supported)" className="p-3 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2 min-h-[150px] resize-y" />
                      <p className="mt-1 text-xs text-gray-500">You can use Markdown formatting (e.g., **bold**, *italic*, - lists)</p>
                      {!taskDetails && <span className={warningText}>Add description of the task.</span>}
                    </div>

                    {/* Category */}
                    <div className="col-span-12">
                      <FormLabel id="taskCategory" title="Category" />
                      <select
                        id="taskCategory"
                        className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded"
                        {...register("taskCategory", {
                          required: "Category is required",
                          validate: (value) => value !== "" || "Please select a valid category",
                        })}
                      >
                        <JobCategories />
                      </select>
                      {errors.taskCategory && <span className={warningText}>{errors.taskCategory.message || "Task Category is required"}</span>}
                    </div>

                    {/* Date */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskDay" title="Date" />
                      <input type="date" id="taskDay" {...register("taskDay", { required: true })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDay && <span className={warningText}>Set task starting date.</span>}
                    </div>

                    {/* Duration */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskDuration" title="Duration" />
                      <input type="text" placeholder="In Hours" id="taskDuration" {...register("taskDuration", { required: true, pattern: /^[0-9]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDuration && <span className={warningText}>Set the duration of task (Eg: 1).</span>}
                    </div>

                    {/* Price */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskPrice" title="Price" />
                      <input type="text" placeholder="In Euros" id="taskPrice" {...register("taskPrice", { required: true, pattern: /^[0-9.]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskPrice && <span className={warningText}>Set a price (Eg: 10).</span>}
                    </div>

                    {/* Location */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="city" title="Location" />
                      <select id="city" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("city", { required: true })}>
                        <option value="">Select</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Tampere">Tampere</option>
                      </select>
                      {errors.city && <span className={warningText}>Select your location.</span>}
                    </div>

                    {/* Image Upload */}
                    <div className="col-span-12">
                      <FormLabel id="taskImage" title="Image (Optional)" required={false} />
                      <input type="file" id="taskImage" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-Green-500 file:text-dark hover:file:bg-Green-100" />
                      <p className="mt-1 text-xs text-gray-500">Max 1MB, single image only</p>
                      {imageError && <span className={warningText}>{imageError}</span>}
                      {selectedImage && <p className="mt-1 text-xs text-green-600">✓ {selectedImage.name} selected</p>}
                    </div>

                    {/* Terms */}
                    <div className="col-span-12">
                      <p>
                        <input id="agree" type="checkbox" className="inline mr-2" {...register("agree", { required: true })} /> I agree to{" "}
                        <Link to="/terms" className="text-green-500 hover:text-green-900">
                          terms
                        </Link>{" "}
                        and conditions.
                      </p>
                      {errors.agree && <span className={warningText}>Please agree to terms and conditions.</span>}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <button type="submit" disabled={createJobMutation.isPending} className="rounded cursor-pointer p-3 mt-3 text-white font-bold w-full md:w-1/2 bg-Green-500 hover:bg-Green-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition">
                    {createJobMutation.isPending ? "Posting..." : "Post Task"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddJob
