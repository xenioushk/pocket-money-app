import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <p>Copyright &copy; 2022. </p>
      <Link to="/">Home</Link> | <Link to="/about-us">About</Link> | <Link to="/terms">Terms</Link>
    </div>
  )
}

export default Footer
