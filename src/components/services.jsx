import { useRef, useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import strip1 from "../assets/1img.jpg";
import strip2 from "../assets/2img.jpg";
import strip3 from "../assets/3img.jpg";
import strip4 from "../assets/4img.jpg";
import strip5 from "../assets/5img.jpg";
import strip6 from "../assets/6img.jpg";
import strip7 from "../assets/7img.jpg";
import benefitsBg from "../assets/benefits.jpg";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import banner6 from "../assets/banner6.jpg";

const EASE = [0.22, 1, 0.36, 1];

const stripImages = [strip1, strip2, strip3, strip4, strip5, strip6, strip7];
const bannerImages = [banner1, banner2, banner3, banner4, banner5, banner6];

const marqueeItems = [
  "Contract Hiring",
  "HR Consulting",
  "Finance Talent",
  "Campus Hiring",
  "Permanent Staffing",
  "IT Recruitment",
  "Executive Search",
  "Niche Hiring",
  "Leadership Hiring",
];

const offers = [
  {
    title: "Permanent Recruitment",
    text: "End-to-end permanent hiring solutions — sourcing, screening, and placing the right talent for long-term organisational growth.",
  },
  {
    title: "Compensation Research & Benchmarking",
    text: "Data-driven salary intelligence to help you attract and retain top talent with competitive, market-aligned compensation structures.",
  },
  {
    title: "Talent Pool Mapping",
    text: "Proactive identification and mapping of passive talent pools across industries, ensuring you're always ahead of your hiring needs.",
  },
  {
    title: "Training",
    text: "Structured skilling and capability-building programs that upskill your workforce and prepare new hires to perform with confidence from day one.",
  },
];

const benefitIcons = {
  "Sector Expertise": (
    <>
      <path d="M3 21h18" />
      <path d="M12 3 4 8h16L12 3Z" />
      <path d="M5 21V8M9 21V8M15 21V8M19 21V8" />
    </>
  ),
  "Swift Turnaround": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  "Relationship-Driven": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  "Precision Matching": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  "Global Reach": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </>
  ),
  "End-to-End Support": (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4v4h-4" />
    </>
  ),
};

const benefits = [
  {
    title: "Sector Expertise",
    text: "Deep experience across BFSI, FMCG, Retail, Healthcare and Manufacturing means we bring market insight and functional expertise to every search — and deliver industry-tailored hiring solutions that match your domain.",
  },
  {
    title: "Swift Turnaround",
    text: "Streamlined processes, proactive sourcing and efficient screening enable faster closures without compromising on quality — helping you maintain business continuity and secure top talent ahead of the competition.",
  },
  {
    title: "Relationship-Driven",
    text: "We build long-term partnerships rooted in trust, transparency and shared value — taking the time to understand your business goals and your candidates' aspirations before we make a match.",
  },
  {
    title: "Precision Matching",
    text: "Competency-based assessment of skills, experience, communication, adaptability and cultural fit improves hiring accuracy and long-term retention — so the people you hire stay and thrive.",
  },
  {
    title: "Global Reach",
    text: "Headquartered in Chennai with a footprint spanning Asia, the Middle East and the USA, we connect local talent to international standards and global organisations to local talent markets.",
  },
  {
    title: "End-to-End Support",
    text: "From requirement gathering and sourcing through screening, interview coordination, offer negotiation and onboarding — we stay engaged with both client and candidate at every step.",
  },
];

const steps = [
  {
    title: "Requirement Understanding",
    text: "We start by deeply understanding your business, the role's context, and the kind of professional who will truly thrive within your organisation.",
  },
  {
    title: "Talent Sourcing",
    text: "Leveraging our extensive networks, databases, and headhunting expertise, we identify professionals who match both the role and your culture.",
  },
  {
    title: "Screening & Assessment",
    text: "A rigorous evaluation of skills, experience, communication, and cultural alignment ensures only the most relevant candidates move forward.",
  },
  {
    title: "Client Presentation",
    text: "A curated shortlist is presented with detailed insights, helping you make informed decisions without sifting through irrelevant profiles.",
  },
  {
    title: "Interview Coordination",
    text: "We manage scheduling, feedback collection, and candidate communication — keeping the process smooth and respectful of everyone's time.",
  },
  {
    title: "Offer & Onboarding Support",
    text: "From offer negotiation to first-day readiness, we stay engaged to ensure a seamless transition for both the candidate and the organisation.",
  },
];

