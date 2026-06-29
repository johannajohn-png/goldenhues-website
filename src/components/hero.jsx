import { motion } from "motion/react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const MotionLink = motion.create(Link);

const headline = "Your Strategic Recruitment Partner";
const words = headline.split(" ");

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};

const letterVariant = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      {/* White gradient so the black text stays readable over the photo */}
      <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-500"
        >
          Trusted by Talent, Valued by Clients
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-5xl font-bold leading-none tracking-tight text-black sm:text-6xl md:text-7xl"
        >
          {words.map((word, wi) => (
            <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  variants={letterVariant}
                  whileHover={{
                    scale: 1.35,
                    transition: { type: "spring", stiffness: 400, damping: 12 },
                  }}
                  className="inline-block origin-bottom cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 max-w-md text-lg text-neutral-700"
        >
          Methodology-driven HR and recruitment services — connecting exceptional
          talent with the organisations that need them most.
        </motion.p>

        <MotionLink
          to="/contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          className="mt-10 inline-block rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          Get in touch
        </MotionLink>
      </div>
    </section>
  );
}

export default Hero;