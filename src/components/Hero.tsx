import { ChevronDown, Download, Github, Linkedin } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { LogoMarquee } from "./LogoMarquee";
import HangingCard from "./HangingCard";

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
      setMousePixelPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="fixed inset-0 h-screen w-full flex flex-col justify-between p-8 md:p-16 bg-background z-0 overflow-hidden"
    >
      {/* Interactive grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Hover reveal grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${mousePixelPos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Top navigation hint */}
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <p className="text-mono text-muted-foreground">Chandigarh University</p>
          <p className="text-sm text-muted-foreground">2022 — 2026</p>
        </div>
      </div>

      {/* Main editorial typography layout */}
      <div 
        className="flex-1 flex items-center justify-center relative z-10"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: 1 - scrollY / (window.innerHeight * 0.8),
        }}
      >
        <div className="relative w-full max-w-7xl mx-auto">
          
          {/* Background "DEVELOPER" text - massive, behind everything */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{
              transform: `translateX(${mousePos.x * 3}px)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            <span 
              className="text-[12vw] md:text-[14vw] lg:text-[16vw] font-serif font-normal tracking-tighter text-foreground/[0.04] whitespace-nowrap"
              style={{ 
                lineHeight: 0.85,
              }}
            >
              DEVELOPER
            </span>
          </div>

          {/* Secondary layer - "FULLSTACK" text */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              transform: `translate(-50%, -50%) translateX(${mousePos.x * 5}px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <span className="text-mono text-muted-foreground/60 tracking-[0.5em] text-sm md:text-base">
              FULLSTACK
            </span>
          </div>

          {/* Main name - dominant visual element */}
          <div className="relative z-10 text-center">
            <div className="overflow-hidden">
              <p 
                className="text-mono text-muted-foreground tracking-[0.3em] text-xs md:text-sm mb-4 animate-fade-up"
              >
                PORTFOLIO
              </p>
            </div>
            
            <div className="overflow-hidden">
              <h1 
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif font-normal tracking-tighter text-foreground animate-fade-up leading-[0.85]"
                style={{
                  transform: `translateX(${mousePos.x * 8}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                VINIT
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <h1 
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif font-normal tracking-tighter text-foreground animate-fade-up-delay-1 leading-[0.85]"
                style={{
                  transform: `translateX(${mousePos.x * -6}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                SHARMA
              </h1>
            </div>

            {/* Tags below name */}
            <div className="flex justify-center gap-4 mt-8 animate-fade-up-delay-2">
              <span className="text-xs px-3 py-1.5 border border-border text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default">
                B.E. Computer Science
              </span>
              <span className="text-xs px-3 py-1.5 border border-accent/30 text-accent hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default">
                Available for projects
              </span>
            </div>
          </div>

          {/* Hanging Card - positioned to overlap the typography */}
          <div 
            className="absolute top-1/2 right-0 md:right-[5%] lg:right-[10%] -translate-y-1/2 z-20 animate-fade-up-delay-2"
            style={{
              transform: `translateY(-50%) rotate(-2deg)`,
            }}
          >
            <HangingCard />
          </div>
        </div>
      </div>

      {/* Bottom navigation hint */}
      <div className="flex justify-between items-end relative z-10">
        <div className="flex gap-3 animate-fade-up-delay-2">
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Resume</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sharma-vinit101/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="https://github.com/Vinitsharma101"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>

        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-2 animate-fade-up-delay-3"
        >
          <span className="text-mono text-muted-foreground group-hover:text-foreground transition-colors">
            Begin Journey
          </span>
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground animate-float transition-colors" />
        </button>

        <span className="text-mono text-muted-foreground animate-fade-up-delay-2">
          Scroll to explore
        </span>
      </div>

      {/* Logo Marquee */}
      <LogoMarquee />
    </section>
  );
};