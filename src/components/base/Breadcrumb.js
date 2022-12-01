import React from "react"
import "tw-elements"

import { Link } from "react-router-dom"

const Breadcrumb = (props) => {
  return (
    <>
      <nav className="bg-gray-100 px-5 py-3 rounded-md w-full mt-2 mb-2">
        <ol className="list-reset flex">
          <li>
            <Link to={"/"} className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
          </li>

          {props.category ? (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link to={`/category/${props.catSlug}`} className="text-blue-600 hover:text-blue-700">
                  {props.category}
                </Link>
              </li>
            </>
          ) : (
            ""
          )}

          {props.title ? (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-500">{props.title}</li>
            </>
          ) : (
            ""
          )}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumb
