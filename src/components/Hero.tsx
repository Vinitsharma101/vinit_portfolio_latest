import { ChevronDown, Download, Github, Linkedin ,Menu, X} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { LogoMarquee } from "./LogoMarquee";
import HangingCard from "./HangingCard";

import CircularText from "./CircularText";

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });




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

  return (
    <section 
      ref={sectionRef}
      className="fixed inset-0 h-screen w-full flex flex-col justify-between p-8 md:p-16 bg-background z-0 overflow-hidden select-none"
    >
      {/* Interactive grid background */}
      <div 
        className="absolute inset-0 "
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.05) 3px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Hover reveal grid overlay */}
      <div 
        className="absolute inset-0  transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.20) 2px, transparent 2px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.20) 2px, transparent 2px)
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
        <div className="relative w-full max-w-8xl mx-auto ">          

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
            
            <div className="overflow-hidden relative ">
              <h1 
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif font-normal tracking-tighter text-foreground animate-fade-up-delay-1 leading-[0.85] "
                style={{
                  transform: `translateX(${mousePos.x * -6}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                SHARMA
              </h1>
            </div>

            {/* Tags below name */}
            <div className="flex gap-4 mt-8 animate-fade-up-delay-2 justify-center ml-[40vh] pointer-events-auto">
              <span className="text-xs px-3 py-1.5 border border-border text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default select-none">
                B.E. Computer Science
              </span>
              <span className="text-xs px-3 py-1.5 border border-accent/30 text-accent hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 cursor-default">
                Available for projects
              </span>
            </div>
          </div>

          {/* Hanging Card - positioned to overlap the typography */}
          
          <div 
            className="absolute top-1/2 right-0 md:right-[5%] lg:right-[18%] -translate-y-1/2 z-20 animate-fade-up-delay-2 pointer-events-auto"
            style={{
              transform: `translateY(-50%) rotate(-2deg)`,
            }}
          >
            <HangingCard />
          </div>
        </div>

        <div><div 
            className=" bottom-32 absolute left-2 select-none"
            style={{
              transform: `translateX(${mousePos.x * 9}px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <span className=" text-muted-foreground/60 tracking-[0.5em] text-[4vw] md:text-[2vw] lg:text-[1vw]">
              FULLSTACK
            </span>
          </div>
        
        <div 
            className="absolute bottom-2 left-0     select-none overflow-hidden"
            style={{
              transform: `translateX(${mousePos.x * 9}px)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            <span 
              className="text-[8vw] md:text-[8vw] lg:text-[8vw] font-serif font-normal tracking-tighter text-foreground/[0.2] whitespace-nowrap"
              style={{ 
          lineHeight: 0.85,
              }}
            >
              DEVELOPER
            </span>
          </div></div>
      </div>

      {/* Bottom navigation hint */}
      <div className="flex justify-between items-end relative z-10 pointer-events-auto">
        <div className="hidden md:flex gap-3 animate-fade-up-delay-2 ">
          <a
            href="/VinitResume.pdf"
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
          </a>
          <a
            href="https://github.com/Vinitsharma101"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        <div className="md:hidden animate-fade-up-delay-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu popup */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden absolute bottom-16 left-0 bg-background border border-border shadow-lg animate-fade-in z-50">
            <div className="flex flex-col">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Resume</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sharma-vinit101/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-300 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/Vinitsharma101"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        )}
        <div
          
          className="relative w-full h-full top-20"
        >
          <img
            src="/st.png"
            className="w-52 h-32 animate-fade-up-delay-2 cursor-grab active:cursor-grabbing"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              userSelect: "none",
            }}
            draggable="false"
          />
        </div>

        <span className="hidden lg:block">
          <CircularText
            text="Full-StackDev*App-Dev*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class border border-black     "
          />
        </span>

        
      </div>

      {/* Logo Marquee */}
      <LogoMarquee />
    </section>
  );
};