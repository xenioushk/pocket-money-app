import React from "react"
import { useState } from "react"

const AddJob = () => {
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

  //functions.

  const handleSubmit = (e) => {
    var isValid = false

    if (firstname.trim() === "") {
      console.log("Firstname Required.")
    }

    if (lastname.trim() === "") {
      console.log("Lastname Required.")
    }

    if (contact.trim() === "") {
      console.log("Contact Required.")
    }

    if (isValid === true) {
      alert("Submit Form")
    }

    e.preventDefault()
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap  justify-center mt-20">
          <h1 className="text-4xl underline underline-offset-4">Post a Task</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-8 gap-6">
                    <h2 className="col-span-8 text-center text-2xl underline mb-3">Contact Details of Taks Poster</h2>
                    {/* First Name */}
                    <div className="col-span-4">
                      <label htmlFor="firstname" className="text-left block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input type="text" name="firstname" id="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Last Name */}
                    <div className="col-span-4">
                      <label htmlFor="lastname" className="text-left block  text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Email */}
                    <div className="col-span-4">
                      <label htmlFor="email" className="text-left block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Contact */}
                    <div className="col-span-4">
                      <label htmlFor="contact" className="text-left block text-sm font-medium text-gray-700">
                        Contact
                      </label>
                      <input type="text" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* Street Address */}
                    <div className="col-span-8">
                      <label htmlFor="address" className="text-left block text-sm font-medium text-gray-700">
                        Address
                      </label>

                      <textarea name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                    </div>
                    {/* City */}
                    <div className="col-span-4">
                      <label htmlFor="city" className="text-left block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>
                    {/* ZIP */}
                    <div className="col-span-4">
                      <label htmlFor="zipcode" className="text-left block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input type="text" name="zipcode" id="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>

                    <h2 className="col-span-8 text-center text-2xl underline mb-3">Description of Task</h2>

                    {/* Title of the Task */}
                    <div className="col-span-8">
                      <label htmlFor="taskTitle" className="text-left block text-sm font-medium text-gray-700">
                        Title of the task <small className="text-red">*</small>
                      </label>
                      <textarea name="taskTitle" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"></textarea>
                    </div>

                    {/* Details of the Task */}
                    <div className="col-span-8">
                      <label htmlFor="taskDetails" className="text-left block text-sm font-medium text-gray-700">
                        Details of the task <small className="text-red">*</small>
                      </label>
                      <input type="text" name="taskDetails" id="taskDetails" value={taskDetails} onChange={(e) => settaskDetails(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
                    </div>

                    {/* Duration of the Task */}
                    <div className="col-span-8">
                      <label htmlFor="taskDuration" className="text-left block text-sm font-medium text-gray-700">
                        Duration of the task <small className="text-red">*</small>
                      </label>
                      <input type="text" name="taskDuration" id="taskDuration" value={taskDuration} onChange={(e) => setTaskDuration(e.target.value)} className="mt-2 block w-full rounded border-2 border-gray-500 focus:border-2" />
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
