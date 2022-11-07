import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const JobItem = (props) => {
  return (
    <div className="space-y-4 bg-white border-2 border-gray-500 mb-4 p-6" key={props.job.id}>
      <h2 className="text-2xl">
        <strong>Task:</strong> {props.job.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: "<strong>Description: </strong>" + props.job.excerpt }} />
      <p className="mb-6">
        <strong>Duration:</strong> {props.job.duration} hour(s)
      </p>

      {!props.single ? (
        <p className="mb-6">
          <Link to={`/job/${props.job.id}`} className="bg-gray-600 text-white text-underline-none px-4 py-2 rounded hover:bg-gray-800">
            Are you interested in this task?
          </Link>
        </p>
      ) : (
        <>
          <p className="mb-6">
            <strong>Category:</strong> {props.job.category}
          </p>
          <p className="mb-6">
            <strong>Price:</strong> &euro; {props.job.price}
          </p>
          <p className="mb-6">
            <strong>Post Date:</strong> {props.job.date}
          </p>

          <h3 className="text-3xl border block border-0 border-b-2 pb-2">Contact Details:</h3>

          <p className="mb-6">
            <strong>Posted By:</strong> {props.job.first_name} {props.job.last_name}
          </p>
          <p className="mb-6">
            <strong>Email:</strong> {props.job.email}
          </p>
          <p className="mb-6">
            <strong>Phone:</strong> {props.job.contact}
          </p>
          <p className="mb-6">
            <strong>Location:</strong> {props.job.city}
          </p>
          <p className="mb-6">
            <strong>Address:</strong> {props.job.address}
          </p>
        </>
      )}
    </div>
  )
}

// Default Value
JobItem.defaultProps = {
  single: false,
}

// Type Casing.
JobItem.propTypes = {
  single: PropTypes.bool,
}

export default JobItem
