import { useRef, useEffect } from "react";
import { motion, useInView, useAnimationControls, useScroll, useMotionValueEvent } from "motion/react";

const cards = [
  { num: "01", title: "Client First", text: "Processes and resources aligned to your need. Your timeline is our deadline.", pattern: "stripes" },
  { num: "02", title: "Outcome Driven", text: "Ensuring high-quality hires, always. Delivering on time, every time.", pattern: "dots" },
  { num: "03", title: "Partnership Centric", text: "Your extended arm in the market. Relationship focused, not transactional.", pattern: "grid" },
  { num: "04", title: "48-Hour Turnaround", text: "Industry-leading 48-hour average response on every requirement.", pattern: "hstripes" },
];

function patternStyle(pattern) {
  const c = "rgba(0,0,0,0.05)";
  switch (pattern) {
    case "stripes":
      return { backgroundImage: `repeating-linear-gradient(45deg, ${c} 0, ${c} 1.5px, transparent 1.5px, transparent 12px)` };
    case "hstripes":
      return { backgroundImage: `repeating-linear-gradient(0deg, ${c} 0, ${c} 1.5px, transparent 1.5px, transparent 12px)` };
    case "dots":
      return { backgroundImage: `radial-gradient(${c} 1.4px, transparent 1.4px)`, backgroundSize: "14px 14px" };
    case "grid":
      return { backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: "16px 16px" };
    default:
      return {};
  }
}

const EASE = [0.22, 1, 0.36, 1];

/* black panel slides in from the LEFT */
const panelV = {
  hidden: { x: "-100%" },
  show: { x: "0%", transition: { duration: 0.9, ease: EASE } },
};
const letterV = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.05, duration: 0.45, ease: EASE } }),
};
/* cards slide in from the LEFT, right after the panel arrives */
const cardV = {
  hidden: { opacity: 0, x: -100 },
  show: (i) => ({ opacity: 1, x: 0, transition: { delay: 0.75 + i * 0.15, duration: 0.7, ease: EASE } }),
};

/* right-side wordmark animation */
const riseV = {
  hidden: { y: "115%" },
  show: (i) => ({ y: 0, transition: { duration: 0.75, ease: EASE, delay: 0.1 + i * 0.14 } }),
};
const lineV = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.5 } },
};
const subV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.7 } },
};

function Vision() {
  const rowRef = useRef(null);
  const controls = useAnimationControls();
  // in view while ANY part is on screen; false only once fully off screen
  const inView = useInView(rowRef, { amount: "some" });

  // track scroll direction
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const dir = useRef("down");
  useMotionValueEvent(scrollY, "change", (latest) => {
    dir.current = latest > lastY.current ? "down" : "up";
    lastY.current = latest;
  });

  useEffect(() => {
    if (inView) {
      // scrolling up into it from below -> just appear; scrolling down -> slide in
      if (dir.current === "up") controls.set("show");
      else controls.start("show");
    } else {
      // only reset once the section is completely off the screen
      controls.set("hidden");
    }
  }, [inView, controls]);

  return (
    <section id="vision" className="relative w-full overflow-hidden">
      <div ref={rowRef} className="flex flex-col md:flex-row">
        {/* LEFT — black half (wider): Our Vision + cards */}
        <motion.div
          initial="hidden"
          animate={controls}
          className="relative flex w-full flex-col justify-center overflow-hidden px-6 py-20 md:min-h-screen md:w-[62%] md:px-12 lg:px-16"
        >
          {/* black background that slides in from the left */}
          <motion.div variants={panelV} className="absolute inset-0 bg-black" />

          <div className="relative z-10">
            <h2 className="flex flex-wrap text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {"Our Vision".split("").map((ch, i) => (
                <motion.span key={i} custom={i} variants={letterV} className="inline-block whitespace-pre">
                  {ch}
                </motion.span>
              ))}
            </h2>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:gap-5">
              {cards.map((c, i) => (
                <motion.div
  key={c.num}
  custom={i}
  variants={cardV}
  className="relative flex aspect-4/3 flex-col justify-center overflow-hidden bg-white p-4 sm:p-5"
>
                  <div className="pointer-events-none absolute inset-0" style={patternStyle(c.pattern)} />
                  <div className="relative">
                    <h3 className="text-base font-semibold text-neutral-900 sm:text-lg lg:text-xl">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500 sm:text-base">{c.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT — white half (narrower): animated wordmark */}
        <motion.div
          initial="hidden"
          animate={controls}
          className="relative flex w-full items-center justify-center bg-white px-6 py-20 md:min-h-screen md:w-[38%]"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              <span className="block overflow-hidden">
                <motion.span custom={0} variants={riseV} className="block">
                  Golden
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span custom={1} variants={riseV} className="block">
                  Hues
                </motion.span>
              </span>
            </h2>
            <motion.div variants={lineV} className="mx-auto mt-6 h-px w-16 origin-center bg-neutral-300" />
            <motion.p variants={subV} className="mt-4 text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
              since 2009
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Vision;