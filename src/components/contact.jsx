import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import contactBg from "../assets/contact.jpg";

// Paste the /exec URL from your deployed Google Apps Script web app here:
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNnlzD2940Tgi7srSJAcy_AHtMloHbUZYzMa2h1Pe6jvaHp6V3-zOWjjvFu-izvg/exec";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.12 },
  }),
};

const cards = [
  {
    title: "Find Us",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    items: [
      { text: "Old No. D-13, New No. D-10, 7th Street" },
      { text: "Anna Nagar, Chennai – 600 040" },
    ],
  },
  {
    title: "Call Us",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    ),
    intro: "Speak with our team directly:",
    items: [
      { text: "+91 91501 14664", href: "tel:+919150114664" },
      { text: "+91 74183 86002", href: "tel:+917418386002" },
    ],
  },
  {
    title: "Email & Support",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
    intro: "Reach out for assistance:",
    items: [{ text: "contact@goldenhues.com", href: "mailto:contact@goldenhues.com" }],
  },
];

const categories = [
  "General Inquiry",
  "Talent Sourcing for Business",
  "Skilling and Training Programs",
  "Partnership Opportunities",
  "Career Opportunities",
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", message: "" });
  // submitted is the source of truth for the thank-you screen.
  // Initialised from sessionStorage so a refresh within the same visit keeps the lock,
  // but a fully closed + reopened browser starts fresh (sessionStorage is cleared on tab close).
  const [submitted, setSubmitted] = useState(
    () => sessionStorage.getItem("gh_contact_sent") === "true"
  );
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.category || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("gh_contact_sent", "true");
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      <main>
        {/* 1) HERO */}
        <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-40 text-center">
          <img
            src={contactBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm"
            >
              Get in Touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Contact Us
            </motion.h1>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-6 block 'h-0.75' w-16 origin-center bg-white/80"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Reach out to discuss your hiring requirements. We typically respond within 48 hours.
            </motion.p>
          </div>
        </section>

        {/* 2) CONTACT CARDS (overlapping the hero) */}
        <section className="relative z-10 -mt-28 px-6">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col border border-neutral-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-neutral-900">
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {card.icon}
                  </svg>
                </div>

                <h3 className="mt-6 text-xl font-bold text-neutral-900">{card.title}</h3>

                {card.intro && (
                  <p className="mt-3 text-sm text-neutral-500">{card.intro}</p>
                )}

                <div className="mt-2 space-y-1">
                  {card.items.map((item) =>
                    item.href ? (
                      <a
                        key={item.text}
                        href={item.href}
                        className="block text-base font-semibold text-neutral-900 transition hover:text-neutral-600"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p key={item.text} className="text-base leading-relaxed text-neutral-600">
                        {item.text}
                      </p>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3) MESSAGE FORM */}
        <section className="w-full bg-neutral-50 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                Send Us a Message
              </h2>
              <span className="mx-auto mt-4 block 'h-0.75' w-16 bg-neutral-900" />
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-500">
                Fill in the details below and our team will get back to you. All submissions are stored securely.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12 border border-neutral-200 bg-white p-8 shadow-sm sm:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center bg-neutral-900">
                    <svg
                      className="h-7 w-7 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-neutral-900">Message received</h3>
                  <p className="mt-3 max-w-md text-neutral-500">
                    Thanks for reaching out — we've received your message and our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-semibold text-neutral-900">
                        Name <span className="text-neutral-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-neutral-900">
                        Email <span className="text-neutral-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="text-sm font-semibold text-neutral-900">
                        Contact <span className="text-neutral-400">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="mt-2 w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="text-sm font-semibold text-neutral-900">
                        Category <span className="text-neutral-400">*</span>
                      </label>
                      <div className="relative mt-2">
                        <select
                          id="category"
                          name="category"
                          required
                          value={form.category}
                          onChange={handleChange}
                          className="w-full appearance-none border border-neutral-300 bg-white px-4 py-3 pr-10 text-neutral-900 outline-none transition focus:border-neutral-900"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-semibold text-neutral-900">
                      Message <span className="text-neutral-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us a bit about what you're looking for..."
                      className="mt-2 w-full resize-y border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-neutral-900"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-center text-sm font-medium text-red-600">
                      Something went wrong. Please try again or email us directly at contact@goldenhues.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-neutral-900 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Let's Connect"}
                  </button>

                  <p className="text-center text-xs text-neutral-400">
                    Your information is kept strictly confidential.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;