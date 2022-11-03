import React, { Component } from "react"
import JobItem from "./Job"
import axios from "axios"

export class Jobs extends Component {
  state = {
    jobs: [],
    isLoaded: false,
  }

  componentDidMount() {
    //Add A Job.

    //   const loginData = {
    // 		username: "admin",
    // 		password: "Password"
    // 	};

    //   const formdata = {
    //     title: "External Post",
    //     content: "External Post Content",
    //     status: 'publish'
    //   };

    //   const data =  axios.get('/wp-json/wp/v2/posts', formdata, {
    //     auth: {
    //       username: "admin",
    //       password: "",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //     .catch((err) => {
    //         console.log(err)
    // });

    // axios.post('/wp-json/wp/v2/posts', formdata, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //     .catch((err) => {
    //         console.log(err)
    // });
    console.log(axios.defaults.baseURL)
    // Get All The Jobs.
    axios
      .get("/wp-json/pmapi/v1/jobs")

      // axios
      //   .get(process.env.REACT_APP_BACKENDURL + "/wp-json/pmapi/v1/jobs", {
      //     headers: {
      //       "Content-Type": "application/json;charset=UTF-8",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   })

      // .get(process.env.REACT_APP_BACKENDURL + "/wp-json/pmapi/v1/jobs")
      .then((res) =>
        this.setState({
          jobs: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err))
  }

  render() {
    // console.log(this.state)

    const { jobs, isLoaded } = this.state

    if (isLoaded) {
      return (
        <div className="container mx-auto flex items-center">
          <div className="grid grid-cols-1 gap-y-4">
            {jobs.map((job, index) => (
              <JobItem key={index} job={job} />
            ))}
          </div>
        </div>
      )
    }
    return <div className="text-center">Loading...</div>
  }
}

export default Jobs
