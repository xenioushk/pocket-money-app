import React from "react"
import ReactDOM from "react-dom/client"
import axios from "axios"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
axios.defaults.baseURL = process.env.REACT_APP_BACKENDURL || "https://pmapi.bluewindlab.com"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

reportWebVitals()
