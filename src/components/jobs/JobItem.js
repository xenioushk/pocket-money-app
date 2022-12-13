import React, { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import ReCAPTCHA from "react-google-recaptcha"

const JobItem = (props) => {
  const [showCaptcha, setShowCaptcha] = useState(false)

  //Recaptcha
  const [captchaVerified, setCaptchaVerified] = useState(0)
  const sitekey = process.env.REACT_APP_SEC_SITE_KEY
  function recaptchaOnChange(value) {
    setCaptchaVerified(1)
  }

  const showCaptchaBox = (e) => {
    setShowCaptcha(!showCaptcha)
  }

  return (
    <div className="bg-Gray-300 space-y-2 border-2 border-bg-Gray-300 mb-4 p-2 md:p-8 mb-0" key={props.job.id}>
      <h2 className="text-2xl font-bold mb-3">
        {!props.single ? (
          <Link to={`/job/${props.job.uuid}`} className="transition text-Green-900 hover:text-black">
            {props.job.title}
          </Link>
        ) : (
          <>{props.job.title}</>
        )}
      </h2>

      {!props.single ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-1">
              <p>Day: {props.job.date}</p>
              <p>Location: {props.job.city}</p>
              <p>
                Duration: {props.job.duration} hour
                {props.job.duration > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="text-right relative">
            <span className="text-sm absolute right-0 top-3 shadow-3xl px-2 py-2 font-nomal place-self-center rounded bg-Gray-900 md:text-sm md:font-bold md:p-3 md:top-3 lg:font-bold lg:-top-3 lg:text-lg">{props.job.price ? props.job.price : 0} &euro;</span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 mb-5">
              <div className={!props.single ? "hidden md:block" : "block"} dangerouslySetInnerHTML={{ __html: props.job.excerpt }} />
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-1">
                <p>Day: {props.job.date}</p>
                <p>Location: {props.job.city}</p>
                <p>
                  Duration: {props.job.duration} hour
                  {props.job.duration > 1 ? "s" : ""}
                </p>
                <p>Category: {props.job.category}</p>
              </div>
            </div>
            <div className="text-right relative">
              <span className="text-sm absolute right-0 top-3 shadow-3xl px-2 py-2 font-nomal place-self-center rounded bg-Gray-900 sm:text-xl sm:font-bold md:p-3 md:top-1">{props.job.price ? props.job.price : 0} &euro;</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-block px-4 py-2 bg-Green-500 text-white hover:bg-Green-900 text-black mt-6" onClick={showCaptchaBox}>
              Contact Details
            </button>
          </div>

          <div className={`flex justify-end ${!showCaptcha ? "hidden" : ""}`}>
            <ReCAPTCHA sitekey={sitekey} onChange={recaptchaOnChange} />
          </div>

          {captchaVerified ? (
            <>
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
            </>
          ) : (
            ""
          )}
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
