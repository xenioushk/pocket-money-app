import React from "react"
import PropTypes from "prop-types"

const FormLabel = (props) => {
  console.log(props)
  return (
    <>
      <label htmlFor={props.id} className="text-left block text-gray-700">
        {props.title} {props.required ? <small className="text-red-800">*</small> : ""}
      </label>
    </>
  )
}

// Default Value
FormLabel.defaultProps = {
  id: "label-id",
  title: "Label",
  required: true,
}

// Type Casing.
FormLabel.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
}

export default FormLabel
