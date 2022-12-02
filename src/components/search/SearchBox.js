import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const SearchBox = () => {
  const [searchText, setSearchText] = useState("")

  const [spinnerStatus, setSpinnerStatus] = useState(0)
  const [spinnerText, setSpinnerText] = useState("")

  const [searchStatus, setSearchStatus] = useState(0)
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    setSpinnerText("")
    if (searchText.length === 0) {
      setSearchStatus(0)
      setSpinnerStatus(0)
    }

    if (searchText.length > 1 && searchText.length < 3) {
      setSpinnerStatus(1)
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
        setSpinnerStatus(0)
        if (res.data.count === 0) {
          setSpinnerText("No results found")
          return 1
          // setSearchingTextStatus(0)
        } else {
          setSearchStatus(1)
          setSearchData(res.data.data)
        }
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="container px-4 mx-auto items-center mt-4 md:px-0">
      <form className="flex items-center mx-auto mt-8 mb-8 md:w-2/3" onSubmit={onSubmit}>
        <label htmlFor="jobSearch" className="sr-only">
          Search
        </label>
        <div className="relative w-full flex">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>

          <div className={`flex absolute inset-y-0 right-2 items-center pl-3 pointer-events-none  ${spinnerStatus ? "" : "hidden"}`}>
            <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
          </div>
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" id="jobSearch" className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded focus:border-gray-500 focus:border-gray-500 block w-full pl-10 p-2.5" placeholder="Search Job" required="" />

          <div className="absolute w-full mt-12">
            {spinnerText !== "" ? <div className="justify-center text-center w-full">{spinnerText}</div> : ""}
            <div className=" block">
              {searchStatus && searchData.length > 0 ? (
                <div className="justify-center w-full">
                  <ul className="bg-white bg-gray-50 border rounded border-gray-300">
                    {searchData.map((job, index) => (
                      <li className="p-2 px-2 bg-white-100 w-full" key={index}>
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
        </div>
      </form>
    </div>
  )
}

export default SearchBox
