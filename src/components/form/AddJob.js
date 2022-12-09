import React, { useState } from "react"
import FormHeading from "./FormHeading"
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"
import FormLabel from "./FormLabel"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import JobCategories from "./JobCategories"

const AddJob = () => {
  document.title = "Add A New Job | Pocket Money"
  const defaultValues = {
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
    agree: [],
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  })

  const sendPostRequest = async (data) => {
    try {
      // console.log("Inside Axios")
      // console.log(data)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setStatus(1)
      setstatusMessage("Please wait .....")
      setformOverLay(1)

      const newJob = {
        userId: 1,
        taskTitle: data.taskTitle,
        taskDetails: data.taskDetails,
        taskCategory: data.taskCategory,
        taskDay: data.taskDay,
        taskDuration: data.taskDuration,
        taskPrice: data.taskPrice,
        city: data.city,
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        email: data.email,
      }

      const resp = await axios.post("/wp-json/pmapi/v1/create", newJob)
      // console.log(resp.data)
      if (resp.data.status === 1) {
        setstatusMessage(resp.data.msg)
        setformOverLay(0)
        // setsubmitBtn(0)
        reset(defaultValues)
        setTimeout(() => {
          setCaptchaVerified(0)
          setStatus(0)
        }, 3000)
      }
      // resetFields()
    } catch (err) {
      // Handle Error Here
      setstatusMessage("Unable to create job post.")
      setformOverLay(0)
      // setsubmitBtn(0)
      console.error(err)
    }
  }
  const onSubmit = (data) => {
    console.log(data)
    // setsubmitBtn(1)
    sendPostRequest(data)
  }
  const warningText = "text-red-500"
  // console.log(watch("example")) // watch input value by passing the name of it

  const [status, setStatus] = useState(0)
  const [statusMessage, setstatusMessage] = useState("")
  const [formOverLay, setformOverLay] = useState(0)
  // const [submitBtn, setsubmitBtn] = useState(0)
  //Recaptcha
  const [captchaVerified, setCaptchaVerified] = useState(0)
  const sitekey = process.env.REACT_APP_SEC_SITE_KEY
  function recaptchaOnChange(value) {
    setCaptchaVerified(1)
  }
  //
  return (
    <>
      <div>
        <div className={`text-center bg-brightRed justify-center mx-auto w-1/3 p-3 text-white ${status ? "" : "hidden"}`} dangerouslySetInnerHTML={{ __html: statusMessage }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className={`overflow-hidden shadow rounded-md" ${formOverLay === 1 ? "form-overlay" : ""}`}>
                <div className="bg-white p-6 md:px-4 py-5">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Title of the Task */}
                    <div className="col-span-12">
                      <FormLabel id="taskTitle" title="Title" />
                      <input type="text" name="taskTitle" id="taskTitle" {...register("taskTitle", { required: true, minLength: 3, maxLength: 100 })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskTitle && <span className={warningText}>Add the task title (Maximum 100 characters).</span>}
                    </div>

                    {/* Details of the Task */}
                    <div className="col-span-12">
                      <FormLabel id="taskDetails" title=" Details" />
                      <textarea name="taskDetails" id="taskDetails" {...register("taskDetails", { required: true, minLength: 3, maxLength: 1200 })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                      {errors.taskDetails && <span className={warningText}>Add description of the task (Maximum 1200 characters).</span>}
                    </div>
                    {/* Title of the Task */}
                    <div className="col-span-12">
                      <FormLabel id="taskCategory" title="Category" />
                      <select name="taskCategory" id="taskCategory" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("taskCategory", { required: true })}>
                        <JobCategories />
                      </select>
                      {errors.taskCategory && <span className={warningText}>Task Category is required</span>}
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskDay" title="Day" />
                      <input type="text" placeholder="01.01.2022" name="taskDay" id="taskDay" {...register("taskDay", { required: true, pattern: /^\d{2}\.\d{2}\.\d{4}$/ })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDay && <span className={warningText}>Set task starting day (Eg: 22.11.2022).</span>}
                    </div>

                    {/* Duration*/}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskDuration" title="Duration" />
                      <input type="text" placeholder="In Hours" name="taskDuration" id="taskDuration" {...register("taskDuration", { required: true, pattern: /^[0-9]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDuration && <span className={warningText}>Set the duration of task (Eg: 1).</span>}
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="taskPrice" title="Price" />
                      <input type="text" placeholder="In Euros" name="taskPrice" id="taskPrice" {...register("taskPrice", { required: true, pattern: /^[0-9.]+$/i })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskPrice && <span className={warningText}>Set a price (Eg: 10).</span>}
                    </div>

                    {/* Location */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="city" title="Location" />
                      <select name="city" id="city" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("city", { required: true })}>
                        <option value="">Select</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Tampere">Tampere</option>
                      </select>
                      {errors.city && <span className={warningText}>Select your location.</span>}
                    </div>

                    {/* Terms */}
                    <div className="col-span-12">
                      <p>
                        <input name="agree" id="agree" type="checkbox" className="inline" {...register("agree", { required: true })} value="" /> I agree to{" "}
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
                      <input type="text" placeholder="John" name="firstName" id="firstName" {...register("firstName", { required: true })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.firstName && <span className={warningText}>Add your first name.</span>}{" "}
                    </div>
                    {/* Last Name */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="lastName" title="Last Name" required={false} />
                      <input type="text" placeholder="Doe" name="lastName" id="lastName" {...register("lastName")} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Email */}
                    <div className="col-span-12 md:col-span-6">
                      <FormLabel id="email" title="Email" />
                      <input
                        type="text"
                        placeholder="john.doe@example.com"
                        name="email"
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
                      <input type="text" placeholder="+3484412132" name="contact" id="contact" {...register("contact", { required: true, pattern: /^\+?[1-9][0-9]{7,14}$/ })} className="p-2 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
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
