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

  // Format date to human-readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""} ago`

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className={`card-modern hover:shadow-lg transition-all duration-300 mb-0 ${!single ? "p-4" : "p-6"}`} key={job.id}>
      {!single ? (
        <Link to={`/job/${job.id}`} className="block">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2">{job.title}</h3>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(job.created_at)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{job.city}</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {job.duration} hr{parseFloat(job.duration) !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md text-center min-w-[80px]">
                <div className="text-xl font-bold">€{job.price}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{job.title}</h2>
          <div className="space-y-6">
            {/* Job Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Posted</div>
                  <div className="font-medium">{formatDate(job.created_at)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Location</div>
                  <div className="font-medium">{job.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                  <div className="font-medium">
                    {job.duration} hr{parseFloat(job.duration) !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Category</div>
                  <div className="font-medium">{job.category_name}</div>
                </div>
              </div>
            </div>

            {/* Price Banner */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90">Job Budget</div>
                  <div className="text-4xl font-bold">€{job.price}</div>
                </div>
                <svg className="w-16 h-16 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Job Description</h3>
              <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: job.description }} />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-block px-4 py-2 bg-Green-500 text-white hover:bg-Green-900 text-black mt-6" onClick={showContactDetails}>
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
                <strong>Location:</strong> {job.city}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default JobItem
