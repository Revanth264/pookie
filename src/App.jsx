import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";

export default function App() {
  // THEME
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.body.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  // BACK TO TOP VISIBILITY
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // SMOOTH SCROLL WITH HEADER OFFSET
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    const header = document.querySelector("header");
    if (!el) return;
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 12);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // HERO PARALLAX
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-grad)",
        color: "var(--fg)",
      }}
    >
      <Helmet>
        <html lang="en" />
        <title>Peakime — Watch Freely. Dream Deeply.</title>
        <meta
          name="description"
          content="Peakime by PeakCraft Studios Private Limited — India’s home for licensed anime & donghua. Free, legal, high-quality streaming with dubbing & subs. Merchandise and community by Mr Animer."
        />
        <link rel="canonical" href="https://peakime.com/" />

        {/* Theme CSS variables (light/dark) */}
        <style>{`
          :root {
            --fg: #ffffff;
            --fg-muted: #cbd5e1;
            --accent: #facc15; /* yellow-400 */
            --accent-contrast: #111111;
            --line: rgba(255,255,255,0.12);
            --bg: #0b0f17;
            --bg-grad: radial-gradient(1200px 600px at 50% -5%, rgba(255,255,255,0.08), transparent), linear-gradient(180deg, #0b0f17, #0b0f17 20%, #0d1117 100%);
            --panel: rgba(0,0,0,0.6);
            --panel-blur: saturate(140%) blur(8px);
          }
          body[data-theme="light"] {
            --fg: #111827;
            --fg-muted: #374151;
            --accent: #d97706; /* amber-600 */
            --accent-contrast: #ffffff;
            --line: rgba(0,0,0,0.12);
            --bg: #f7fafc;
            --bg-grad: radial-gradient(900px 500px at 50% -5%, rgba(0,0,0,0.06), transparent), linear-gradient(180deg, #ffffff, #f8fafc 40%, #eef2f7 100%);
            --panel: rgba(255,255,255,0.7);
            --panel-blur: saturate(140%) blur(8px);
          }
          html { scroll-behavior: smooth; }
          a { color: inherit; }
          .btn {
            display:inline-flex; align-items:center; justify-content:center;
            border-radius: .75rem; padding: .75rem 1.25rem; font-weight: 600;
            transition: all .2s ease;
          }
          .btn-solid { background: var(--accent); color: var(--accent-contrast); }
          .btn-solid:hover { filter: brightness(1.05); transform: translateY(-1px); }
          .btn-ghost  { border: 1px solid var(--accent); color: var(--fg); }
          .btn-ghost:hover { background: color-mix(in srgb, var(--accent) 12%, transparent); transform: translateY(-1px); }
          .divider { border-top: 1px solid var(--line); }
          .muted { color: var(--fg-muted); }
          .card {
            background: var(--panel); -webkit-backdrop-filter: var(--panel-blur); backdrop-filter: var(--panel-blur);
            border: 1px solid var(--line); border-radius: 1.25rem; padding: 1.25rem 1.25rem;
          }
          .nav-link { color: var(--fg-muted); }
          .nav-link:hover, .nav-link:focus { color: var(--accent); text-decoration: underline; outline: none; }
          .section { padding: 5rem 1.5rem; scroll-margin-top: 92px; }
          @media (min-width: 768px){ .section { padding: 6rem 1.5rem; } }
        `}</style>
      </Helmet>

      {/* NAV */}
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,.25))",
          borderBottom: `1px solid var(--line)`,
          backdropFilter: "saturate(140%) blur(10px)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => scrollToId("home")}
            style={{ color: "var(--accent)", fontWeight: 800, letterSpacing: ".04em" }}
            aria-label="Go to home"
          >
            PEAKIME
          </button>

          <nav aria-label="primary" className="hidden md:block">
            <ul style={{ display: "flex", gap: "1.75rem", fontSize: ".95rem" }}>
              {[
                ["about", "About"],
                ["mission", "Vision & Mission"],
                ["studios", "Studios & Licensors"],
                ["categories", "Categories"],
                ["creators", "Creators"],
                ["community", "Community"],
                ["legal", "Legal"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button className="nav-link" onClick={() => scrollToId(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            <button
              onClick={() => setDark((d) => !d)}
              className="btn"
              style={{ border: `1px solid var(--line)` }}
              aria-pressed={dark}
              aria-label="Toggle color mode"
              title="Toggle theme"
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => scrollToId("coming")}
              className="btn btn-solid"
            >
              Start Watching Soon
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        ref={heroRef}
        className="section"
        style={{
          height: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{ y }}
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.25,
            background:
              "radial-gradient(1200px 600px at 50% 0%, rgba(255,255,255,.12), transparent)",
          }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 900, color: "var(--accent)" }}
        >
          Stories Beyond Borders.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="muted"
          style={{ marginTop: "1rem", maxWidth: 780, paddingInline: "1rem", fontSize: "1.15rem", lineHeight: 1.7 }}
        >
          Discover world-class animation — brought home to India. Watch officially licensed anime and donghua,
          dubbed and subtitled for everyone, everywhere. Watch Freely. Dream Deeply.
        </motion.p>

        <div style={{ marginTop: "2rem", display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
          <button onClick={() => scrollToId("coming")} className="btn btn-solid">Start Watching Soon</button>
          <button onClick={() => scrollToId("studios")} className="btn btn-ghost">Partner With Us</button>
        </div>

        <p className="muted" style={{ position: "absolute", bottom: 24, fontSize: 12, opacity: .8 }}>
          Scroll
        </p>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About Peakime">
        Peakime (a PeakCraft Studios Pvt. Ltd. brand) is building India’s most loved destination for{" "}
        <strong>licensed anime, donghua & Indian animation</strong> — with dubs, subs, and a thriving creator community.
      </Section>

      {/* MISSION */}
      <Section id="mission" title="Vision & Mission">
        <ul className="muted" style={{ paddingLeft: "1.25rem", display: "grid", gap: ".5rem", listStyle: "disc" }}>
          <li>Legal, affordable, high-quality streaming for India.</li>
          <li>Best-in-class Hindi / Telugu / Tamil dubs and accurate subtitles.</li>
          <li>Creator-first ecosystem — events, collabs, and opportunities.</li>
          <li>Transparent licensing that supports original studios.</li>
        </ul>
      </Section>

      {/* STUDIOS */}
      <Section id="studios" title="Studios & Licensors">
        We’re open to partnerships across Japan, China and India.
        <div style={{ marginTop: "1rem", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button className="btn btn-solid" onClick={() => scrollToId("contact")}>Talk Licensing</button>
          <button className="btn btn-ghost" onClick={() => scrollToId("contact")}>Dubbing & Subtitling</button>
        </div>
      </Section>

      {/* CATEGORIES (NEW) */}
      <Section id="categories" title="Categories">
        <div className="card" style={{ display: "grid", gap: ".75rem" }}>
          <span>Action • Adventure • Fantasy • Romance • Slice of Life</span>
          <span>Comedy • Sci-Fi • Mecha • Historical • Sports</span>
          <span>Indian Animation • Donghua • Originals (future)</span>
        </div>
      </Section>

      {/* MERCH */}
      <Section id="merch" title="Merch & Collectibles">
        Figures, apparel, prints and collabs—crafted for Indian otaku.
        <div style={{ marginTop: "1rem", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <button className="btn btn-solid" onClick={() => scrollToId("coming")}>Shop (coming soon)</button>
          <button className="btn btn-ghost" onClick={() => scrollToId("community")}>Join Community</button>
        </div>
      </Section>

      {/* CREATORS (NEW) */}
      <Section id="creators" title="Creators">
        Join the fan hub, watch parties and creator programs — by <strong>Mr Animer</strong> and the Peakime team.
        <div style={{ marginTop: "1rem" }}>
          <button className="btn btn-solid" onClick={() => scrollToId("contact")}>Creator Signup</button>
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section id="community" title="Community">
        <div className="card" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <Social href="https://x.com/Peakime" label="X (Twitter)" />
          <Social href="https://www.instagram.com/peakime" label="Instagram" />
        </div>
      </Section>

      {/* COMING SOON */}
      <Section id="coming" title="Coming Soon">
        Streaming app & store are under active development. Follow our socials for drops and alpha.
        <div style={{ marginTop: "1rem", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <Social href="https://x.com/Peakime" label="X (Twitter)" />
          <Social href="https://www.instagram.com/peakime" label="Instagram" />
        </div>
      </Section>

      {/* LEGAL (NEW) */}
      <Section id="legal" title="Legal">
        © {new Date().getFullYear()} PeakCraft Studios Private Limited. All rights reserved. Terms of Service and Privacy Policy (coming soon).
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <p className="muted">Partnerships, licensing, creators & support—reach us anytime.</p>
        <div style={{ marginTop: "1rem", display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <a
            className="btn btn-solid"
            href="https://mail.google.com/mail/?view=cm&to=sales@peakime.com,support@peakime.com&su=Peakime%20Enquiry&body=Hi%20Peakime%20Team%2C"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email Us (Gmail)
          </a>
          <a className="btn btn-ghost" href="tel:+916300458916">Call +91 63004 58916</a>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="divider" style={{ padding: "2.5rem 0", textAlign: "center", color: "var(--fg-muted)" }}>
        <nav style={{ marginBottom: ".75rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["about","studios","categories","creators","community","contact","coming","legal"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollToId(id); }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} PeakCraft Studios Private Limited.</p>
      </footer>

      {/* BACK TO TOP */}
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-solid"
          style={{ position: "fixed", right: 24, bottom: 24, borderRadius: 9999 }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

/* ---- helpers ---- */
function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="mx-auto" style={{ maxWidth: 980 }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.25rem)", fontWeight: 900, color: "var(--accent)" }}>
          {title}
        </h2>
        <div className="muted" style={{ marginTop: ".75rem", lineHeight: 1.7 }}>{children}</div>
      </div>
    </section>
  );
}

function Social({ href, label }) {
  return (
    <a
      className="btn"
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ border: `1px solid var(--line)` }}
    >
      {label}
    </a>
  );
}
