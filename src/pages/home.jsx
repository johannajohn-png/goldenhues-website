import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Vision from "../components/Vision";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-white font-sans text-black">
      <Navbar />
      <Hero />
      <Vision />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home;