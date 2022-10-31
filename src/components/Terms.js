import { useEffect } from "react"
import Page from "./Page"

const Terms = () => {
  useEffect(() => {
    document.title = "Terms"
  }, [])
  return (
    <Page title="Terms">
      <div>Terms</div>
    </Page>
  )
}

export default Terms
