import { BrowserRouter, Routes, Route } from "react-router-dom"
// import logo from "./logo.svg"
// import Jobs from "./components/Jobs"
// import Search from "./components/Search"
// import AddJob from "./components/AddJob"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import Terms from "./components/Terms"
import SingleJob from "./components/SingleJob"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<SingleJob />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
