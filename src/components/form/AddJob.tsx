import { useState } from "react"
import FormHeading from "./FormHeading"
import ReCAPTCHA from "react-google-recaptcha"
import FormLabel from "./FormLabel"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import JobCategories from "./JobCategories"
import { useCreateJob } from "../../hooks/useJobs"

interface JobFormInputs {
  taskTitle: string
  taskDetails: string
  taskCategory: string
  taskDay: string
  taskDuration: string
  taskPrice: string
  city: string
  firstName: string
  lastName: string
  contact: string
  email: string
  agree: boolean
}

const AddJob = () => {
  document.title = "Add A New Job | Pocket Money"

  const createJobMutation = useCreateJob()
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const sitekey = import.meta.env.VITE_SEC_SITE_KEY

  const defaultValues: JobFormInputs = {
    taskTitle: "",
    taskDetails: "",
    taskCategory: "",
    taskDay: "",
    taskDuration: "",
    taskPrice: "",
    city: "",
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
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

  const onSubmit: SubmitHandler<JobFormInputs> = (data) => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    const newJob = {
      title: data.taskTitle,
      description: data.taskDetails,
      category: data.taskCategory,
      price: parseFloat(data.taskPrice),
      location: data.city,
      recaptcha: "", // Will be populated when backend is integrated
    }

    createJobMutation.mutate(newJob, {
      onSuccess: () => {
        reset(defaultValues)
        setTimeout(() => {
          setCaptchaVerified(false)
        }, 2000)
      },
    })
  }

  const recaptchaOnChange = (_value: string | null) => {
    setCaptchaVerified(true)
  }

  const warningText = "text-red-500"
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className={`overflow-hidden shadow rounded-md" ${createJobMutation.isPending ? "form-overlay" : ""}`}>
                <div className="bg-white p-6 md:px-4 py-5">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Title of the Task */}
                    <div className="col-span-12">
                      <FormLabel id="taskTitle" title="Title" />
                      <input type="text" id="taskTitle" {...register("taskTitle", { required: true, minLength: 3, maxLength: 100 })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskTitle && <span className={warningText}>Add the task title (Maximum 100 characters).</span>}
                    </div>

                    {/* Details of the Task */}
                    <div className="col-span-12">
                      <FormLabel id="taskDetails" title=" Details" />
                      <textarea id="taskDetails" {...register("taskDetails", { required: true, minLength: 3, maxLength: 1200 })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDetails && <span className={warningText}>Add description of the task (Maximum 1200 characters).</span>}
                    </div>

                    {/* Category */}
                    <div className="col-span-12">
                      <FormLabel id="taskCategory" title="Category" />
                      <select id="taskCategory" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("taskCategory", { required: true })}>
                        <JobCategories />
                      </select>
                      {errors.taskCategory && <span className={warningText}>Task Category is required</span>}
                    </div>

                    {/* Day */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskDay" title="Day" />
                      <input type="text" placeholder="01.01.2022" id="taskDay" {...register("taskDay", { required: true, pattern: /^\d{2}\.\d{2}\.\d{4}$/ })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDay && <span className={warningText}>Set task starting day (Eg: 22.11.2022).</span>}
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

                    {/* Terms */}
                    <div className="col-span-12">
                      <p>
                        <input id="agree" type="checkbox" className="inline" {...register("agree", { required: true })} /> I agree to{" "}
                        <Link to="#" className="text-green-500 hover:text-green-900">
                          terms
                        </Link>{" "}
                        and conditions.
                      </p>
                      {errors.agree && <span className={warningText}>Please agree terms and conditions.</span>}
                    </div>

                    <FormHeading title="Contact" />

                    {/* First Name */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="firstName" title="First Name" />
                      <input type="text" placeholder="John" id="firstName" {...register("firstName", { required: true })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.firstName && <span className={warningText}>Add your first name.</span>}
                    </div>

                    {/* Last Name */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="lastName" title="Last Name" required={false} />
                      <input type="text" placeholder="Doe" id="lastName" {...register("lastName")} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>

                    {/* Email */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="email" title="Email" />
                      <input
                        type="text"
                        placeholder="john.doe@example.com"
                        id="email"
                        {...register("email", {
                          required: true,
                          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2"
                      />
                      {errors.email && <span className={warningText}>Add a valid email.</span>}
                    </div>

                    {/* Contact */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="contact" title="Phone" />
                      <input type="text" placeholder="+3484412132" id="contact" {...register("contact", { required: true, pattern: /^\+?[1-9][0-9]{7,14}$/ })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.contact && <span className={warningText}>Phone is required. Eg: 04652298xx</span>}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <ReCAPTCHA sitekey={sitekey} onChange={recaptchaOnChange} />

                  <button disabled={!captchaVerified} type="submit" className={`rounded cursor-pointer p-2 mt-3 text-dark font-bold  w-1/2 block ${!captchaVerified ? "bg-gray-200" : "bg-Green-500"} hover:${!captchaVerified ? "bg-brightRed" : "bg-Green-100"} md: px-8 inline-block`}>
                    Post
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
