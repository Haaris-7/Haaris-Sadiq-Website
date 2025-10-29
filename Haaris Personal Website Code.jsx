import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Haaris Sadiq — Ultra‑modern Portfolio (React + Tailwind + Framer Motion)
 * Black & White Minimal — Error‑free build
 *
 * Features
 *  - Sticky navbar with scroll‑spy (animated left bar on active item)
 *  - Mobile hamburger menu
 *  - Smooth scrolling + scroll-padding
 *  - Projects with modal video placeholder
 *  - Experience + Education + Skills + Certifications
 *  - CTA buttons as links
 *  - Dev sanity checks (non‑breaking) as simple "test cases"
 */

export default function Portfolio() {
  const data = useMemo(
    () => ({ name: "Haaris Sadiq", tagline: "Mechatronics Engineer" }),
    []
  );

  // DEV‑ONLY sanity checks (lightweight "tests")
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const sectionIds = [
        "home",
        "about",
        "projects",
        "experience",
        "education",
        "skills",
        "certifications",
        "contact",
      ];
      // Assert all sections exist
      sectionIds.forEach((id) => {
        console.assert(
          !!document.getElementById(id),
          `[TEST] Missing section #${id}`
        );
      });
      // Assert navbar exists
      console.assert(
        !!document.getElementById("navbar-root"),
        "[TEST] Missing navbar root"
      );
      // Assert CTAButton renders correctly (hero primary)
      const heroCta = document.querySelector('a[href="#projects"]');
      console.assert(!!heroCta, "[TEST] Missing hero CTA to #projects");
      // Assert footer links exist
      console.assert(!!document.querySelector('#contact a[href^="mailto:"]'), '[TEST] Missing footer email link');
      console.assert(!!document.querySelector('#contact a[href*="linkedin"]'), '[TEST] Missing footer LinkedIn link');
    }
  }, []);

  return (
    <>
      <style>{`html { scroll-padding-top: 90px; }`}</style>
      <div id="top" className="min-h-screen bg-white text-black antialiased scroll-smooth">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6">
          <Hero name={data.name} tagline={data.tagline} />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Footer />
        </main>
      </div>
    </>
  );
}

