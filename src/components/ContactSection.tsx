import { Mail, Phone, ArrowUpRight, Award, BookOpen, MapPin, Calendar, Target } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import TextPressure from "./TextPressure";
import keyboardhandBg from "@/assets/keyboardhand.png";

// ─── Reusable scroll-reveal hook ────────────────────────────────────────────
function useScrollReveal(options?: { threshold?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), options?.delay ?? 0);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Animated wrapper ────────────────────────────────────────────────────────
type Direction = "up" | "left" | "right";

const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) => {
  const { ref, visible } = useScrollReveal({ delay });

  const translate =
    direction === "left"
      ? "translateX(-48px)"
      : direction === "right"
      ? "translateX(48px)"
      : "translateY(40px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : translate,
        transition: `opacity 0.7s ease, transform 0.7s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── Scroll-reveal word-by-word text ────────────────────────────────────────
const ScrollRevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh;
      const end = wh * 0.55;
      const cur = rect.top;
      if (cur >= start) setScrollProgress(0);
      else if (cur <= end) setScrollProgress(1);
      else setScrollProgress(Math.min(Math.max((start - cur) / (start - end), 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const wp = i / words.length;
        const isRevealed = scrollProgress > wp;
        const isRevealing = scrollProgress > wp - 0.1 && scrollProgress <= wp;
        return (
          <span
            key={i}
            className={`inline-block mr-[0.32em] transition-all duration-300 ${
              isRevealed
                ? "opacity-100 text-[#e5e5e5]"
                : isRevealing
                ? "opacity-50 text-[#8a8a8a]"
                : "opacity-20 text-[#4a4a4a]"
            }`}
            style={{
              transitionDelay: `${i * 10}ms`,
              filter: `blur(${isRevealed ? 0 : isRevealing ? 2 : 4}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const certificates = [
  "NLP and Web Scraping",
  "Cloud Computing – NPTEL",
  "Introduction to DBMS",
  "Meta Back-End Developer",
];

const goals = [
  {
    icon: Target,
    title: "Short Term",
    desc: "Land a full-stack role at a product-driven startup where I can own features end-to-end and ship real impact fast.",
  },
  {
    icon: Calendar,
    title: "Long Term",
    desc: "Build and scale products that solve real problems — eventually leading engineering or founding my own venture.",
  },
  {
    icon: MapPin,
    title: "Open To",
    desc: "Remote / hybrid roles, freelance projects, startup collabs. Based in India — open to relocation for the right opportunity.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export const ContactSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { threshold: 0.1 });
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  return (
    <section className="bg-black text-[#f5f5f5] relative overflow-hidden">
      {/* Glow blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.04) 0%, transparent 70%)" }}
      />

      {/* Background image - keyboard hand */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${keyboardhandBg}')`,
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 py-24 relative z-10 space-y-28">

        {/* ── ABOUT ME ───────────────────────────────────────────────────── */}
        <div>
          <Reveal direction="up">
            <span className="text-xs text-[#6a6a6a] tracking-[0.2em] uppercase block mb-6">
              About Me
            </span>
          </Reveal>

          {/* Big opening line */}
          <Reveal direction="up" delay={80}>
            <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#f5f5f5] leading-tight mb-10 max-w-4xl">
              A full-stack developer who gives a damn about the details.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <ScrollRevealText
                text="I'm Vinit — a B.E. graduate who's spent the last few years turning ideas into real, working products. I care about clean code, thoughtful UX, and shipping things that actually hold up in production."
                className="text-lg sm:text-xl leading-relaxed mb-6"
              />
              <ScrollRevealText
                text="Whether it's a full backend API, a pixel-perfect UI, or debugging a gnarly production issue at 2am — I show up, figure it out, and get it done. I thrive on ownership and move fast without breaking things (too badly)."
                className="text-lg sm:text-xl leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-6 justify-center">
              {/* Quick facts */}
              {[
                { label: "Degree", value: "B.E. Computer Engineering" },
                { label: "Based In", value: "India · Open to Relocation" },
                { label: "Experience", value: "Full Stack · React · Node · Databases" },
                { label: "Currently", value: "Open to work — let's talk" },
              ].map(({ label, value }, i) => (
                <Reveal key={label} direction="right" delay={i * 80}>
                  <div className="flex items-start gap-4 border-b border-[#1a1a1a] pb-5">
                    <span className="text-xs text-[#6a6a6a] tracking-widest uppercase w-28 shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-base sm:text-lg text-[#e5e5e5]">{value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHAT I'M LOOKING FOR ────────────────────────────────────────── */}
        <div>
          <Reveal direction="up">
            <span className="text-xs text-[#6a6a6a] tracking-[0.2em] uppercase block mb-6">
              What I'm Looking For
            </span>
          </Reveal>

          <Reveal direction="up" delay={80}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f5] leading-snug mb-12 max-w-3xl">
              I want to build, grow, and eventually lead.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {goals.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} direction="up" delay={i * 120}>
                <div className="group border border-[#1f1f1f] hover:border-terminal/40 p-6 sm:p-8 transition-all duration-300 h-full">
                  <div className="w-10 h-10 border border-[#2a2a2a] group-hover:border-terminal/40 flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#6a6a6a] group-hover:text-terminal transition-colors duration-300" />
                  </div>
                  <p className="text-xs text-terminal/80 tracking-[0.15em] uppercase mb-3">{title}</p>
                  <p className="text-base sm:text-lg text-[#8a8a8a] leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tags */}
          <Reveal direction="up" delay={400}>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Freelance Projects", "Full-time Opportunities", "Startup Collaboration"].map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-4 py-2 border border-terminal/30 text-terminal/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── SOFT SKILLS ─────────────────────────────────────────────────── */}
        <div className="border-t border-[#1a1a1a] pt-16">
          <Reveal direction="up">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-terminal" />
              <span className="text-xs text-[#6a6a6a] tracking-[0.2em] uppercase">Soft Skills</span>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {["Teamwork", "Communication", "Time Management", "Emotional Intelligence", "Problem Solving", "Adaptability"].map(
              (skill, i) => (
                <Reveal key={skill} direction="up" delay={i * 60}>
                  <span className="text-lg sm:text-xl text-[#4a4a4a] hover:text-[#8a8a8a] transition-colors duration-300">
                    {skill}
                  </span>
                </Reveal>
              )
            )}
          </div>
        </div>

        {/* ── CTA HEADING ─────────────────────────────────────────────────── */}
        <div ref={headingRef} className="border-t border-[#1a1a1a] pt-16">
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <TextPressure
              text="Let's Create"
              flex alpha={false} stroke width weight italic={false}
              textColor="#FF4D00" strokeColor="#FF4D00" minFontSize={40}
            />
          </div>
          <div
            className={`transition-all duration-700 delay-150 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <TextPressure
              text="Something Together"
              flex alpha={false} stroke width weight italic
              textColor="#FF4D00" strokeColor="#FF4D00" minFontSize={40}
            />
          </div>
        </div>

        {/* ── GET IN TOUCH + CERTS ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">

          {/* Contact — slides in from left */}
          <div>
            <Reveal direction="left">
              <span className="text-xs text-[#6a6a6a] tracking-[0.2em] uppercase block mb-6">
                Get In Touch
              </span>
            </Reveal>
            <div className="space-y-3">
              <Reveal direction="left" delay={100}>
                <a
                  href="mailto:vinitsharmapc827@gmail.com"
                  className="group flex items-start gap-4 p-5 sm:p-6 border border-[#2a2a2a] hover:border-terminal/50 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-[#6a6a6a] group-hover:text-terminal transition-colors shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs text-[#6a6a6a] block mb-1">Email</span>
                    <span className="text-base sm:text-lg text-[#e5e5e5] break-all">
                      vinitsharmapc827@gmail.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 text-terminal transition-opacity shrink-0" />
                </a>
              </Reveal>

              <Reveal direction="left" delay={200}>
                <a
                  href="tel:+917056101827"
                  className="group flex items-start gap-4 p-5 sm:p-6 border border-[#2a2a2a] hover:border-terminal/50 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-[#6a6a6a] group-hover:text-terminal transition-colors shrink-0" />
                  <div>
                    <span className="text-xs text-[#6a6a6a] block mb-1">Phone</span>
                    <span className="text-base sm:text-lg text-[#e5e5e5]">+91 7056101827</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 text-terminal transition-opacity shrink-0" />
                </a>
              </Reveal>
            </div>
          </div>

          {/* Certs — slides in from right */}
          <div>
            <Reveal direction="right">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-terminal" />
                <span className="text-xs text-[#6a6a6a] tracking-[0.2em] uppercase">
                  Certifications
                </span>
              </div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <div className="p-5 sm:p-6 border border-[#2a2a2a]">
                <p className="text-xs text-[#6a6a6a] mb-4">Click any certificate to view —</p>
                <div className="flex flex-wrap gap-3">
                  {certificates.map((cert, i) => (
                    <div key={cert} className="relative group/cert">
                      <a
                        href="https://drive.google.com/drive/folders/11lhsthi_i6OYYTE0iHhl4VoMuQF5Ttit?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span
                          className={`text-sm px-3 py-2 border transition-all duration-300 cursor-pointer block ${
                            hoveredCert === i
                              ? "border-terminal/50 bg-terminal/10 text-terminal"
                              : "border-[#2a2a2a] text-[#8a8a8a]"
                          }`}
                          onMouseEnter={() => setHoveredCert(i)}
                          onMouseLeave={() => setHoveredCert(null)}
                        >
                          {cert}
                        </span>
                      </a>
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs text-white bg-[#1a1a1a] border border-[#3a3a3a] whitespace-nowrap opacity-0 group-hover/cert:opacity-100 transition-opacity duration-200 pointer-events-none z-10 rounded">
                        Click to open
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#3a3a3a]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <div className="border-t border-terminal/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Reveal direction="up">
            <span className="text-sm text-[#6a6a6a]">© 2025 Vinit Sharma. All rights reserved.</span>
          </Reveal>
          <div className="flex gap-8">
            {[
              { label: "GitHub", href: "https://github.com/Vinitsharma101" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sharma-vinit101/" },
              { label: "Portfolio", href: "https://vntdev.vercel.app/" },
            ].map((link, i) => (
              <Reveal key={link.label} direction="up" delay={i * 80}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6a6a6a] hover:text-terminal transition-colors"
                >
                  {link.label}
                </a>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};