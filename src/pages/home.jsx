import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Vision from "../components/vision";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";

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