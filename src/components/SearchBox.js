import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const SearchBox = () => {
  const [searchText, setSearchText] = useState("")

  const [spinnerStatus, setSpinnerStatus] = useState(0)
  const [spinnerText, setSpinnerText] = useState("Searching......")

  const [searchStatus, setSearchStatus] = useState(0)
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    if (searchText.length === 0) {
      setSpinnerStatus(0)
    }

    if (searchText.length > 1 && searchText.length < 3) {
      setSpinnerStatus(1)
      setSpinnerText("Searching .....")
      setSearchStatus(0)

      return
    }
    const timer =
      searchText.length > 2 &&
      setTimeout(() => {
        searchCb(searchText)
      }, 1500)
    return () => clearTimeout(timer)
  }, [searchText])

  const searchCb = (s) => {
    // setSearchResultStatus(1)
    // console.log(searchText)

    axios
      .get(`/wp-json/pmapi/v1/search?s=${s}`)
      .then((res) => {
        // setSearchResultStatus(1)

        if (res.data.length < 1) {
          setSpinnerStatus(1)
          setSpinnerText("No results found")
          // setSearchingTextStatus(0)
        }

        setSearchStatus(1)
        setSearchData(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="flex items-center justify-center relative mb-6">
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </span>
          <input className="w-full bg-white placeholder:font-italitc border border-slate-300 rounded-full py-2 pl-10 pr-4 focus:outline-none" placeholder="Enter your keyword to search" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </label>

        <div className="flex border-2 border-gray-200 rounded">
          {spinnerStatus === 1 ? <div className="absolute justify-center mt-11 text-center">{spinnerText}</div> : ""}

          {searchStatus ? (
            <div className="absolute justify-center mt-11">
              <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                {searchData.map((job, index) => (
                  <li className="px-6 py-2 border-b border-gray-200 w-full" key={index}>
                    <Link to={`/job/${job.id}`}>{job.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default SearchBox