/* ---- variants ---- */
const introV = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};
const taglineV = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.4 } },
};
const panelV = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: 0.9, ease: EASE } },
};
const offerCardV = {
  hidden: { opacity: 0, x: 100 },
  show: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE, delay: 0.55 + i * 0.12 } }),
};
const benefitHeadingV = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
// slow, elegant, and triggered per-card as it scrolls into view
const benefitCardV = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: (i) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, ease: EASE, delay: (i % 3) * 0.13 } }),
};
// big title in the white panel — gentle rise as the section appears
const rpTitleV = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
// each block slides in slowly from the left as it personally enters view
const rpBlockV = {
  hidden: { opacity: 0, x: -140 },
  show: { opacity: 1, x: 0, transition: { duration: 1.1, ease: EASE } },
};

/* Section-level replay (used by What We Offer): slides in on scroll-down,
   instant on scroll-up, re-arms once fully below the viewport. */
function useReplaySlide(ref, controls) {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const played = useRef(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const goingDown = latest >= lastY.current;
    lastY.current = latest;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top >= vh) {
      if (played.current) {
        controls.set("hidden");
        played.current = false;
      }
    } else if (!played.current && rect.top < vh * 0.65 && rect.bottom > 0) {
      if (goingDown) controls.start("show");
      else controls.set("show");
      played.current = true;
    }
  });
}

/* Per-element replay: animates ONLY when scrolling down into view.
   - Appearing while scrolling up -> snaps to shown state, no animation.
   - Re-arms (hides) only once the element is fully BELOW the viewport,
     so scrolling back down replays the entrance cleanly. */
function useScrollDownReveal(ref, { threshold = 0.85 } = {}) {
  const controls = useAnimationControls();
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const played = useRef(false);

  // Handle the case where the element is already in view on mount/reload.
  useEffect(() => {
    lastY.current = window.scrollY;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * threshold && rect.bottom > 0 && rect.top < vh) {
      controls.set("show");
      played.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const goingDown = latest >= lastY.current;
    lastY.current = latest;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top >= vh) {
      // fully below the viewport -> re-arm so it can replay on the way down
      if (played.current) {
        controls.set("hidden");
        played.current = false;
      }
    } else if (!played.current && rect.top < vh * threshold && rect.bottom > 0) {
      if (goingDown) controls.start("show");
      else controls.set("show"); // appeared while scrolling up -> no animation
      played.current = true;
    }
  });

  return controls;
}

function BenefitHeading() {
  const ref = useRef(null);
  const controls = useScrollDownReveal(ref, { threshold: 0.85 });
  return (
    <motion.h2
      ref={ref}
      variants={benefitHeadingV}
      initial="hidden"
      animate={controls}
      className="text-center text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
    >
      Benefits of Choosing GoldenHues
    </motion.h2>
  );
}

function BenefitCard({ benefit, index }) {
  const ref = useRef(null);
  const controls = useScrollDownReveal(ref, { threshold: 0.85 });
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={benefitCardV}
      initial="hidden"
      animate={controls}
      className="border border-neutral-200/70 bg-neutral-500/20 p-7 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <svg
          className="h-6 w-6 shrink-0 text-neutral-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {benefitIcons[benefit.title]}
        </svg>
        <h3 className="text-xl font-semibold text-neutral-900">{benefit.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{benefit.text}</p>
    </motion.div>
  );
}

