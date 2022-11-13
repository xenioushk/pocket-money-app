import React, { useState } from "react"
import FormHeading from "./form/FormHeading"
import axios from "axios"
import FormLabel from "./form/FormLabel"
import { useForm } from "react-hook-form";


const AddJob = () => {

const { register, handleSubmit, watch, formState: { errors } } = useForm();
const warningText = 'text-red-500';

  const [status, setStatus] = useState(0)
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipcode, setZipcode] = useState("")

  const [taskTitle, setTaskTitle] = useState("")
  const [taskDetails, settaskDetails] = useState("")
  const [taskDuration, setTaskDuration] = useState("")

  // useEffect(() => {
  //   setStatus(1)
  // }, [status])

  //functions.

  const resetFields = () => {
    setFirstName("")
    setLastName("")
    setContact("")
    setEmail("")
    setCity("")
    setZipcode("")
    setAddress("")
    setTaskTitle("")
    settaskDetails("")
    setTaskDuration("")
  }

  const newJob = {
    userId: 1,
    taskTitle: taskTitle,
    taskDetails: taskDetails,
    taskDuration: taskDuration,
  }

  const sendPostRequest = async () => {
    try {
      const resp = await axios.post("/wp-json/pmapi/v1/create", newJob)
      console.log(resp.data)
      resetFields()
    } catch (err) {
      // Handle Error Here
      console.error(err)
    }
  }
  // Error Class.
  // border-red-500

  {/*const handleSubmit = async (e) => {
    var isValid = true

    if (firstname.trim() === "") {
      isValid = false
      console.log("Firstname Required.")
    }

    if (lastname.trim() === "") {
      console.log("Lastname Required.")
    }

    if (contact.trim() === "") {
      console.log("Contact Required.")
    }

    if (taskTitle.trim() === "") {
      isValid = false
      console.log("Task Title Required.")
    }

    if (taskDetails.trim() === "") {
      isValid = false
      console.log("Task Details Required.")
    }

    if (isValid === true) {
      sendPostRequest()
    }

    // console.log(firstname)
    // console.log(lastname)
    // console.log(email)
    // console.log(contact)
    // console.log(address)
    // console.log(city)
    // console.log(zipcode)
    // console.log(taskTitle)
    // console.log(taskDetails)
    // console.log(taskDuration)

    // sendPostRequest()

    window.scrollTo({ top: 0, behavior: "smooth" })
    setStatus(1)
    setTimeout(() => {
      setStatus(0)
    }, 3000)
    e.preventDefault()
  }
*/}
  return (
    <>
      <div>
        <div className={`text-center bg-brightRed justify-center mx-auto w-1/3 p-3 text-white ${status ? "" : "hidden"}`}>Job created successfully!</div>
        <div className="flex flex-wrap justify-center mt-20">
          <h1 className="text-4xl underline underline-offset-4">Post a Task</h1>
        </div>

        <form onSubmit={handleSubmit()}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-8 gap-6">
                    <FormHeading title="Contact Details of Taks Poster" />
                    {/* First Name */}
                    <div className="col-span-4">
                      <FormLabel id="firstname" title="First Name" />
                      <input type="text" name="firstname" id="firstname" {...register("firstNameRequired", { required: true })} value={firstname} onChange={(e) => setFirstName(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.firstNameRequired && <span className={warningText}>First Name is required</span>}
                    </div>
                    {/* Last Name */}
                    <div className="col-span-4">
                      <FormLabel id="lastname" title="Last Name" required={false} />
                      <input type="text" name="lastname" id="lastname"  value={lastname} onChange={(e) => setLastName(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Email */}
                    <div className="col-span-4">
                      <FormLabel id="email" title="Email" />
                      <input type="text" name="email" id="email" {...register("emailRequired", { required: true })} value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.emailRequired && <span className={warningText}>Email is required</span>}
                    </div>
                    {/* Contact */}
                    <div className="col-span-4">
                      <FormLabel id="contact" title="Contact" />
                      <input type="text" name="contact" id="contact" {...register("contactRequired", { required: true })} value={contact} onChange={(e) => setContact(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.contactRequired && <span className={warningText}>Contact is required</span>}
                    </div>
                    {/* Street Address */}
                    <div className="col-span-8">
                      <FormLabel id="address" title="Address" />
                      <textarea name="address" id="address" {...register("addressRequired", { required: true })} value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                      {errors.addressRequired && <span className={warningText}>Address is required</span>}
                    </div>
                    {/* City */}
                    <div className="col-span-4">
                      <FormLabel id="city" title="City" />
                      <input type="text" name="city" id="city" {...register("cityRequired", { required: true })} value={city} onChange={(e) => setCity(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.cityRequired && <span className={warningText}>City is required</span>}
                    </div>
                    {/* ZIP */}
                    <div className="col-span-4">
                      <FormLabel id="zipcode" title="Zip / Postal code" />
                      <input type="text" name="zipcode" id="zipcode" {...register("zipRequired", { required: true })} value={zipcode} onChange={(e) => setZipcode(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.zipRequired && <span className={warningText}>Zip number is required</span>}
                    </div>

                    <FormHeading title="Description of Task" />
                    {/* Title of the Task */}
                    <div className="col-span-8">
                      <FormLabel id="taskTitle" title="Title of the task" />
                      <input type="text" name="taskTitle" id="taskTitle" {...register("titleRequired", { required: true })} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.titleRequired && <span className={warningText}>Task title is required</span>}
                    </div>

                    {/* Details of the Task */}
                    <div className="col-span-8">
                      <FormLabel id="taskDetails" title=" Details of the task" />
                      <textarea name="taskDetails" id="taskDetails" {...register("taskDetailsRequired", { required: true })} value={taskDetails} onChange={(e) => settaskDetails(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                      {errors.taskDetailsRequired && <span className={warningText}>Details of the task is required</span>}
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-8">
                      <FormLabel id="taskDuration" title="Duration of the task" />
                      <input type="text" name="taskDuration" id="taskDuration" {...register("taskDurationRequired", { required: true })} value={taskDuration} onChange={(e) => setTaskDuration(e.target.value)} className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                      {errors.taskDurationRequired && <span className={warningText}>Duration of the task is required</span>}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Submit and Create Job Post
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
