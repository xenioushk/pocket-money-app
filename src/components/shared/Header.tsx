import { Link, useNavigate } from "react-router-dom"
import logo from "../../logo.png"
import { useAuth } from "../../hooks/useAuth"

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
    <section className="bg-Green-900">
      <nav className="relative container px-4 py-3 mx-auto md:px-0">
        <div className="flex items-center justify-between">
          <div className="">
            <Link to="/">
              <span className="text-2xl text-underline-none text-bold">
                <img src={logo} alt="Logo" />
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-3 text-right">
            {isAuthenticated ? (
              <>
                <button onClick={handlePostTask} className="bg-Green-500 text-dark font-bold px-4 py-2 rounded hover:bg-Green-100">
                  Post A Task
                </button>
                <Link to="/profile" className="flex items-center space-x-2 bg-white text-Green-900 font-semibold px-4 py-2 rounded hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{user?.first_name || 'Account'}</span>
                </Link>
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLoginToPost} className="bg-Green-500 text-dark font-bold px-6 py-2 rounded hover:bg-Green-100">
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
