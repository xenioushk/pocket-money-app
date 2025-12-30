import { useEffect } from "react"
import SearchBox from "../search/SearchBox"
import Jobs from "../jobs/Jobs"
import Page from "./Page"
import { useParams } from "react-router-dom"
import JobsLayout from "../layout/JobsLayout"

const Category = () => {
  const params = useParams()
  const categoryId = params.catSlug ? parseInt(params.catSlug) : undefined

  useEffect(() => {
    document.title = `Category Jobs | Pocket Money`
  }, [params.catSlug])

  return (
    <Page title="Category">
      <SearchBox />
      <JobsLayout selectedCategoryId={categoryId}>
        <Jobs catSlug={params.catSlug} />
      </JobsLayout>
    </Page>
  )
}

export default Category
