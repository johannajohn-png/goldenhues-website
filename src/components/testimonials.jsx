import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import bg from "../assets/testimonials.jpg";

const EASE = [0.22, 1, 0.36, 1];

// how long each testimonial stays on screen before auto-advancing
const SLIDE_DURATION = 20000;

const testimonials = [
  {
    quote:
      "Special shout-out to Golden Hues for their support through the drive in April and closing two Senior Engineer roles which were ageing long. I would like to sincerely thank you for your commendable support in closing two positions — Senior Engineer roles. Your dedication, prompt coordination, and understanding of our requirements have been truly impressive throughout the process. Your efforts have played a key role in making this possible, and we truly value our partnership with you.",
    author: "Lead HR — after closing aging roles for a Fortune 500 company",
  },
  {
    quote:
      "Thank you all so much for your immense support in successfully closing the Senior Architect role. This has been one of the most critical and challenging roles for us to close.",
    more:
      "Finding the right candidate with both strong domain knowledge and the required technical expertise was not easy, and the role remained open for more than a year. Along the way, we faced several challenges including offer drops, compensation issues, and multiple hiring hurdles. Despite all of this, you remained committed and continued pushing forward with great persistence and ownership. Your continuous follow-ups, coordination, and support in engaging the offered candidate really made the difference and helped us bring this to a successful close. A heartfelt thank you to everyone for the patience, collaboration, and consistent efforts throughout this journey. This closure truly reflects the strength of teamwork and the dedication everyone brought in. Really appreciate all your support and partnership.",
    author: "Client — on closing a year-long aging role",
    long: true,
  },
  {
    quote:
      "Special shout-out to the team for constantly putting in their efforts in spite of all the challenges that the positions had. Your team's perseverance has paid off. Continue to surprise us with more such closures.",
    author: "Top Management of our client — on closing Niche & Aging roles",
  },
  {
    quote:
      "A big thank you to Golden Hues Consultants Pvt. Ltd. for recognising my potential, shortlisting my profile, and connecting me with my current company! Their professionalism, keen eye for talent, and seamless recruitment process made my hiring journey smooth and rewarding. I truly appreciate their support in finding the right opportunity.",
    author: "From a placed candidate",
  },
  {
    quote:
      "I would like to sincerely thank Golden Hues Consultants Private Ltd for their exceptional support throughout my hiring journey for the role of Manager – Risk and IT System with a leading bank in Dubai. The entire process was handled with a high level of professionalism, right from interview scheduling and regular follow-ups to providing clear guidance on relocation and compensation-related discussions. A special appreciation for their responsiveness, coordination, and continuous support at every stage of the process.",
    author: "From a placed candidate, Risk & IT System (Dubai)",
  },
];

const slideV = {
  enter: (d) => ({ x: d > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -64 : 64, opacity: 0 }),
};

function Arrow({ dir, onClick }) {
  const side =
    dir === 1
      ? "right-2 sm:right-0 sm:translate-x-1/2"
      : "left-2 sm:left-0 sm:-translate-x-1/2";
  return (
    <button
      onClick={onClick}
      aria-label={dir === 1 ? "Next testimonial" : "Previous testimonial"}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/70 text-neutral-700 shadow-lg backdrop-blur transition hover:bg-white ${side}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === 1 ? <polyline points="9 6 15 12 9 18" /> : <polyline points="15 6 9 12 15 18" />}
      </svg>
    </button>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d) => {
    setDirection(d);
    setExpanded(false);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  }, []);

  const jumpTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setExpanded(false);
    setIndex(i);
  };

  // Auto-advance every SLIDE_DURATION ms; paused on hover or while a testimonial
  // is expanded. The effect depends on `index`, so using the arrows or the dots
  // restarts the full timer instead of jumping again a moment later.
  useEffect(() => {
    if (paused || expanded) return;
    const t = setTimeout(() => go(1), SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [index, paused, expanded, go]);

  const t = testimonials[index];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-24">
      {/* muted background image (~50%) */}
      <div className="absolute inset-0 bg-neutral-200" />
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />

      <div className="relative z-10 w-full max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-4 text-center text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl"
        >
          Testimonials
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mx-auto mb-12 flex max-w-2xl justify-center"
        >
          <p className="rounded-2xl border border-white/10 bg-neutral-800/85 px-6 py-4 text-center text-lg italic text-white shadow-2xl backdrop-blur-md sm:px-8 sm:py-5 sm:text-xl">
            Our client said: &ldquo;When we need a miracle, we come to GoldenHues&rdquo;
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <Arrow dir={-1} onClick={() => go(-1)} />
          <Arrow dir={1} onClick={() => go(1)} />

          {/*
            Card sizing:
            - below md (phones / small tablets): fixed height + inner scrolling,
              so a long testimonial stays readable on a small screen.
            - md and up: height follows the content, so no scrollbar ever shows.
              min-height keeps short testimonials from making the card collapse.
          */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative h-125 overflow-hidden rounded-2xl border border-white/50 bg-white/60 shadow-2xl backdrop-blur-md md:h-auto"
          >
            <span className="pointer-events-none absolute left-5 top-2 z-10 select-none font-serif text-7xl leading-none text-neutral-300/70 sm:text-8xl">
              &ldquo;
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideV}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 overflow-y-auto md:static md:overflow-visible"
              >
                <div className="flex min-h-full flex-col justify-center px-8 py-12 sm:px-14 sm:py-16 md:min-h-[400px]">
                  <p className="text-lg leading-relaxed text-neutral-800 sm:text-xl">{t.quote}</p>

                  {t.long && (
                    <>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.p
                            key="more"
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="overflow-hidden text-lg leading-relaxed text-neutral-800 sm:text-xl"
                          >
                            {t.more}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-5 self-start text-sm font-semibold uppercase tracking-wider text-neutral-900 underline underline-offset-4 transition hover:text-neutral-600"
                      >
                        {expanded ? "Close" : "Click here to read more"}
                      </button>
                    </>
                  )}

                  <p className="mt-8 text-sm font-medium text-neutral-500">— {t.author}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* navigation dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => jumpTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-neutral-800" : "w-2 bg-neutral-400/70 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;