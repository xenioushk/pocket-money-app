import React from "react"
import { Link } from "react-router-dom"

const JobItem = ({ job }) => {
  return (
    <div className="job-single-item" key={job.id}>
      <h2>
        <Link to={`/job/${job.id}`}>{job.title}</Link>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: job.excerpt }} />
      <p className="job-price">Price: &euro; {job.price}</p>
      <p className="job-price">Category: {job.category}</p>
      <p className="job-price">Posted By: Mahbub</p>
      <p className="job-price">Date: {job.date}</p>
    </div>
  )
}

export default JobItem
