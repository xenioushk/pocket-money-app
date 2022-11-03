import { Link } from "react-router-dom"

const Job = ({ job }) => {
  return (
    <div className="space-y-4 bg-white border-2 border-gray-500 mb-4 p-6" key={job.id}>
      <h2>
        <strong>Task Title:</strong> {job.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: "<strong>Description: </strong>" + job.excerpt }} />
      <p className="mb-6">
        <strong>Duration:</strong> {job.duration} hour(s)
      </p>
      <p>
        <Link to={`/job/${job.id}`} className="bg-gray-600 text-white text-underline-none px-4 py-2 rounded hover:bg-gray-800">
          Are you interested in this task?
        </Link>
      </p>
    </div>
  )
}

export default Job
