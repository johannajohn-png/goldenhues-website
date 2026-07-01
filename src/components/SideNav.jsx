import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];
const ORDER = ["/", "/about", "/services", "/contact"];

function Chevron({ left }) {
  return (
    <svg
      className="h-5 w-5 sm:h-6 sm:w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={left ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

function ArrowButton({ side, onClick }) {
  const left = side === "left";
  return (
    <div
      className={`fixed top-1/2 z-40 -translate-y-1/2 ${
        left ? "left-2 sm:left-5" : "right-2 sm:right-5"
      }`}
    >
      <motion.button
        onClick={onClick}
        aria-label={left ? "Previous page" : "Next page"}
        initial={{ opacity: 0, x: left ? -12 : 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-black shadow-md ring-1 ring-black/10 backdrop-blur-md transition-colors hover:bg-white/90 sm:h-12 sm:w-12"
      >
        <Chevron left={left} />
      </motion.button>
    </div>
  );
}

function SideNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const idx = ORDER.indexOf(pathname);
  if (idx === -1) return null; // unknown route -> no arrows

  const prev = idx > 0 ? ORDER[idx - 1] : null;
  const next = idx < ORDER.length - 1 ? ORDER[idx + 1] : null;

  return (
    <>
      {/* re-key by pathname so each arrow re-plays its fade when the page changes */}
      {prev && <ArrowButton key={`l-${pathname}`} side="left" onClick={() => navigate(prev)} />}
      {next && <ArrowButton key={`r-${pathname}`} side="right" onClick={() => navigate(next)} />}
    </>
  );
}

export default SideNav;