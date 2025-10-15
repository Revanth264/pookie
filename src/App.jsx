import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Peakime.com — Single-Page Premium Website (React + Tailwind + Framer Motion)
 * - Centered headings
 * - Smooth scroll nav with working anchors
 * - Apple‑style parallax hero + section fades
 * - Back‑to‑Top button
 * - Dark / Light theme toggle
 * - Simple contact form (works with mailto or Netlify if enabled)
 * - All brand copy included verbatim from the provided master text
 */

export default function PeakimeSite() {
  // Theme toggle (dark by default)
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [dark]);

  // Back to top button visibility
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -240]);

  return (
    <div ref={ref} className="min-h-screen bg-black text-white dark:bg-black dark:text-white font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="#home" className="text-xl font-bold tracking-wide text-yellow-400">PEAKIME</a>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li><a href="#about" className="hover:text-yellow-400">About</a></li>
            <li><a href="#mission" className="hover:text-yellow-400">Vision & Mission</a></li>
            <li><a href="#studios" className="hover:text-yellow-400">Studios & Licensors</a></li>
            <li><a href="#creators" className="hover:text-yellow-400">Creators</a></li>
            <li><a href="#community" className="hover:text-yellow-400">Community</a></li>
            <li><a href="#legal" className="hover:text-yellow-400">Legal</a></li>
            <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
          <div className="flex items-center gap-3">
            <button onClick={() => setDark(d => !d)} className="text-xs border border-white/20 px-3 py-1 rounded hover:border-yellow-400 hover:text-yellow-400 transition">
              {dark ? "Light" : "Dark"} Mode
            </button>
            <a href="#coming" className="hidden md:inline-block bg-yellow-400 text-black text-xs font-semibold px-3 py-2 rounded hover:bg-yellow-300">Start Watching Soon</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-[92vh] flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.12),transparent_60%)]" />
        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-5xl md:text-7xl font-extrabold text-yellow-400 mb-6">Stories Beyond Borders.</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4,duration:1}} className="text-lg md:text-xl max-w-3xl text-gray-300 mb-8">
          Discover world-class animation — brought home to India. Watch officially licensed anime and donghua, dubbed and subtitled for everyone, everywhere. <br/>Watch Freely. Dream Deeply.
        </motion.p>
        <div className="flex gap-4">
          <a href="#coming" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">Start Watching Soon</a>
          <a href="#studios" className="border border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400/10 transition">Partner With Us</a>
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:0.5}} transition={{delay:1}} className="absolute bottom-6 text-xs text-gray-400">Scroll</motion.div>
      </section>

      {/* GENERIC SECTION COMPONENTS WITH ALL CONTENT */}
      <AnimatedSection id="about" title="About Peakime">
        <Block>
          Peakime is the flagship brand of <b>PeakCraft Studios Private Limited</b>, created to bring world-class animation closer to Indian audiences.
        </Block>
        <Block>
          We focus on introducing <b>donghua (Chinese animation)</b> and anime to India through <b>official licensing, dubbing, and subtitling</b>, ensuring that fans can experience every story in their own language while preserving its original artistry and emotion.
        </Block>
        <Block>
          Peakime was founded with a simple belief — <b>animation should be free, accessible, and inspiring</b>. Our goal is to give Indian viewers a platform where they can watch legally, enjoy openly, and feel part of a global creative culture.
        </Block>
        <Block>
          We see storytelling as more than entertainment. Every frame, every line, and every voice carries imagination, courage, and meaning. Through Peakime, we aim to <b>connect fans with worlds that ignite creativity and reflection</b>.
        </Block>
        <Block>
          As we grow, our vision extends beyond bringing global titles to India. We plan to <b>develop original Indian animated universes</b>, crafted with the same heart, depth, and discipline that define the world’s most beloved studios.
        </Block>
        <Block>
          Peakime stands for <b>stories without borders</b> — a bridge between creators and audiences, cultures and emotions, dreams and reality. We are here to make animation in India not just a genre, but a way of life.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="mission" title="Our Mission">
        <Block>
          To make animation a <b>universal experience</b> in India — one that is <b>free to watch, true to its creators, and deeply connected to its audience</b>. We exist to bridge cultures through storytelling, bringing the best of Asian animation to everyone, everywhere, while honoring the authenticity and creative spirit of every artist.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="vision" title="Our Vision">
        <Block>
          To build <b>India’s most trusted home for animation</b> — where fans discover worlds, connect through stories, and feel inspired to create their own.
        </Block>
        <Block>
          Our vision is to <b>shape the future of Indian animation</b>, introducing licensed global masterpieces today and nurturing <b>original Indian stories and characters</b> for tomorrow.
        </Block>
        <Block>
          Peakime is not just a platform — it’s a movement to <b>redefine how India watches, feels, and dreams through animation.</b>
        </Block>
      </AnimatedSection>

      <AnimatedSection id="founder" title="Founder’s Note">
        <Block>
          When I started Peakime, it wasn’t just about launching a brand — it was about starting a culture. For years, Indian fans have admired animation from around the world, but access was often limited or scattered. I wanted to change that.
        </Block>
        <Block>
          Peakime was born from a belief that <b>everyone deserves to experience great stories, freely and fully</b>, in their own language, without losing the heart of the original. Animation can move people — it teaches, heals, and inspires. It has the power to change how we see ourselves and the world around us.
        </Block>
        <Block>
          At <b>PeakCraft Studios</b>, we are building this vision step by step. Licensing, dubbing, storytelling, community — each effort brings us closer to creating a world where animation isn’t a niche, but a shared emotion.
        </Block>
        <Block>
          This is just the beginning. It will take time, patience, and the support of dreamers who believe in the same vision. But with every story we bring home, we move one step closer to making animation a way of life in India.
        </Block>
        <Block>
          Thank you for being part of it. Let’s build this world together.
        </Block>
        <div className="mt-6 text-yellow-400">– Revanth Sarupuru<br/>Founder & Co-Director, PeakCraft Studios Private Limited<br/>📧 revanthchowdhary264@gmail.com</div>
      </AnimatedSection>

      <AnimatedSection id="future" title="Our Future">
        <Block>
          Every great movement begins with a story — and ours is just getting started.
        </Block>
        <Block>
          Peakime was born from a dream to change how India experiences animation. What began as a bridge between worlds will grow into an ecosystem — where artists, fans, and creators unite to imagine, build, and live within new worlds of storytelling.
        </Block>
        <ul className="max-w-5xl mx-auto text-left mt-6 space-y-2 text-gray-300">
          <li>• <b>Indian voices meet global art</b>, creating something entirely new.</li>
          <li>• <b>Fans watch freely and creators work proudly</b>, knowing every story is valued.</li>
          <li>• <b>Animation becomes a shared language</b> — one that inspires, teaches, and connects us all.</li>
        </ul>
        <Block>
          We’re not here to chase trends. We’re here to shape generations. Through every partnership, every story, and every spark of imagination, Peakime will stand for creativity without limits.
        </Block>
        <Block>
          The world of animation is expanding — and India is ready to take its place at the heart of it.
        </Block>
        <div className="mt-6"><b>This is the dawn of something greater.<br/>This is Peakime.<br/>Watch Freely. Dream Deeply.</b></div>
      </AnimatedSection>

      <AnimatedSection id="coming" title="Coming Soon">
        <Block>
          A new chapter in animation is almost here. At Peakime, we’re preparing to bring you a carefully curated selection of <b>licensed anime and donghua titles</b> — dubbed, subtitled, and ready to watch for free.
        </Block>
        <Block>
          Every story we choose carries something deeper — imagination, courage, friendship, and the power to inspire. We’re working closely with creators, studios, and voice talent to ensure each title is <b>true to its origin</b> and <b>authentic in its local voice</b>.
        </Block>
        <Block>
          Stay tuned. The worlds you’ve been waiting to explore are almost here. <b>Watch Freely. Dream Deeply.</b>
        </Block>
      </AnimatedSection>

      <AnimatedSection id="join" title="Join Us">
        <Block>
          Every great story begins with a spark — and we believe the next one starts here. At Peakime, we’re not just building a platform; we’re building a community where creativity, passion, and imagination come together.
        </Block>
        <Block>
          Whether you’re a fan, artist, storyteller, or partner, there’s a place for you in our world. Join us as we bring incredible stories to life, connect cultures through animation, and shape the future of how India watches and creates.
        </Block>
        <Block>
          Follow our journey, share your ideas, and grow with us — because the world we’re creating is meant for everyone who believes in the power of storytelling.
        </Block>
        <div className="mt-6 font-semibold">Welcome to Peakime. <br/>Watch Freely. Dream Deeply.</div>
      </AnimatedSection>

      <AnimatedSection id="studios" title="For Studios & Licensors">
        <Block>
          At Peakime, we believe that great stories deserve to reach every corner of the world — with authenticity, respect, and creative care.
        </Block>
        <Block>
          We collaborate with <b>animation studios, distributors, and content owners</b> to bring licensed titles to Indian audiences through <b>official streaming, dubbing, and subtitling</b>. Our process ensures that every series we localize maintains its artistic essence while becoming accessible to a new generation of fans.
        </Block>
        <ul className="max-w-5xl mx-auto text-left mt-6 space-y-2 text-gray-300">
          <li>• <b>Cultural fidelity:</b> Adaptations that honor original intent.</li>
          <li>• <b>Professional localization:</b> Accurate dubbing and translation across major Indian languages.</li>
          <li>• <b>Transparent collaboration:</b> Legal licensing, clear communication, and complete respect for IP.</li>
          <li>• <b>Audience growth:</b> Expanding your stories into one of the world’s largest and fastest-growing fan communities.</li>
        </ul>
        <Block>
          If you represent a studio or rights holder interested in working with us, we’d love to connect. Reach out to our licensing team and let’s build something lasting together.
        </Block>
        <div className="mt-4">📧 <b>Email:</b> revanthchowdhary264@gmail.com<br/>🏢 <b>Company:</b> PeakCraft Studios Private Limited<br/>🌐 <b>www.peakime.com</b></div>
      </AnimatedSection>

      <AnimatedSection id="legal" title="Legal & Licensing Notice">
        <Block>
          Peakime operates under <b>PeakCraft Studios Private Limited</b>, ensuring that every piece of content featured or streamed through our platform is <b>officially licensed or used with direct authorization</b> from its rightful owners.
        </Block>
        <Block>
          We do not host or promote pirated, fan-uploaded, or unauthorized content of any kind. All titles, characters, music, and creative properties remain the intellectual property of their respective studios, creators, and licensors.
        </Block>
        <Block>
          Our team follows a transparent process for acquisition, dubbing, and localization, maintaining strict compliance with legal and industry standards. Each partnership is built on <b>respect for creators, trust with licensors, and authenticity for audiences</b>.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="careers" title="Careers / Work With Us">
        <Block>
          At Peakime, we believe the future of animation will be written by those who dare to dream differently. We’re building a space where <b>artists, voice actors, writers, translators, and visionaries</b> can collaborate to bring world-class stories to Indian audiences.
        </Block>
        <Block>
          If you’re passionate about anime, donghua, or the power of visual storytelling, we’d love to hear from you.
        </Block>
        <div className="mt-4">📧 <b>Send your portfolio or resume to:</b> revanthchowdhary264@gmail.com<br/>🏢 <b>PeakCraft Studios Private Limited</b><br/>🌐 <b>www.peakime.com</b></div>
      </AnimatedSection>

      <AnimatedSection id="community" title="Community / Fan Hub (Coming Soon)">
        <Block>
          Animation is more than what we watch — it’s what connects us. The Peakime Community Hub will soon be your space to share fan art, attend watch parties, and connect with other fans. Stay tuned — the world we’re building is almost here.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="collab" title="Creators & Collaborations">
        <Block>
          At Peakime, we believe that every creator has a story worth telling. Our mission is to help those stories reach audiences across India and beyond — with respect, care, and artistry.
        </Block>
        <Block>
          We’re building a space where independent artists, studios, writers, and animators can collaborate, share ideas, and create together.
        </Block>
        <div className="mt-4">📧 <b>Collaboration Contact:</b> revanthchowdhary264@gmail.com<br/>🏢 <b>PeakCraft Studios Private Limited</b><br/>🌐 <b>www.peakime.com</b></div>
      </AnimatedSection>

      <AnimatedSection id="contact" title="Contact & Partnerships">
        <Block>
          We’re always open to collaborations that help us bring great stories to more people. Whether you’re a studio, investor, or creator, Peakime welcomes partners who share our passion for storytelling and animation.
        </Block>
        <div className="mt-6">
          <ContactForm />
          <div className="mt-6 text-gray-300">
            Or write to us directly: <b>revanthchowdhary264@gmail.com</b>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="press" title="Press & Media">
        <Block>
          Peakime represents a new wave of animation culture in India — introducing licensed anime and donghua to audiences and shaping the foundation for future Indian originals.
        </Block>
        <Block>
          For interviews, press releases, collaborations, or access to official brand materials, contact: 📧 <b>Media Contact:</b> revanthchowdhary264@gmail.com
        </Block>
      </AnimatedSection>

      <AnimatedSection id="privacy" title="Privacy Policy">
        <Block>
          We do not collect unnecessary personal information. Any data shared through contact forms or email communication is used solely to respond to inquiries or provide updates. We never sell or share user data with third parties.
        </Block>
        <Block>
          By using <b>www.peakime.com</b>, you agree to this policy and its terms.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="disclaimer" title="Disclaimer">
        <Block>
          All content featured on Peakime is either owned by <b>PeakCraft Studios Private Limited</b> or used under official license and copyright permission. Unauthorized reproduction or redistribution is prohibited. All trademarks and characters belong to their respective owners.
        </Block>
      </AnimatedSection>

      <AnimatedSection id="terms" title="Terms of Use">
        <ul className="max-w-5xl mx-auto text-left space-y-2 text-gray-300">
          <li>• By using <b>www.peakime.com</b>, you agree to our terms.</li>
          <li>• Content is for personal, non-commercial use only.</li>
          <li>• No unauthorized copying or redistribution of licensed materials.</li>
          <li>• All intellectual property remains with its rightful owner.</li>
          <li>• These terms are governed by Indian law, under the jurisdiction of Chennai, Tamil Nadu.</li>
        </ul>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400 text-sm">
        <p>
          Peakime is owned and operated by <b>PeakCraft Studios Private Limited</b>, an Indian entertainment company dedicated to building the future of animation through licensed content, cultural collaboration, and original storytelling.
        </p>
        <p className="mt-3">© 2025 PeakCraft Studios Private Limited. All Rights Reserved. <br/>Peakime and its logo are trademarks of PeakCraft Studios Pvt. Ltd.</p>
        <p className="mt-3">📧 Email: <b>Support@gmail.com</b> &nbsp;|&nbsp; 🌐 Website: <b>www.peakime.com</b></p>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black px-4 py-3 rounded-full shadow-lg hover:bg-yellow-300"
        aria-label="Back to top"
      >↑</motion.button>
    </div>
  );
}

