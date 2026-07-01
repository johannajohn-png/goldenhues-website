import { motion } from "motion/react";
import logo from "../assets/logo.png";

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <motion.img
        src={logo}
        alt="GoldenHues"
        className="h-32 w-auto sm:h-40"
        initial={{ clipPath: "inset(0 100% 0 0)", y: 30 }}
        animate={{ clipPath: "inset(0 0% 0 0)", y: 0 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export default Preloader;