import { Link, useNavigate } from "react-router-dom"
import logo from "../../logo.png"
import { useAuth } from "../../hooks/useAuth"
import ThemeToggle from "../base/ThemeToggle"

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  const handlePostTask = () => {
    navigate("/add-job")
  }

  const handleLoginToPost = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <section className="bg-gradient-to-r from-Green-900 via-Green-500 to-Green-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg backdrop-blur-sm">
      <nav className="relative container px-4 py-4 mx-auto md:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="transform hover:scale-105 transition-transform duration-200">
              <img src={logo} alt="Logo" className="h-10 drop-shadow-lg" />
            </Link>
          </div>

          <div className="flex items-center space-x-3 text-right">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link to="/admin" className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40">
                    Admin
                  </Link>
                )}
                <Link to="/my-jobs" className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40">
                  My Jobs
                </Link>
                <button onClick={handlePostTask} className="bg-white dark:bg-gray-800 text-Green-900 dark:text-Green-500 font-bold px-5 py-2.5 rounded-lg hover:shadow-glow transform hover:scale-105 transition-all duration-200">
                  Post A Task
                </button>
                <Link to="/profile" className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-Green-900 dark:text-white font-semibold px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{user?.first_name || "Account"}</span>
                </Link>
                <button onClick={handleLogout} className="bg-red-600 dark:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLoginToPost} className="bg-white dark:bg-gray-800 text-Green-900 dark:text-Green-500 font-bold px-6 py-2.5 rounded-lg hover:shadow-glow transform hover:scale-105 transition-all duration-200">
                Login to Post a Task
              </button>
            )}
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Header
