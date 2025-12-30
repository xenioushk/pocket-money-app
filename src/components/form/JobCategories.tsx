import { useState, useEffect } from "react"
import categoryService from "../../services/categoryService"
import { Category } from "../../types"

function JobCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const getCategoriesData = async () => {
    try {
      const categoryData = await categoryService.getCategories()
      setCategories(categoryData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCategoriesData()
  }, [])

  const allJobCategories = (
    <>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
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