function ProcessBlock({ step, image, index }) {
  const ref = useRef(null);
  const controls = useScrollDownReveal(ref, { threshold: 0.85 });
  return (
    <motion.div
      ref={ref}
      variants={rpBlockV}
      initial="hidden"
      animate={controls}
      className="relative min-h-[200px] w-full overflow-hidden sm:min-h-[230px]"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative flex min-h-[200px] flex-col gap-5 px-8 py-9 sm:min-h-[230px] sm:flex-row sm:items-center sm:gap-8 sm:px-10">
        {/* left half: number + title */}
        <div className="flex items-start gap-4 sm:w-1/2">
          <span className="text-2xl font-bold leading-none text-white/40 sm:text-3xl">
            {index + 1}
          </span>
          <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {step.title}
          </h3>
        </div>

        {/* right half: explanation */}
        <p className="text-sm leading-relaxed text-white/80 sm:w-1/2 sm:text-base">
          {step.text}
        </p>
      </div>
    </motion.div>
  );
}

function RecruitmentTitle() {
  const ref = useRef(null);
  const controls = useScrollDownReveal(ref, { threshold: 0.9 });
  return (
    <motion.h2
      ref={ref}
      variants={rpTitleV}
      initial="hidden"
      animate={controls}
      className="text-center text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl lg:text-left lg:text-7xl"
    >
      Recruitment
      <br />
      Process
    </motion.h2>
  );
}

function Services() {
  const offerRef = useRef(null);
  const offerControls = useAnimationControls();
  useReplaySlide(offerRef, offerControls);

  return (
    <>
      <Navbar />

      <main>
        {/* 1) IMAGE STRIP BANNER */}
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <div className="absolute inset-0 flex">
            {stripImages.map((img, i) => (
              <img key={i} src={img} alt="" className="h-full min-w-0 flex-1 object-cover" />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/45" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center text-center text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Our Services
          </motion.h1>
        </section>

        {/* 2) MARQUEE */}
        <section className="overflow-hidden border-y border-neutral-200 bg-white py-10">
          <motion.div
            className="flex w-max items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center text-3xl font-bold text-black sm:text-4xl">
                {item}
                <span className="mx-10 text-2xl text-neutral-300">&#9670;</span>
              </span>
            ))}
          </motion.div>
        </section>

        {/* 3) WHAT WE OFFER — replays on scroll-down; cards slide in from the right */}
        <motion.section
          ref={offerRef}
          initial="hidden"
          animate={offerControls}
          className="relative flex min-h-screen w-full flex-col overflow-hidden md:flex-row"
        >
          <div className="flex min-h-[40vh] w-full flex-col items-center justify-center bg-white px-8 py-20 text-center md:min-h-screen md:w-1/2 md:px-12 lg:px-16">
            <motion.h2
              variants={introV}
              className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            >
              What We Offer
            </motion.h2>
            <motion.p
              variants={taglineV}
              className="mt-5 max-w-sm text-base font-medium tracking-wide text-neutral-500 sm:text-lg"
            >
              Built on Relationships, Driven by Precision.
            </motion.p>
          </div>

          <motion.div
            variants={panelV}
            className="flex w-full flex-col justify-center bg-black px-8 py-16 md:w-1/2 md:px-12 lg:px-16"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {offers.map((o, i) => (
                <motion.div key={o.title} custom={i} variants={offerCardV} className="flex flex-col bg-white p-6">
                  <h3 className="text-lg font-semibold text-neutral-900">{o.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500">{o.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 4) BENEFITS — each card reveals (slowly) as it scrolls DOWN into view; replays */}
        <section className="relative w-full overflow-hidden py-24">
          <img src={benefitsBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-white/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <BenefitHeading />

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <BenefitCard key={b.title} benefit={b} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 5) RECRUITMENT PROCESS — wide image blocks on the left (slide in from the
            left on scroll-down), sticky white title panel on the right */}
        <section className="w-full bg-white">
          <div className="flex flex-col lg:flex-row-reverse">
            {/* TITLE PANEL — top on mobile, right + sticky on desktop */}
            <div className="w-full lg:w-[38%]">
              <div className="flex items-center justify-center px-8 py-16 lg:sticky lg:top-0 lg:h-screen lg:px-12 lg:py-0">
                <RecruitmentTitle />
              </div>
            </div>

            {/* BLOCKS — below on mobile, left on desktop */}
            <div className="w-full overflow-hidden lg:w-[62%]">
              {steps.map((step, i) => (
                <ProcessBlock key={step.title} step={step} image={bannerImages[i]} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Services;