import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
    <section className="mt-6 border-t-2 border-black-500">
      <div className="container flex flex-col-reverse items-center justify-between mx-auto md:flex-row py-6 ">
        <div className="text-left md:w-1/2">
          <p>Copyright &copy; 2022. All Rights Reserved.</p>
        </div>
        <div className="space-x-6 mb-3 md:w-1/2 text-right">
          <Link to="/" className="text-green-500">Home</Link> 
          <Link to="/about-us" className="text-green-500">About</Link>
          <Link to="/terms" className="text-green-500">Terms</Link>
        </div>
      </div>
      </section>
    </>
  )
}

export default Footer
