import { useEffect } from "react"
import Jobs from "./Jobs"
import Page from "./Page"

const Home = () => {
  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    <Page title="Home">
      <Jobs />
    </Page>
  )
}

export default Home
