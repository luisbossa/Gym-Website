import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Programs from "../components/sections/Programs";
import Plans from "../components/sections/Plans";
import Products from "../components/sections/Products";
import Gallery from "../components/sections/Gallery";
import CallToAction from "../components/sections/CallToAction";
import Faq from "../components/sections/Faq";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <div id="home" className="main-wrapper">
      <Hero />
      <Features />
      <Programs />
      <Plans />
      <Products />
      <Gallery />
      <CallToAction />
      <Faq />
      <Contact />
    </div>
  );
};

export default Home;
