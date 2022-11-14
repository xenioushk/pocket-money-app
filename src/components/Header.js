import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="relative container mx-auto mt-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <Link to="/">
              <span className="text-2xl text-underline-none text-bold">Pocket Money</span>
            </Link>
          </div>

          <div className="space-x-6 text-right md:flex">
            <Link to="/add-job" className="px-4 py-2 text-white bg-darkGrayishBlue rounded-full hover:text-gray-800">
              Post A Task
            </Link>
          </div>
        </div>
      </nav>
      <hr className="mb-4" />
    </>
  )
}

export default Header
