import { useEffect } from "react"
import SearchBox from "./SearchBox"
import Jobs from "./Jobs"
import Page from "./Page"

const Home = () => {
  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    <Page title="Home">
      <SearchBox />
      <Jobs />
    </Page>
  )
}

export default Home
