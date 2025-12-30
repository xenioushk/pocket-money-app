import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useToast } from "../../hooks/useToast"
import jobService from "../../services/jobService"
import { Job } from "../../types"
import Page from "./Page"
import ConfirmDialog from "../base/ConfirmDialog"
import loader from "../../loader.gif"

const MyJobs = () => {
  const { user, isAuthenticated } = useAuth()
  const toast = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  })

  useEffect(() => {
    document.title = "My Jobs | Pocket Money"

    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }

    fetchUserJobs()
  }, [isAuthenticated, user])

  const fetchUserJobs = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const response = await jobService.getJobs({ page: 1, limit: 100 })
      const userJobs = response.data.filter((job) => job.user_id === user.id)
      setJobs(userJobs)
    } catch (error) {
      console.error("Failed to fetch user jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (jobId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Job",
      message: "Are you sure you want to delete this job? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await jobService.deleteJob(jobId)
          // Remove from local state
          setJobs(jobs.filter((job) => job.id !== jobId))
          toast.success("Job deleted successfully!")
        } catch (error) {
          console.error("Failed to delete job:", error)
          toast.error("Failed to delete job. Please try again.")
        }
      },
    })
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-gray-100 text-gray-800",
      inactive: "bg-gray-100 text-gray-600",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}>{status.toUpperCase()}</span>
  }

  return (
    <Page title="My Jobs">
      <div className="container px-4 mx-auto mt-6 md:px-0">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Posted Jobs</h1>
            <Link to="/add-job" className="bg-Green-500 text-white px-4 py-2 rounded hover:bg-Green-100 transition">
              Post New Job
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <img src={loader} alt="Loading..." className="w-16" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">You haven't posted any jobs yet.</p>
              <Link to="/add-job" className="inline-block bg-Green-500 text-white px-6 py-3 rounded hover:bg-Green-100 transition">
                Post Your First Job
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-semibold">Price:</span> €{job.price}
                        </div>
                        <div>
                          <span className="font-semibold">Duration:</span> {job.duration}h
                        </div>
                        <div>
                          <span className="font-semibold">City:</span> {job.city}
                        </div>
                        <div>
                          <span className="font-semibold">Date:</span> {new Date(job.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Link to={`/job/${job.id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                        View
                      </Link>
                      <Link to={`/edit-job/${job.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(job.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {jobs.length > 0 && <div className="mt-6 text-center text-gray-600">Total Jobs: {jobs.length} / 5</div>}
        </div>
      </div>

      <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} variant="danger" onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
    </Page>
  )
}

export default MyJobs
