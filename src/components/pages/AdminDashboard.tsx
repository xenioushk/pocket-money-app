import { useState, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import jobService from "../../services/jobService"
import { Job } from "../../types"
import Page from "./Page"
import Pagination from "../base/Pagination"
import ConfirmDialog from "../base/ConfirmDialog"
import loader from "../../loader.gif"
import { useToast } from "../../hooks/useToast"

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
    variant?: "danger" | "warning" | "info"
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  })

  useEffect(() => {
    document.title = "Admin Dashboard | Pocket Money"

    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }

    if (user?.role !== "admin") {
      toast.error("Access denied. Admin only.")
      navigate("/")
      return
    }

    fetchJobs()
  }, [isAuthenticated, user, statusFilter, currentPage])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const response = await jobService.getJobs({
        page: currentPage,
        limit: 20,
        ...(statusFilter !== "all" && { status: statusFilter }),
      })
      setJobs(response.data)
      setTotalPages(response.pagination.pages)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (jobId: number, newStatus: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "Change Job Status",
      message: `Are you sure you want to change the status to ${newStatus}?`,
      variant: "info",
      onConfirm: async () => {
        try {
          await jobService.updateJobStatus(jobId, newStatus)
          fetchJobs()
          toast.success(`Job status updated to ${newStatus}!`)
        } catch (error) {
          console.error("Failed to update job status:", error)
          toast.error("Failed to update job status. Please try again.")
        }
      },
    })
  }

  const handleDelete = async (jobId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Job",
      message: "Are you sure you want to delete this job? This action cannot be undone.",
      variant: "danger",
      onConfirm: async () => {
        try {
          await jobService.deleteJob(jobId)
          fetchJobs()
          toast.success("Job deleted successfully!")
        } catch (error) {
          console.error("Failed to delete job:", error)
          toast.error("Failed to delete job. Please try again.")
        }
      },
    })
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
      approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      rejected: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
      active: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
      completed: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300",
      inactive: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
    }
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status as keyof typeof colors]}`}>{status.toUpperCase()}</span>
  }

  return (
    <Page title="Admin Dashboard">
      <div className="container px-4 mx-auto mt-6 md:px-0">
        <div className="card-modern p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-Green-500 to-Green-900 bg-clip-text text-transparent">Job Management</h1>
            <div className="flex gap-3">
              <Link to="/admin/categories" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold">
                Manage Categories
              </Link>
              <Link to="/admin/create-user" className="bg-gradient-to-r from-Green-500 to-Green-900 text-white px-6 py-2.5 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold">
                Create User
              </Link>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white"
            >
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <img src={loader} alt="Loading..." className="w-16" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No jobs found for the selected filter.</div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">City</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{job.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                          <Link to={`/job/${job.id}`} className="text-blue-600 hover:underline">
                            {job.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {job.first_name} {job.last_name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.category_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">€{job.price}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{job.city}</td>
                        <td className="px-4 py-3 text-sm">{getStatusBadge(job.status)}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col gap-1">
                            {job.status === "pending" && (
                              <>
                                <button onClick={() => handleStatusChange(job.id, "approved")} className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition">
                                  Approve
                                </button>
                                <button onClick={() => handleStatusChange(job.id, "rejected")} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition">
                                  Reject
                                </button>
                              </>
                            )}
                            <select onChange={(e) => handleStatusChange(job.id, e.target.value)} className="border rounded px-2 py-1 text-xs" defaultValue="">
                              <option value="" disabled>
                                Change Status
                              </option>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="inactive">Inactive</option>
                            </select>
                            <button onClick={() => handleDelete(job.id)} className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} variant={confirmDialog.variant} onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
    </Page>
  )
}

export default AdminDashboard
