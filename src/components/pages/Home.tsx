import { useEffect } from "react"
import SearchBox from "../search/SearchBox"
import Jobs from "../jobs/Jobs"
import Page from "../pages/Page"

const Home = () => {
  useEffect(() => {
    document.title = "Home | Pocket Money"
  }, [])
  return (
    <Page title="Home">
      <SearchBox />
      <Jobs />
    </Page>
  )
}

export default Home
