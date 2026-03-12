import { Download, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { LogoMarquee } from "./LogoMarquee";
import CircularText from "./CircularText";
import { AnimatePresence, motion } from "framer-motion";
import scroll from "/st.png";

const images = ["/mypic.jpeg"];

const revealStyles = `
  
  @keyframes a-ltr-before {
    0% { transform: translateX(0); }
    100% { transform: translateX(200%); }
  }
  .reveal-span {
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1.2;
  }
  
  .reveal-span::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 100%; height: 100%;
    background: var(--reveal-bg, #0a0a0a);
    animation: a-ltr-before 2s cubic-bezier(.77,0,.18,1) forwards;
    transform: translateX(0);
  }
  .reveal-span:nth-of-type(1)::before,
  .reveal-span:nth-of-type(1)::after { animation-delay: 3s; }
  .reveal-span:nth-of-type(2)::before,
  .reveal-span:nth-of-type(2)::after { animation-delay: 3.5s; }
  .reveal-span:nth-of-type(3)::before,
  .reveal-span:nth-of-type(3)::after { animation-delay: 3s; }
`;

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Inject reveal animation styles once
  useEffect(() => {
    if (!document.getElementById("reveal-anim-style")) {
      const el = document.createElement("style");
      el.id = "reveal-anim-style";
      el.textContent = revealStyles;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
      setMousePixelPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
  const heroTranslateY = scrollY * -0.08;

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycling = () => {
    if (intervalRef.current) return;
    const showNextImage = () => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setCurrentImage(randomImage);
    };
    showNextImage();
    intervalRef.current = setInterval(showNextImage, 2000);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImage(null);
  };

  return (
    <section
      ref={sectionRef}
      className="fixed inset-0 h-screen w-full flex flex-col bg-background z-0 overflow-hidden select-none"
    >
      {/* Base grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Mouse-reveal grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: `radial-gradient(circle 180px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* ── Top Bar ── */}
      <header className="relative z-20 flex justify-between items-start px-6 sm:px-10 md:px-16 pt-6 md:pt-10">
        <div className="space-y-0.5">
          <p className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">
            Chandigarh University
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 tabular-nums">
            2022 — 2026
          </p>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-2">
          <a
            href="https://drive.google.com/file/d/1SAh062nRIF-QVeHDI-cWMd8poyI0SlTb/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs border border-border text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/sharma-vinit101/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/Vinitsharma101"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 border border-border text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-6 bg-background border border-border shadow-xl z-50 min-w-[160px] animate-fade-in">
            <a
              href="https://drive.google.com/file/d/1SAh062nRIF-QVeHDI-cWMd8poyI0SlTb/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-foreground hover:text-background transition-all duration-200 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
            <a
              href="https://www.linkedin.com/in/sharma-vinit101/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-foreground hover:text-background transition-all duration-200 border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href="https://github.com/Vinitsharma101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-foreground hover:text-background transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main
        className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 sm:px-10 md:px-16"
        style={{
          transform: `translateY(${heroTranslateY}px)`,
          opacity: heroOpacity,
        }}
      >
        {/* Label */}
        <p className="text-[10px] sm:text-xs tracking-[0.4em] text-muted-foreground/70 uppercase mb-5 animate-fade-up">
          Portfolio
        </p>

        {/* Name stack */}
        <div className="overflow-hidden relative">
          <h1
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif font-normal tracking-tighter text-foreground animate-fade-up-delay-1 leading-[0.85]"
            style={{
              transform: `translateX(${mousePos.x * -6}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            VINIT
          </h1>
        </div>

        <div
          className="relative"
          onMouseEnter={startCycling}
          onMouseLeave={stopCycling}
        >
          <h1
            className="block text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] font-serif font-normal tracking-tighter text-foreground animate-fade-up leading-[0.88]"
            style={{
              transform: `translateX(${mousePos.x * 7}px)`,
              transition: "transform 0.35s ease-out",
            }}
          >
            SHARMA
          </h1>

          {/* Floating preview image */}
          <AnimatePresence>
            {currentImage && (
              <motion.div
                key={currentImage}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 w-[200px] md:w-[250px] z-[60] pointer-events-none"
                style={{ right: "-10%", transform: "translateX(60%)" }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={currentImage}
                  alt="Vinit Sharma preview"
                  className="w-full h-auto shadow-2xl rounded-xl"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Bottom Bar ── */}
      <footer className="relative z-10 px-6 sm:px-10 md:px-16 pb-6 md:pb-10 flex justify-between items-end">
        {/* FULLSTACK + ghost DEVELOPER text with reveal animation */}
        <div className="flex flex-col leading-none select-none">
          {/* nth-of-type(1) → delay 0.3s */}
          <span className=" text-[2vw] sm:text-[1vw] md:text-[1vw] tracking-[0.4em] text-muted-foreground/50 uppercase">
            Fullstack
          </span>

          {/* DEVELOPER + IMAGE */}
          <div className="flex items-end gap-4">
            {/* nth-of-type(2) → delay 0.8s */}
            <span
              className="reveal-span text-[9vw] sm:text-[7vw] md:text-[6vw] lg:text-[5vw] font-serif font-normal tracking-tighter text-foreground/[0.3] whitespace-nowrap"
              style={{ lineHeight: 0.9 }}
            >
              DEVELOPER
            </span>

            {/* nth-of-type(3) → delay 1.3s */}
            <img
              src={scroll}
              alt="scroll"
              className=" w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-32 lg:h-24 object-contain"
            />
          </div>
        </div>

        {/* Circular text — desktop only */}
        <span className="hidden lg:block animate-fade-up-delay-2">
          <CircularText
            text="FULL-STACK*APP-DEV*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class border border-black"
          />
        </span>
      </footer>

      {/* Logo Marquee */}
      <LogoMarquee />
    </section>
  );
};