// src/App.jsx
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Peakime – SEO-optimized single page
 * - Brand keywords baked into <Helmet> for SEO
 * - JSON-LD Organization + Website schema
 * - Accessible nav with working anchor buttons
 * - Smooth scroll, back-to-top, light/dark toggle
 * - Minimal Tailwind classes (works even without Tailwind—keeps it readable)
 */

export default function App() {
  // theme toggle
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  // show back-to-top
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // simple smooth scroll helper
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // parallax for hero background
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-300 selection:text-black">
      {/* ---------- SEO ---------- */}
      <Helmet>
        <html lang="en" />
        <title>Peakime – Watch Freely. Dream Deeply.</title>

        {/* Primary */}
        <meta
          name="description"
          content="Peakime by PeakCraft Studios Private Limited—India’s home for licensed anime & donghua. Free, legal, high-quality streaming with dubbing & subs. Merchandise and community by Mr Animer."
        />
        <meta
          name="keywords"
          content="Peakime, Peakimation, PeakCraft Studios Private Limited, Mr Animer, anime India, donghua India, Indian animation, anime merchandise India, otaku merch, figures, collectibles, apparel, licensed anime, Hindi dubbed anime, Telugu dubbed anime, Tamil dubbed anime, subbed anime, streaming platform"
        />
        // inside <Helmet> in App.jsx
          <meta
                name="google-site-verification" 
                content="TcFVALDyzB3KWL0zKk_vQaPocXKH099Vy65SFhiOgw4" 
        />
        <link rel="canonical" href="https://peakime.com/" />

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peakime.com/" />
        <meta property="og:title" content="Peakime – Watch Freely. Dream Deeply." />
        <meta
          property="og:description"
          content="Licensed anime & donghua for India. Free, legal, high-quality. Merchandise & community."
        />
        <meta property="og:image" content="https://peakime.com/og-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peakime – Watch Freely. Dream Deeply." />
        <meta
          name="twitter:description"
          content="Licensed anime & donghua for India. Free, legal, high-quality."
        />
        <meta name="twitter:image" content="https://peakime.com/og-cover.jpg" />
        <meta name="theme-color" content="#111111" />

        {/* JSON-LD: Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PeakCraft Studios Private Limited",
            url: "https://peakime.com/",
            logo: "https://peakime.com/logo192.png",
            brand: { "@type": "Brand", name: "Peakime", slogan: "Watch Freely. Dream Deeply." },
            sameAs: [
              "https://x.com/Peakime",
              "https://www.instagram.com/peakime"
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                email: "revanthchowdhary264@gmail.com",
                contactType: "customer support",
                areaServed: "IN",
              },
            ],
          })}
        </script>

        {/* JSON-LD: WebSite + SearchAction */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://peakime.com/",
            name: "Peakime",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://peakime.com/?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      {/* ---------- NAV ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => go("home")}
            className="text-lg md:text-xl font-extrabold tracking-wide text-yellow-400"
            aria-label="Go to home"
          >
            PEAKIME
          </button>

          <nav aria-label="primary" className="hidden md:block">
            <ul className="flex gap-7 text-sm text-gray-300">
              <li><button onClick={() => go("about")} className="hover:text-yellow-400">About</button></li>
              <li><button onClick={() => go("mission")} className="hover:text-yellow-400">Mission</button></li>
              <li><button onClick={() => go("studios")} className="hover:text-yellow-400">Studios</button></li>
              <li><button onClick={() => go("merch")} className="hover:text-yellow-400">Merch</button></li>
              <li><button onClick={() => go("community")} className="hover:text-yellow-400">Community</button></li>
              <li><button onClick={() => go("contact")} className="hover:text-yellow-400">Contact</button></li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="text-xs border border-white/20 px-3 py-1 rounded hover:border-yellow-400 hover:text-yellow-400 transition"
              aria-pressed={dark}
              aria-label="Toggle color mode"
            >
              {dark ? "Light" : "Dark"} Mode
            </button>
            <button
              onClick={() => go("coming")}
              className="hidden md:inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-2 rounded hover:bg-yellow-300"
            >
              Start Watching Soon
            </button>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-black to-gray-900"
      >
        <motion.div
          style={{ y }}
          className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(255,255,255,0.12),transparent)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Stories Beyond Borders.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-5 max-w-3xl px-6 text-lg md:text-xl text-gray-300"
        >
          Peakime by <strong>PeakCraft Studios Private Limited</strong>—India’s home for licensed
          <em> anime & donghua</em>. Free, legal, high-quality streaming with dubbing & subs.
          Merchandise and community by <strong>Mr Animer</strong>.
        </motion.p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => go("coming")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Start Watching Soon
          </button>
          <button
            onClick={() => go("studios")}
            className="border border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400/10 transition"
          >
            Partner With Us
          </button>
        </div>
        <p className="absolute bottom-6 text-xs text-gray-400 opacity-75">Scroll</p>
      </section>

      {/* ---------- ABOUT ---------- */}
      <Section id="about" title="About Peakime">
        Peakime (a PeakCraft Studios Pvt. Ltd. brand) is building India’s most loved destination
        for <strong>licensed anime, donghua & Indian animation</strong>—with dubs, subs and a
        thriving creator community.
      </Section>

      {/* ---------- MISSION ---------- */}
      <Section id="mission" title="Vision & Mission">
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Legal, affordable, high-quality streaming for India.</li>
          <li>Best-in-class Hindi / Telugu / Tamil dubs and accurate subtitles.</li>
          <li>Creator-first ecosystem—events, collabs, and opportunities.</li>
          <li>Transparent licensing that supports original studios.</li>
        </ul>
      </Section>

      {/* ---------- STUDIOS ---------- */}
      <Section id="studios" title="Studios & Licensors">
        We’re open to partnerships across Japan, China and India.
        <div className="mt-4 flex flex-wrap gap-3">
          <CTA href="#contact" label="Talk Licensing" />
          <CTA href="#contact" label="Dubbing & Subtitling" variant="ghost" />
        </div>
      </Section>

      {/* ---------- MERCH ---------- */}
      <Section id="merch" title="Merch & Collectibles">
        Figures, apparel, prints and collabs—crafted for Indian otaku.
        <div className="mt-4 flex flex-wrap gap-3">
          <CTA href="#coming" label="Shop (coming soon)" />
          <CTA href="#community" label="Join Community" variant="ghost" />
        </div>
      </Section>

      {/* ---------- COMMUNITY ---------- */}
      <Section id="community" title="Community & Creators">
        Join the fan hub, watch parties and creator programs—by <strong>Mr Animer</strong> and the
        Peakime team.
        <div className="mt-4">
          <CTA href="#contact" label="Creator Signup" />
        </div>
      </Section>

      {/* ---------- COMING SOON ---------- */}
      <Section id="coming" title="Coming Soon">
        Streaming app & store are under active development. Follow our socials for drops and alpha.
        <div className="mt-4 flex gap-3">
          <Social href="https://x.com/Peakime" label="X (Twitter)" />
          <Social href="https://www.instagram.com/peakime" label="Instagram" />
        </div>
      </Section>

      {/* ---------- CONTACT ---------- */}
      <Section id="contact" title="Contact">
        <p className="text-gray-300">
          Partnerships, licensing, creators & support—reach us anytime.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
            href="mailto:revanthchowdhary264@gmail.com?subject=Peakime%20Enquiry&body=Hi%20Peakime%20team%2C%0D%0A%0D%0A"
          >
            Email Us
          </a>
          <a
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-yellow-400 hover:bg-yellow-400/10"
            href="tel:+91-0000000000"
          >
            Call (placeholder)
          </a>
        </div>
      </Section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400 text-sm">
        <nav className="mb-3 space-x-4">
          <a className="hover:text-yellow-400" href="#about">About</a>
          <a className="hover:text-yellow-400" href="#studios">Licensing</a>
          <a className="hover:text-yellow-400" href="#community">Community</a>
          <a className="hover:text-yellow-400" href="#contact">Contact</a>
          <a className="hover:text-yellow-400" href="#coming">App</a>
        </nav>
        <p>© {new Date().getFullYear()} PeakCraft Studios Private Limited. All Rights Reserved.</p>
      </footer>

      {/* back-to-top */}
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black px-4 py-3 rounded-full shadow-lg hover:bg-yellow-300"
        >
          ↑
        </button>
      )}
    </div>
  );
}

/* ------------------ Small presentational helpers ------------------ */

function Section({ id, title, children }) {
  return (
    <section id={id} className="px-6 py-20 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-400">{title}</h2>
        <div className="mt-4 text-gray-300 leading-relaxed">{children}</div>
      </div>
    </section>
  );
}

function CTA({ href = "#", label, variant = "solid" }) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold transition";
  const solid = "bg-yellow-400 text-black hover:bg-yellow-300";
  const ghost = "border border-yellow-400 hover:bg-yellow-400/10";
  const cls = `${base} ${variant === "ghost" ? ghost : solid}`;
  return (
    <a className={cls} href={href} onClick={(e) => href.startsWith("#") && e.preventDefault()}>
      {href.startsWith("#") ? (
        <span onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}>
          {label}
        </span>
      ) : (
        label
      )}
    </a>
  );
}

function Social({ href, label }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-lg px-5 py-3 border border-white/20 hover:border-yellow-400 hover:text-yellow-400"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      {label}
    </a>
  );
}
