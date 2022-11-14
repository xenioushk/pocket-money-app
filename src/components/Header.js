import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="relative container px-4 mx-auto mt-6 mb-6 md:px-0">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <Link to="/">
              <span className="text-2xl text-underline-none text-bold">Pocket Money</span>
            </Link>
          </div>

          <div className="space-x-6 text-right md:flex">
            <Link to="/add-job" className="bg-gray-600 text-white text-underline-none p-2 block rounded hover:bg-gray-800 md:px-4 py-2 inline-block">
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
