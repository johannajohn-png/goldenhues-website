import { useRef, useEffect } from "react";
import { motion, useAnimationControls, useScroll, useMotionValueEvent } from "motion/react";
import Navbar from "./navbar"; // Changed to lowercase 'n'
import Footer from "./footer"; // Changed to lowercase 'f'
import aboutImg from "../assets/aboutimg.jpg";

import imgFmcg from "../assets/img1.jpg";
import imgRetail from "../assets/img2.jpg";
import imgHealthcare from "../assets/img3.jpg";
import imgManufacturing from "../assets/img4.jpg";
import imgIt from "../assets/img5.jpg";
import imgPharma from "../assets/img6.jpg";
import imgEcommerce from "../assets/img7.jpg";
import imgBfsi from "../assets/img8.jpg";

const EASE = [0.22, 1, 0.36, 1];

const titleWords = ["About", "GoldenHues", "Consultants"];

// split section: left intro + right black panel sliding from the right
const introV = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};
const panelV = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: 0.9, ease: EASE } },
};
const aboutTextV = {
  hidden: { opacity: 0, x: 60 },
  show: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.6 + i * 0.15 } }),
};

const industries = [
  { name: "FMCG", desc: "Connecting fast-moving consumer brands with the high-velocity talent built to scale them. We source the agile leaders and execution-focused teams that drive retail growth.", img: imgFmcg },
  { name: "Retail", desc: "Bridging the gap from storefront to omnichannel. We place the agile talent required to navigate, scale, and dominate the modern retail landscape.", img: imgRetail },
  { name: "Healthcare", desc: "Placing skilled medical and clinical talent within leading hospitals and care providers. We connect healthcare organizations with the compassionate, qualified professionals who elevate patient outcomes.", img: imgHealthcare },
  { name: "Manufacturing", desc: "We build the teams that keep factories running. Whether you're a plant manager looking for skilled engineers or a worker ready for your next shift, we help keep production lines moving forward.", img: imgManufacturing },
  { name: "IT & Technology", desc: "Tech moves fast, and you need a team that can keep up. We find the smart software, data, and product talent that helps fast-scaling companies build great things without losing momentum.", img: imgIt },
  { name: "Pharmaceuticals", desc: "Bringing life-saving ideas to life requires the right people. We find the dedicated research, quality assurance, and commercial talent needed to support every step of the pharma chain.", img: imgPharma },
  { name: "E-Commerce", desc: "Getting products into carts and out the door requires a lot of moving parts. We source the dedicated growth, operations, and tech talent that digital-first brands need to streamline their business and increase sales.", img: imgEcommerce },
  { name: "BFSI", desc: "People matter most when it comes to managing money. We find the reliable banking, financial services, and insurance talent who bring both sharp skills and strong ethics to your team.", img: imgBfsi },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToIndustries = () =>
    document.getElementById("industries")?.scrollIntoView({ behavior: "smooth" });

  // direction-aware reveal for the split section (same as the home page):
  // slides in on scroll-down, just appears on scroll-up, resets only when fully off screen
  const splitRef = useRef(null);
  const splitControls = useAnimationControls();
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const played = useRef(false);

  // Slides the panel in whenever the section is entered while scrolling DOWN,
  // shows it instantly when entered while scrolling UP, and re-arms itself once
  // the section is fully below the viewport again -- so it replays every time
  // you come down from the top, but never when you come up from below.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const goingDown = latest >= lastY.current;
    lastY.current = latest;

    const el = splitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top >= vh) {
      // section is fully below the viewport (we're above it) -> arm for next time
      if (played.current) {
        splitControls.set("hidden");
        played.current = false;
      }
    } else if (!played.current && rect.top < vh * 0.65 && rect.bottom > 0) {
      // section has come meaningfully into view
      if (goingDown) splitControls.start("show");
      else splitControls.set("show");
      played.current = true;
    }
  });

  return (
    <>
      <Navbar />

      <main>
        {/* 1) IMAGE HERO — white gradient (heavier on the right), title bottom-right, per-letter hover */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <motion.img
            src={aboutImg}
            alt="Golden Hues Consultants"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white from-30% to-transparent to-75%" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="absolute bottom-10 right-8 z-10 text-right text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl md:right-12 lg:text-6xl"
          >
            {titleWords.map((word, wi) => (
              <span key={wi} className="block">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    whileHover={{ scale: 1.35 }}
                    transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                    className="inline-block cursor-default"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </section>

        {/* 2) SPLIT — left: Industries we Service + arrow | right: black About Us (slides from right) */}
        <motion.section
          ref={splitRef}
          initial="hidden"
          animate={splitControls}
          className="relative flex min-h-screen w-full flex-col overflow-hidden md:flex-row"
        >
          {/* LEFT — centered Industries title + arrow */}
          <div className="relative flex min-h-[50vh] w-full flex-col items-center justify-center bg-white px-8 py-20 text-center md:min-h-screen md:w-1/2 md:px-12 lg:px-16">
            <motion.div variants={introV} className="flex flex-col items-center">
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Industries
                <br />
                we
                <br />
                Service
              </h2>
              <motion.button
                onClick={scrollToIndustries}
                aria-label="Scroll to industries"
                className="mt-6 inline-flex cursor-pointer text-neutral-900"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — black panel slides in from the right, text follows */}
          <motion.div
            variants={panelV}
            className="relative flex w-full flex-col justify-center bg-black px-8 py-20 md:w-1/2 md:px-12 lg:px-16"
          >
            <motion.p
              custom={0}
              variants={aboutTextV}
              className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300"
            >
              About Us
            </motion.p>

            <motion.p
              custom={1}
              variants={aboutTextV}
              className="mb-6 text-lg leading-relaxed text-white sm:text-xl"
            >
              <span className="font-semibold">Our Genesis:</span> Founded in 2009 providing
              end to end recruitment solutions in the permanent hiring space, we have created
              a delivery model which has stood out for quality and value creation for our
              stakeholders.
            </motion.p>

            <motion.p
              custom={2}
              variants={aboutTextV}
              className="text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Golden Hues Consultants Private Ltd., headquartered in Chennai, India, brings
              superior levels of service and a passionate, methodology-driven approach to the
              field of Human Resource. We understand the multi-cultural nature of the Indian
              workforce and offer processes that appreciate the uniqueness of individuals and
              match it with the changing requirements of an organisation.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* 3) INDUSTRIES — cards */}
        <section id="industries" className="w-full scroll-mt-24 bg-neutral-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
            >
              Industries we Service
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.1 }}
                  className="group relative aspect-[3/4] overflow-hidden bg-black"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-25"
                  />
                  <div className="absolute inset-0 bg--to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-1">
                      {item.name}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-opacity duration-500 group-hover:mt-3 group-hover:opacity-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;