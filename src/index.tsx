import ReactDOM from "react-dom/client"
import axios from "axios"
import "./index.css"
import App from "./App"

axios.defaults.baseURL = import.meta.env.VITE_PM_API_URL || "http://localhost:5002"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<App />)
