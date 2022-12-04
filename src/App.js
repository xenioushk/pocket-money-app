import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import AddJob from "./components/form/AddJob";
import SearchBox from "./components/search/SearchBox";
import Terms from "./components/pages/Terms";
import Category from "./components/pages/Category";
import SingleJob from "./components/pages/SingleJob";
import EditJob from "./components/pages/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job/:id" element={<SingleJob />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search-job" element={<SearchBox />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/job/edit/:id" element={<EditJob />} />
        <Route path="/category/:catSlug" element={<Category />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
