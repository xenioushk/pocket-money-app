import React from "react"
import { Link } from "react-router-dom"
import logo from "../logo.png" // Tell webpack this JS file uses this image

const Header = () => {
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

          <div className="space-x-6 text-right md:flex">
            <Link to="/add-job" className="bg-Green-500 text-dark font-bold  text-underline-none p-2 block hover:bg-Green-100 md:px-4 py-2 inline-block">
              Post A Task
            </Link>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Header
