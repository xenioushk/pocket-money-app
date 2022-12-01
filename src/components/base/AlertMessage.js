import React from "react"
import "tw-elements"

const AlertMessage = (props) => {
  function renderSwitch(type) {
    switch (type) {
      case "secondary":
        return "bg-purple-100 rounded-lg py-5 px-6 mb-4 text-base text-purple-700 mb-3"
      case "success":
        return "bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
      case "danger":
        return "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
      case "warning":
        return "bg-yellow-100 rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 mb-3"
      default:
        return "bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
    }
  }

  return (
    <>
      <div className={renderSwitch(props.type)} role="alert">
        {props.title}
      </div>
    </>
  )
}

export default AlertMessage