function Navbar() {
  const items = [
    "home",
    "about",
    "projects",
    "experience",
    "education",
    "skills",
    "certifications",
    "contact",
  ];
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // Scroll‑spy (React‑safe listener)
  useEffect(() => {
    const onScroll = () => {
      items.forEach((id) => {
        const sec = document.getElementById(id);
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const midpoint = window.innerHeight / 2;
        if (rect.top <= midpoint && rect.bottom >= midpoint) setActive(id);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      id="navbar-root"
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all duration-300"
    >
      {/* Desktop Nav */}
      <nav className="hidden md:flex max-w-7xl mx-auto px-6 h-14 items-center gap-6 text-sm">
        {items.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`relative capitalize transition-all ${active === id ? "font-semibold" : ""}`}
            onClick={() => setOpen(false)}
          >
            {active === id && (
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-black rounded-sm transition-all" />
            )}
            {id}
          </a>
        ))}
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex justify-between items-center h-14 px-6">
        <span className="font-semibold text-lg">Menu</span>
        <button onClick={() => setOpen((v) => !v)} className="text-xl" aria-label="Toggle Menu">
          ☰
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          {items.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block px-6 py-3 capitalize border-b text-sm ${active === id ? "font-bold" : ""}`}
              onClick={() => setOpen(false)}
            >
              {id}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionDivider() {
  return <div className="my-24 h-px bg-neutral-200" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl font-bold tracking-tight leading-tight">{children}</h2>
  );
}

function Hero({ name, tagline }: { name: string; tagline: string }) {
  return (
    <section id="home" className="pt-32 sm:pt-40">
      <motion.h1
        className="text-6xl sm:text-8xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {name}
      </motion.h1>
      <motion.p
        className="mt-6 text-xl text-neutral-700 max-w-2xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {tagline} — robotics, AI & intelligent systems.
      </motion.p>
      <motion.div
        className="mt-10 flex gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CTAButton href="#projects">View Projects</CTAButton>
        <CTAButton variant="outline" href="mailto:s.haaris.2020@gmail.com">Email Me</CTAButton>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <SectionHeading>About</SectionHeading>
      <p className="mt-6 max-w-3xl text-neutral-700 text-lg leading-relaxed">
        Aspiring Mechatronics Engineer passionate about applying AI, robotics, and automation
        to solve real‑world challenges. I build reliable real‑time systems that merge
        software intelligence with hardware execution. I focus on scalable design,
        intuitive user experience, and well‑structured engineering practices backed by
        continuous documentation.
      </p>
    </section>
  );
}

function Projects() {
  const list = [
    { title: "AI Video Combiner", desc: "Automated editing using Qdrant + AI." },
    { title: "Real‑Time Object Recognition", desc: "YOLOv11 on Raspberry Pi." },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {list.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
            onClick={() => setActive(i)}
          >
            <h3 className="font-semibold text-2xl">{p.title}</h3>
            <p className="mt-2 text-neutral-600 text-sm">{p.desc}</p>
            <div className="mt-5 h-48 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center text-xs text-neutral-500">
              Click for video preview
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal placeholder for video */}
      {active !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white p-6 rounded-xl max-w-xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-semibold">Video Coming Soon</h4>
            <div className="mt-4 w-full h-64 bg-neutral-200" />
            <button
              className="mt-4 block ml-auto text-sm underline"
              onClick={() => setActive(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Experience() {
  const items = [
    {
      role: "AI & Emerging Tech Intern",
      org: "PwC Dubai",
      period: "Jul – Aug 2025",
      bullets: [
        "Built AI video combiner using Qdrant & Docker",
        "Developed Pi‑based real‑time object recognition",
      ],
    },
    {
      role: "Lead Digital Coordinator",
      org: "JESS Dubai",
      period: "Sep 2023 – May 2025",
      bullets: ["Led AI‑safety workshops & student ambassadors"],
    },
  ];

  return (
    <section id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="mt-8 space-y-8">
        {items.map((job) => (
          <div key={job.role} className="border border-neutral-200 p-6 rounded-xl bg-white">
            <div className="flex justify-between text-sm text-neutral-500">
              <span>{job.org}</span>
              <span>{job.period}</span>
            </div>
            <h3 className="mt-1 font-semibold text-xl">{job.role}</h3>
            <ul className="mt-2 list-disc ml-5 text-neutral-700 text-sm space-y-1">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education">
      <SectionHeading>Education</SectionHeading>
      <div className="mt-8 border border-neutral-200 p-6 rounded-xl bg-white">
        <div className="flex justify-between text-sm text-neutral-500">
          <span>University of Waterloo</span>
          <span>2025 – 2030 (anticipated)</span>
        </div>
        <h3 className="mt-1 font-semibold text-xl">BASc Mechatronics Engineering (Co‑op)</h3>
      </div>
    </section>
  );
}

function Skills() {
  const items = ["Python", "C++", "OpenCV", "Raspberry Pi", "Docker", "MATLAB", "AutoCAD"];
  return (
    <section id="skills">
      <SectionHeading>Skills</SectionHeading>
      <div className="mt-8 flex flex-wrap gap-3">
        {items.map((s) => (
          <span key={s} className="px-4 py-2 text-sm rounded-full border border-neutral-200">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  const items = [
    { name: "CERN Beamline for Schools", desc: "Conducted physics experimentation proposal & simulation for CERN competition submission." },
    { name: "VEX IQ World Robotics Participant", desc: "Designed & programmed competitive robots for international challenges." },
    { name: "Oxford University Computing Challenge", desc: "International programming challenge demonstrating algorithmic thinking." },
    { name: "IBM Data Analysis using Python", desc: "Certified in Python data workflows incl. visualization & statistical analysis." },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="certifications">
      <SectionHeading>Certifications & Achievements</SectionHeading>
      <div className="mt-8 flex flex-wrap gap-3">
        {items.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            className="px-4 py-2 text-sm rounded-full border border-neutral-200 hover:bg-black hover:text-white transition-all"
          >
            {c.name}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0.0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl"
          >
            <h4 className="text-lg font-semibold">{items[active].name}</h4>
            <p className="mt-3 text-sm text-neutral-700">{items[active].desc}</p>
            <button
              onClick={() => setActive(null)}
              className="mt-6 underline text-sm text-neutral-700"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-20 text-center bg-black text-white mt-24">
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="mailto:s.haaris.2020@gmail.com"
          className="underline text-sm hover:opacity-80"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/haarissadiq"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sm hover:opacity-80"
        >
          LinkedIn
        </a>
        <a
          href="#top"
          className="underline text-sm hover:opacity-80"
        >
          Back to top
        </a>
      </div>
      <p className="mt-6 text-xs opacity-60">© {new Date().getFullYear()} Haaris Sadiq — Designed & Built by Me</p>
    </footer>
  );
}

function CTAButton({
  children,
  variant = "solid",
  className = "",
  href = "#",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  href?: string;
}) {
  const base =
    "rounded-full px-5 py-2.5 text-sm transition-all inline-block text-center";

  if (variant === "outline") {
    return (
      <a
        href={href}
        className={`${base} ${className} border border-black text-black hover:bg-black hover:text-white`}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={`${base} ${className} bg-black text-white hover:opacity-90`}>
      {children}
    </a>
  );
}
