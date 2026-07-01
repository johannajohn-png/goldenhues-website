import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/preloader"; // Changed to lowercase 'p'
import SideNav from "./components/SideNav";
import Home from "./pages/home";               // Changed to lowercase 'h'
import About from "./components/About";         // Keeps capital 'A' to match your file
import Services from "./components/services";
import Contact from "./components/contact";

const EASE = [0.22, 1, 0.36, 1];

// Linear page order drives slide direction: forward -> slide from right, back -> from left.
const ORDER = { "/": 0, "/about": 1, "/services": 2, "/contact": 3 };

const pageVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : dir < 0 ? -80 : 0 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : dir < 0 ? 80 : 0 }),
};

// Always start a freshly-navigated page from the top
function ScrollToTop() {
  const { pathname, key } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, key]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  // direction = sign of (new index - previous index)
  const curIdx = ORDER[location.pathname] ?? 0;
  const prevIdx = useRef(curIdx);
  const dir = curIdx === prevIdx.current ? 0 : curIdx > prevIdx.current ? 1 : -1;
  useEffect(() => {
    prevIdx.current = curIdx;
  }, [curIdx]);

  return (
    // overflow-x-clip hides the off-screen slide WITHOUT breaking position:sticky
    <div className="overflow-x-clip">
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={location.pathname}
          custom={dir}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* keeping key={location.key} preserves your "click the current page's link to reload it" behaviour */}
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
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
      {!loading && (
        <>
          <AnimatedRoutes />
          <SideNav />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;