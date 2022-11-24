import { useEffect } from "react"
import Page from "./Page"

const Terms = () => {
  useEffect(() => {
    document.title = "Terms"
  }, [])
  return (
    <Page title="Terms">
      <div className="container px-4 mx-auto items-center mt-4 md:px-0">
        <div className="grid grid-cols-1 gap-y-4">
          <h2 className="text-3xl">Terms & Conditions</h2>
          <p>Thank you for using Pocket Money App! We're happy you're here. Please read this Terms of Service agreement carefully before accessing or using Pocket Money App. Because it is such an important contract between us and our users, we have tried to make it as clear as possible. For your convenience, we have presented these terms in a short non-binding summary followed by the full legal terms.</p>
        </div>
      </div>
    </Page>
  )
}

export default Terms
