import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const JobItem = (props) => {
  return (
    <div className="bg-Gray-300 space-y-2 bg-white border-2 border-bg-Gray-300 mb-4 p-2 md:px-4 py-4" key={props.job.id}>
      <h2 className="text-2xl font-bold mb-3">
        <Link to={`/job/${props.job.id}`} className="">
          {props.job.title}
        </Link>
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-y-2 gap-x-1">
            <p>Day: {props.job.date}</p>
            <p>Location: {props.job.city}</p>
            <p>
              Duration: {props.job.duration} hour{props.job.duration > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="text-center">
          <span className="px-3 py-3 place-self-center font-bold rounded bg-Gray-500 text-2xl">{props.job.price ? props.job.price : 0} &euro;</span>
        </div>
      </div>

      {!props.single ? (
        <>
          <p className="mb-6 hidden">Duration: {props.job.duration}hour(s)</p>
        </>
      ) : (
        <>
          <div className={!props.single ? "hidden md:block" : "block"} dangerouslySetInnerHTML={{ __html: "<strong>Description: </strong>" + props.job.excerpt }} />

          <p className="mb-6">
            <strong>Category:</strong> {props.job.category}
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