function AnimatedSection({ id, title, children }) {
  return (
    <section id={id} className="relative overflow-hidden text-center">
      {/* Top separator */}
      <motion.div aria-hidden className="pointer-events-none absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-black to-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.2, once: true }} transition={{ duration: 0.8 }} />

      <motion.div className="py-24 px-6" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.3 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-8 text-center">{title}</h2>
        <div className="max-w-5xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed space-y-6 text-center">
          {children}
        </div>
      </motion.div>

      {/* Bottom separator */}
      <motion.div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.2, once: true }} transition={{ duration: 0.8 }} />

      {/* Ambient vignette */}
      <motion.div className="absolute inset-0 -z-10 opacity-10" initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} transition={{ duration: 1.2 }} style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 100%)" }} />
    </section>
  );
}

function Block({ children }) {
  return <p className="max-w-5xl mx-auto text-gray-300">{children}</p>;
}

function ContactForm() {
  // Mailto fallback (works without backend). Replace with Netlify by adding data-netlify="true" and a hidden input name="form-name"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:revanthchowdhary264@gmail.com?subject=Peakime%20Website%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;

  return (
    <form className="max-w-3xl mx-auto grid grid-cols-1 gap-4 text-left">
      <label className="text-sm text-gray-400">Name
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:border-yellow-400" placeholder="Your name" />
      </label>
      <label className="text-sm text-gray-400">Email
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:border-yellow-400" placeholder="you@example.com" />
      </label>
      <label className="text-sm text-gray-400">Message
        <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="w-full mt-1 bg-black border border-white/20 rounded px-3 py-2 focus:outline-none focus:border-yellow-400" placeholder="Tell us how you'd like to collaborate" />
      </label>
      <div className="flex gap-3 pt-2">
        <a href={mailto} className="bg-yellow-400 text-black px-5 py-3 rounded font-semibold hover:bg-yellow-300">Send</a>
        <a href="#home" className="border border-yellow-400 px-5 py-3 rounded hover:bg-yellow-400/10">Back to Home</a>
      </div>
    </form>
  );
}
