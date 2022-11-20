import React, { useState } from "react";
import FormHeading from "./form/FormHeading";
import axios from "axios";
import FormLabel from "./form/FormLabel";

const AddJob = () => {
  const [status, setStatus] = useState(0);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [zipcode, setZipcode] = useState("");

  // useEffect(() => {
  //   setStatus(1)
  // }, [status])

  //functions.

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    // setCity("");
    // setZipcode("");
    // setAddress("");
    // setTaskTitle("");
    // setTaskDetails("");
    // // setTaskCategory("");
    // setTaskDuration("");
  };

  // const newJob = {
  //   userId: 1,
  //   taskTitle: taskTitle,
  //   taskDetails: taskDetails,
  //   // taskCategory: taskCategory,
  //   taskDuration: taskDuration,
  // };

  const sendPostRequest = async () => {
    try {
      // const resp = await axios.post("/wp-json/pmapi/v1/create", newJob);
      // console.log(resp.data);
      resetFields();
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  // Error Class.
  // border-red-500

  const handleSubmit = async (e) => {
    var isValid = true;

    if (firstname.trim() === "") {
      isValid = false;
      console.log("Firstname Required.");
    }

    if (lastname.trim() === "") {
      console.log("Lastname Required.");
    }

    if (contact.trim() === "") {
      console.log("Contact Required.");
    }

    // if (taskTitle.trim() === "") {
    //   isValid = false;
    //   console.log("Task Title Required.");
    // }

    // if (taskDetails.trim() === "") {
    //   isValid = false;
    //   console.log("Task Details Required.");
    // }

    if (isValid === true) {
      sendPostRequest();
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
    // console.log(taskCategory)
    // console.log(taskDuration)

    // sendPostRequest()

    window.scrollTo({ top: 0, behavior: "smooth" });
    setStatus(1);
    setTimeout(() => {
      setStatus(0);
    }, 3000);
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div
          className={`text-center bg-brightRed justify-center mx-auto w-1/3 p-3 text-white ${
            status ? "" : "hidden"
          }`}
        >
          Job created successfully!
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          <h1 className="text-4xl underline underline-offset-4">Post a Task</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 flex flex-wrap justify-center">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-8 gap-6">
                    <FormHeading title="Contact Details of Taks Poster" />
                    {/* First Name */}
                    <div className="col-span-4">
                      <FormLabel id="firstname" title="First Name" />
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="col-span-4">
                      <FormLabel
                        id="lastname"
                        title="Last Name"
                        required={false}
                      />
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-span-4">
                      <FormLabel id="email" title="Email" />
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"
                      />
                    </div>
                    {/* Contact */}
                    <div className="col-span-4">
                      <FormLabel id="contact" title="Contact" />
                      <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="p-2 mt-2 block w-full rounded border-2 border-gray-500 focus:border-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-cyan-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJob;
