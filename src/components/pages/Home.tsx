import { useEffect } from "react"
import SearchBox from "../search/SearchBox"
import Jobs from "../jobs/Jobs"
import Page from "../pages/Page"
import JobsLayout from "../layout/JobsLayout"

const Home = () => {
  useEffect(() => {
    document.title = "Home | Pocket Money"
  }, [])
  return (
    <Page title="Home">
      <SearchBox />
      <JobsLayout>
        <Jobs />
      </JobsLayout>
    </Page>
  )
}

export default Home
