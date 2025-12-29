import React, { useState, useEffect } from "react"
import axios from "axios"

function JobCategories() {
  const [categories, setCategories] = useState([])
  const getCategoriesData = async () => {
    try {
      //Fetch all the data from API.
      const categories = await axios.get(`wp-json/pmapi/v1/job/categories`)
      setCategories(categories.data.categories)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCategoriesData()
  }, [])

  const allJobCategories = (
    <>
      {Object.keys(categories).map((index) => (
        <option value={index} key={index}>
          {categories[index]}
        </option>
      ))}
    </>
  )

  return (
    <>
      <option value="">Select</option>
      {allJobCategories}
    </>
  )
}

export default JobCategories
