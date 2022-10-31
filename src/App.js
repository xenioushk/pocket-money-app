import { BrowserRouter, Routes, Route } from "react-router-dom"
// import logo from "./logo.svg"
// import Jobs from "./components/Jobs"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import AddJob from "./components/AddJob"
import Search from "./components/Search"
import Terms from "./components/Terms"
import SingleJob from "./components/SingleJob"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job/:id" element={<SingleJob />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search-job" element={<Search />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
