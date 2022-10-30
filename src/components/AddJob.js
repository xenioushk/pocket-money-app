import React from "react"
import { useState } from "react"

const AddJob = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  //functions.

  const onSubmit = (e) => {
    alert("Hello")
    e.preventDefault()
  }

  return (
    <div>
      <form className="job-form" onSubmit={onSubmit}>
        <label For="title">Job Title</label>
        <input type="text" id="title" value={title} placeholder="Add job title" onChange={(e) => setTitle(e.target.value)} />

        <label For="description">Job Description</label>
        <textarea id="description" placeholder="Add job title" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label For="category">Job Category</label>
        <select name="category" id="category">
          <option value="">-Select-</option>
          <option value="">child care</option>
          <option value="">delivery</option>
        </select>

        <label For="price">Job price</label>
        <textarea value="" placeholder="Add job price"></textarea>

        <label For="email">Email</label>
        <textarea value="" placeholder="Add Email"></textarea>

        <label For="phone_no">Phone No</label>
        <textarea value="" placeholder="Add phone no"></textarea>

        <input type="submit" value="Submit" className="btn mt-3" />
      </form>
    </div>
  )
}

export default AddJob
