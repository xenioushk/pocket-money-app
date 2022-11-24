import React, { useState } from "react"
// import FormHeading from "./FormHeading"
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"
import FormLabel from "./FormLabel"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css";

const AddJob = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    taskCategory: "",
    taskTitle: "",
    taskDetails: "",
    taskDuration: "",
    taskPrice: "",
    taskDay: "",
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
        firstName: data.firstName,
        lastName: data.lastName,
        contact: data.contact,
        email: data.email,
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        taskCategory: data.taskCategory,
        taskTitle: data.taskTitle,
        taskDetails: data.taskDetails,
        taskDuration: data.taskDuration,
        taskPrice: data.taskPrice,
        taskDay: data.taskDay,
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
        <div className={`text-center bg-brightRed justify-center mx-auto w-1/3 p-3 text-white ${status ? "" : "hidden"}`}>{statusMessage}</div>
        <div className="flex flex-wrap justify-center mt-3">
          <h1 className="text-4xl underline underline-offset-4">Post a Task</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className={`bg-white px-4 py-5 sm:p-6 ${formOverLay === 1 ? "form-overlay" : ""}`}>
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
                      <textarea name="taskDetails" id="taskDetails" {...register("taskDetails", { required: true, minLength: 3, maxLength: 1200 })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                      {errors.taskDetails && <span className={warningText}>Task details is required (Max length is 1200 characters).</span>}
                    </div>
                    {/* Title of the Task */}
                    <div className="col-span-10">
                      <FormLabel id="taskCategory" title="Task Category" />
                      <select name="taskCategory" id="taskCategory" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("taskCategory", { required: true })}>
                        <option value="">Select</option>
                        <option value="3">Care Giving</option>
                        <option value="7">Cleaning</option>
                        <option value="8">Editing</option>
                        <option value="4">Parcel Delivery</option>
                        <option value="5">Repair</option>
                      </select>
                      {errors.taskCategory && <span className={warningText}>Task Category is required</span>}
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-5">
                      <FormLabel id="taskDay" title="Day" />
                      <input type="text" placeholder="01.01.2022" name="taskDay" id="taskDay" {...register("taskDay", { required: true, pattern: /^\d{2}\.\d{2}\.\d{4}$/ })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDay && <span className={warningText}>Day is required. (Format: 22.11.2022)</span>}
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-5">
                      <FormLabel id="taskPrice" title="Price" />
                      <input type="text" placeholder="In Euros" name="taskPrice" id="taskPrice" {...register("taskPrice", { required: true, pattern: /^[0-9.]+$/i })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskPrice && <span className={warningText}>Price is required (Only numbers allowed).</span>}
                    </div>

                    {/* Duration*/}
                    <div className="col-span-5">
                      <FormLabel id="taskDuration" title="Duration" />
                      <input type="text" placeholder="In Hours" name="taskDuration" id="taskDuration" {...register("taskDuration", { required: true, pattern: /^[0-9]+$/i })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDuration && <span className={warningText}>Duration is required (Only numbers allowed).</span>}
                    </div>

                    {/* Location */}
                    <div className="col-span-5">
                      <FormLabel id="city" title="Location" />
                      <select name="city" id="city" className="bg-white border-2 border-gray-500 w-full mt-1 p-2 rounded" {...register("city", { required: true })}>
                        <option value="">Select</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Tampere">Tampere</option>
                      </select>
                      {errors.city && <span className={warningText}>Location is required.</span>}
                    </div>

                    {/* <div className="col-span-10 justify-items-right">
                      <button type="submit" className="rounded-md bg-Green-500 py-2 px-4">
                        Next
                      </button>
                    </div> */}

                    {/* <FormHeading title="Contact Details of Taks Poster" /> */}
                    {/* First Name */}
                    <div className="col-span-5">
                      <FormLabel id="firstName" title="First Name" />
                      <input type="text" placeholder="John" name="firstName" id="firstName" {...register("firstName", { required: true })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.firstName && <span className={warningText}>First Name is required</span>}{" "}
                    </div>
                    {/* Last Name */}
                    <div className="col-span-5">
                      <FormLabel id="lastName" title="Last Name" required={false} />
                      <input type="text" placeholder="Doe" name="lastName" id="lastName" {...register("lastName")} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Email */}
                    <div className="col-span-5">
                      <FormLabel id="email" title="Email" />
                      <input type="text" placeholder="john.doe@example.com" name="email" id="email" {...register("email", { required: true, pattern: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/i })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />

                      {errors.email && <span className={warningText}>Email is required</span>}
                    </div>
                    {/* Contact */}
                    <div className="col-span-5">
                      <FormLabel id="contact" title="Phone" />
                      <input type="text" placeholder="+3484412132" name="contact" id="contact" {...register("contact", { required: true })} className="p-1 mt-1 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.contact && <span className={warningText}>Phone is required</span>}
                    </div>
                    {/* Terms */}
                    <div className="col-span-10">
                      <p>
                        <input name="agree" id="agree" type="checkbox" className="inline" {...register("agree", { required: true })} value="" /> I agree to <Link to="#">terms</Link> and conditions.
                      </p>
                      {errors.agree && <span className={warningText}>Please agree terms and conditions.</span>}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <ReCAPTCHA sitekey={sitekey} onChange={recaptchaOnChange} />

                  <button disabled={!captchaVerified} type="submit" className="mt-3 bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block">
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
