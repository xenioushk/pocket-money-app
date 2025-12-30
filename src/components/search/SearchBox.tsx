import { useState } from "react"
import { Link } from "react-router-dom"
import { useSearchJobs } from "../../hooks/useJobs"
import { useDebounce } from "../../hooks/useDebounce"

const SearchBox = () => {
  const [searchText, setSearchText] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchText, 800)

  // Use TanStack Query for search with automatic caching
  const { data: searchResults, isLoading } = useSearchJobs(debouncedSearchTerm)

  const showSpinner = isLoading && searchText.length >= 3
  const showResults = (searchResults?.pagination?.total ?? 0) > 0 && isFocused
  const showNoResults = !isLoading && searchText.length >= 3 && (searchResults?.pagination?.total ?? 0) === 0 && isFocused

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="container px-4 mx-auto items-center mt-4 md:px-0">
      <form className="flex items-center mx-auto mt-8 mb-8 md:w-2/3 relative" onSubmit={onSubmit}>
        <label htmlFor="jobSearch" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          {/* Search Input Container */}
          <div className={`relative flex items-center transition-all duration-300 ${isFocused ? "shadow-glow-lg" : "shadow-lg"}`}>
            {/* Search Icon */}
            <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none z-10">
              <svg aria-hidden="true" className={`w-6 h-6 transition-colors duration-300 ${isFocused ? "text-Green-500" : "text-gray-400 dark:text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Loading Spinner */}
            <div className={`flex absolute inset-y-0 right-4 items-center pointer-events-none transition-opacity duration-300 ${showSpinner ? "opacity-100" : "opacity-0"}`}>
              <svg role="status" className="w-6 h-6 text-Green-500 animate-spin" viewBox="0 0 100 101" fill="none">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" opacity="0.2" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
            </div>

            {/* Input Field */}
            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} type="text" id="jobSearch" className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-base rounded-xl focus:border-Green-500 dark:focus:border-Green-500 focus:ring-2 focus:ring-Green-500/20 block w-full pl-14 pr-14 py-4 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500" placeholder="Search for jobs, tasks, or services..." />
          </div>

          {/* Dropdown Results */}
          <div className={`absolute w-full mt-2 z-50 transition-all duration-300 ${showResults || showNoResults ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
            {showNoResults && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 text-center backdrop-blur-sm">
                <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No results found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try different keywords</p>
              </div>
            )}

            {showResults && searchResults && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
                <div className="px-4 py-3 bg-gradient-to-r from-Green-500/10 to-Green-900/10 dark:from-Green-500/20 dark:to-Green-900/20 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Found {searchResults.pagination.total} result{searchResults.pagination.total !== 1 ? "s" : ""}
                  </p>
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {searchResults.data.map((job) => (
                    <li key={job.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <Link to={`/job/${job.id}`} className="block px-6 py-4 hover:bg-gradient-to-r hover:from-Green-50 hover:to-transparent dark:hover:from-Green-900/20 dark:hover:to-transparent transition-all duration-200 group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-Green-600 dark:group-hover:text-Green-400 transition-colors duration-200">{job.title}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                {job.category_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.city}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex items-center">
                            <span className="font-bold text-Green-600 dark:text-Green-400 text-lg">€{job.price}</span>
                            <svg className="w-5 h-5 ml-2 text-gray-400 dark:text-gray-500 group-hover:text-Green-500 dark:group-hover:text-Green-400 transform group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
