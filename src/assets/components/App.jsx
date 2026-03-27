import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Programs from "./Programs";
import Products from "./Products";
import Gallery from "./Gallery";
import Plans from "./Plans";
import Contact from "./Contact";
import Footer from "./Footer";
import ProgramDetail from "./ProgramDetail";

import "./App.css";

const Home = () => {
  return (
    <div id="home" className="main-wrapper">
      <Hero />
      <Programs />
      <Products />
      <Gallery />
      <Plans />
      <Contact />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="noise"></div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program/:id" element={<ProgramDetail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
