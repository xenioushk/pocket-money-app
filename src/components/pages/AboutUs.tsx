import { useEffect } from "react"
import Page from "./Page"

const AboutUs = () => {
  // Use Effect.

  useEffect(() => {
    document.title = "About Us"
  }, [])

  return (
    <Page title="About Us">
      <div className="container px-4 mx-auto items-center mt-4 md:px-0">
        <div className="grid grid-cols-1 gap-y-4">
          <h2 className="text-3xl">About Us</h2>
          <p>The primary goal of Pocket Money is to create a marketplace where people will publish small tasks that can be done by anyone without any formal training in a few hours, for example, baby sitting, dog walking, grocery shopping, etc. Thus the job opportunity at pocket money for both students and non-students. With the initial plan the product owner can earn money by running advertisements and sponsorships. Pocket Money is a modern responsive web application that runs on all the platforms that supports internet browser.</p>
        </div>
      </div>
    </Page>
  )
}

export default AboutUs
