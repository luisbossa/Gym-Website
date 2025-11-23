import Navbar from "./Navbar";
import Hero from "./Hero";
import Programs from "./Programs";
import Products from "./Products";
import Gallery from "./Gallery";
import Plans from "./Plans";
import Contact from "./Contact";
import Footer from "./Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="noise"></div>

      <div id="home" className="main-wrapper">
        <Navbar />
        <Hero />
        <Programs />
        <Products />
        <Gallery />
        <Plans />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
