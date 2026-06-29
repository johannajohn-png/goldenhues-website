import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/preloader"; // Changed to lowercase 'p'
import Home from "./pages/home";               // Changed to lowercase 'h'
import About from "./components/About";         // Keeps capital 'A' to match your file
import Services from "./components/services";
import Contact from "./components/contact";
 
// Always start a freshly-navigated page from the top
function ScrollToTop() {
  const { pathname, key } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);
  return null;
}

// Re-keying by location.key remounts the page on every nav click —
// including clicking the link for the page you're already on, so it reloads.
function AppRoutes() {
  const location = useLocation();
  return (
    <Routes key={location.key}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600); // splash duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      {!loading && <AppRoutes />}
    </BrowserRouter>
  );
}

export default App;