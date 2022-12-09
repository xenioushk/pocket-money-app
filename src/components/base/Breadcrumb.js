import React from "react"
import "tw-elements"

import { Link } from "react-router-dom"

const Breadcrumb = (props) => {
  return (
    <>
      <nav className="bg-Gray-100 space-y-2 border-1 border-bg-Gray-100 px-5 py-3 w-full mt-2 mb-2">
        <ol className="list-reset text-sm font-normal md:font-bold md:font-bold flex">
          <li>
            <Link to={"/"} className="text-Green-900 hover:text-gray-500">
              Home
            </Link>
          </li>

          {props.category ? (
            <>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link to={`/category/${props.catSlug}`} className="text-Green-900 hover:text-gray-500">
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
              <li className="text-gray-900 font-normal">{props.title}</li>
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
