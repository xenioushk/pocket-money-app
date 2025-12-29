import { useState } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import type { Job } from "../../types"

interface JobItemProps {
  job: Job
  single?: boolean
}

const JobItem = ({ job, single = false }: JobItemProps) => {
  const [showContact, setShowContact] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const sitekey = import.meta.env.VITE_SEC_SITE_KEY

  const recaptchaOnChange = (_value: string | null) => {
    setCaptchaVerified(true)
  }

  const showContactDetails = () => {
    if (!sitekey) {
      setShowContact(true)
      setCaptchaVerified(true)
    } else {
      setShowContact(!showContact)
    }
  }

  return (
    <div className="bg-Gray-300 space-y-2 border-2 border-bg-Gray-300 mb-4 p-2 md:p-8 mb-0" key={job.id}>
      <h2 className="text-2xl font-bold mb-3">
        {!single ? (
          <Link to={`/job/${job.job_hash}`} className="transition text-Green-900 hover:text-black">
            {job.title}
          </Link>
        ) : (
          <>{job.title}</>
        )}
      </h2>

      {!single ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-1">
              <p>Day: {job.created_at}</p>
              <p>Location: {job.location}</p>
              <p>Duration: {job.price} hour{job.price > 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="text-right relative">
            <span className="text-sm absolute right-0 top-3 shadow-3xl px-2 py-2 font-nomal place-self-center rounded bg-Gray-900 md:text-sm md:font-bold md:p-3 md:top-3 lg:font-bold lg:-top-3 lg:text-lg">
              {job.price || 0} &euro;
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 mb-5">
              <div className={!single ? "hidden md:block" : "block"} dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
            <div className="col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-1">
                <p>Day: {job.created_at}</p>
                <p>Location: {job.location}</p>
                <p>Duration: {job.price} hour{job.price > 1 ? "s" : ""}</p>
                <p>Category: {job.category}</p>
              </div>
            </div>
            <div className="text-right relative">
              <span className="text-sm absolute right-0 top-3 shadow-3xl px-2 py-2 font-nomal place-self-center rounded bg-Gray-900 sm:text-xl sm:font-bold md:p-3 md:top-1">
                {job.price || 0} &euro;
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              className="inline-block px-4 py-2 bg-Green-500 text-white hover:bg-Green-900 text-black mt-6" 
              onClick={showContactDetails}
            >
              Contact Details
            </button>
          </div>

          {sitekey && (
            <div className={`flex justify-end ${!showContact ? "hidden" : ""}`}>
              <ReCAPTCHA sitekey={sitekey} onChange={recaptchaOnChange} />
            </div>
          )}

          {captchaVerified && (
            <>
              <h3 className="text-3xl border block border-0 border-b-2 pb-2">Contact Details:</h3>
              <p className="mb-6">
                <strong>Posted By:</strong> {job.user_id}
              </p>
              <p className="mb-6">
                <strong>Location:</strong> {job.location}
              </p>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default JobItem
