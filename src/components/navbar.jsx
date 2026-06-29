import { motion } from "motion/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 w-full border-b border-neutral-100 bg-white"
    >
      <nav className="flex w-full items-center justify-between px-8 py-4">
        <Link to="/">
          <img src={logo} alt="GoldenHues" className="h-14 w-auto" />
        </Link>
        <ul className="flex gap-6 text-sm font-medium text-neutral-600 sm:gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="transition-colors hover:text-black">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

export default Navbar;