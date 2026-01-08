import { ChevronDown, Download, Linkedin } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type HeroProps = {
  /** 0..1 progress controlling the split-open reveal */
  splitProgress?: number;
  /** Optional: force-complete the reveal (used by the CTA) */
  onBeginJourney?: () => void;
};

export const Hero = ({ splitProgress: splitProgressProp = 0, onBeginJourney }: HeroProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixelPos, setMousePixelPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
      setMousePixelPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToContent = () => {
    if (onBeginJourney) return onBeginJourney();
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Calculate split animation progress (0 to 1)
  const splitProgress = Math.min(Math.max(splitProgressProp, 0), 1);
  const splitAmount = splitProgress * 110; // Max movement so both halves fully exit
  const contentOpacity = 1 - splitProgress;

  // Shared background styles
  const backgroundStyles = {
    backgroundImage: `
      linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  };

  // Shared content for both halves
  const renderBackground = (isTop: boolean) => (
    <>
      {/* Base grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={backgroundStyles}
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
          maskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${isTop ? mousePixelPos.y : mousePixelPos.y - window.innerHeight / 2}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePixelPos.x}px ${isTop ? mousePixelPos.y : mousePixelPos.y - window.innerHeight / 2}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Floating geometric elements with parallax */}
      <div 
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-accent/20 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotate(${45 + mousePos.x * 10}deg)`,
          opacity: 0.3 * contentOpacity,
        }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-clay/20 rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          opacity: 0.2 * contentOpacity,
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-rust/5 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotate(${mousePos.x * 20}deg)`,
          opacity: contentOpacity,
        }}
      />
    </>
  );

  return (
    <section 
      ref={sectionRef}
      className="fixed inset-0 h-screen w-full z-10 overflow-hidden pointer-events-none"
      style={{
        pointerEvents: splitProgress < 1 ? 'auto' : 'none',
      }}
    >
      {/* TOP HALF - moves upward */}
      <div 
        className="absolute inset-x-0 top-0 h-1/2 bg-background overflow-hidden will-change-transform"
        style={{
          transform: `translateY(-${splitAmount}%)`,
          clipPath: 'inset(0 0 0 0)',
        }}
      >
        {/* Content positioned as if full screen, clipped to top half */}
        <div className="absolute inset-0 h-[200%]">
          {renderBackground(true)}
          
          {/* Full hero content, only top half visible */}
          <div className="h-1/2 flex flex-col justify-between p-8 md:p-16">
            {/* Top navigation hint */}
            <div className="flex justify-between items-start relative z-10" style={{ opacity: contentOpacity }}>
              <div className="space-y-1">
                <p className="text-mono text-muted-foreground">Chandigarh University</p>
                <p className="text-sm text-muted-foreground">2022 — 2026</p>
              </div>
            </div>

            {/* Center content - positioned to show in top half */}
            <div 
              className="flex-1 flex flex-col justify-end pb-4 max-w-5xl relative z-10"
              style={{ opacity: contentOpacity }}
            >
              <div className="space-y-6">
                <div className="overflow-hidden">
                  <h1 
                    className="text-5xl md:text-7xl lg:text-8xl text-editorial animate-fade-up"
                    style={{
                      transform: `translateX(${mousePos.x * 5}px)`,
                      transition: "transform 0.3s ease-out",
                    }}
                  >
                    Vinit Sharma
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HALF - moves downward */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background overflow-hidden will-change-transform"
        style={{
          transform: `translateY(${splitAmount}%)`,
          clipPath: 'inset(0 0 0 0)',
        }}
      >
        {/* Content positioned as if full screen, clipped to bottom half */}
        <div className="absolute inset-0 h-[200%] -top-full">
          {renderBackground(false)}
          
          {/* Full hero content, only bottom half visible */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col justify-between p-8 md:p-16">
            {/* Center content continuation - tagline */}
            <div 
              className="flex-1 flex flex-col justify-start pt-4 max-w-5xl relative z-10"
              style={{ opacity: contentOpacity }}
            >
              <div className="space-y-6">
                <div className="overflow-hidden">
                  <p 
                    className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up-delay-1 font-sans"
                    style={{
                      transform: `translateX(${mousePos.x * 3}px)`,
                      transition: "transform 0.3s ease-out",
                    }}
                  >
                    Full Stack Developer who doesn't just build websites—
                    <span className="text-foreground"> I design systems and experiences.</span>
                  </p>
                </div>
                <div className="flex gap-4 mt-8 animate-fade-up-delay-2">
                  <span className="text-xs px-3 py-1.5 border border-border text-muted-foreground">
                    B.E. Computer Science
                  </span>
                  <span className="text-xs px-3 py-1.5 border border-accent/30 text-accent">
                    Available for projects
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom navigation hint */}
            <div className="flex justify-between items-end relative z-10" style={{ opacity: contentOpacity }}>
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
          </div>
        </div>
      </div>

      {/* Center split line glow effect */}
      <div 
        className="absolute left-0 right-0 top-1/2 h-px pointer-events-none"
        style={{
          opacity: splitProgress * 0.8,
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.5) 50%, transparent 100%)',
          boxShadow: `0 0 ${20 * splitProgress}px ${10 * splitProgress}px hsl(var(--accent) / 0.3)`,
          transform: 'translateY(-50%)',
        }}
      />
    </section>
  );
};
