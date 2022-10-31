import { useEffect, useState } from "react"
import Page from "./Page"

const AboutUs = () => {
  // Use Effect.

  useEffect(() => {
    document.title = "About Us"
  }, [])

  // Form Field.

  const [myJobs, setMyJobs] = useState([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")

  const handleOnSubmit = (e) => {
    setMyJobs((prev) =>
      prev.concat({
        title: title,
        price: price,
      })
    )
    setTitle("")
    setPrice("")
    e.preventDefault()
  }

  // useEffect.

  useEffect(() => {
    console.log("Trigger on component load")
    if (localStorage.getItem("myJobsData")) {
      setMyJobs(JSON.parse(localStorage.getItem("myJobsData")))
    }
  }, [])

  useEffect(() => {
    console.log("Trigger after job new job added!")
    localStorage.setItem("myJobsData", JSON.stringify(myJobs))
  }, [myJobs])

  return (
    <Page title="About Us">
      <div>About Us</div>
      <form onSubmit={handleOnSubmit}>
        <fieldset>
          <label htmlFor="title">Job title</label>
          <input type="text" placeholder="Add Job Title" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor="title">Job price</label>
          <input type="text" placeholder="Add Job Title" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </fieldset>

        <input type="submit" value="Add A Job" className="btn" />
      </form>
      <hr />
      <h2>All Jobs</h2>

      {myJobs.length
        ? myJobs.map((job, index) => {
            return (
              <div key={index}>
                {job.title} @ {job.price}
              </div>
            )
          })
        : "No jobs available!"}
    </Page>
  )
}

export default AboutUs
