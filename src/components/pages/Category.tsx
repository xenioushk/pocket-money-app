import { useState, useEffect } from "react"
import Jobs from "../jobs/Jobs"
import Page from "./Page"
import { useParams } from "react-router-dom"
// import Breadcrumb from "../base/Breadcrumb"

const Category = () => {
  // console.log(params.id)
  const params = useParams()
  const [catSlug, setcatSlug] = useState(params.catSlug)
  useEffect(() => {
    setcatSlug(params.catSlug)
    document.title = `All ${params.catSlug.replace("-", " ")} jobs | Pocket Money`
  }, [params.catSlug])
  return (
    <Page title="Category">
      <Jobs catSlug={`${catSlug}`} />
    </Page>
  )
}

export default Category
