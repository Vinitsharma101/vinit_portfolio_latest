import { ChevronDown, Download, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import profileImage from "@/assets/profile-image.png";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
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
      className="fixed inset-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 lg:p-16 bg-white z-0 overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex justify-between items-start relative z-20">
        <div className="space-y-0.5">
          <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">Chandigarh University</p>
          <p className="text-xs text-neutral-400">2022 — 2026</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-3 py-1.5 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <Download className="w-3 h-3" />
            <span className="text-xs">Resume</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sharma-vinit101/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <Linkedin className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/Vinitsharma101"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            <Github className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main typography-driven layout */}
      <div 
        className="flex-1 flex items-center justify-center relative"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: 1 - scrollY / (window.innerHeight * 0.8),
        }}
      >
        {/* Typography composition */}
        <div className="relative w-full max-w-6xl mx-auto">
          
          {/* FULLSTACK - small, above name */}
          <div className="absolute -top-8 md:-top-12 left-0 md:left-4 z-10">
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-neutral-400 uppercase">
              Fullstack
            </span>
          </div>

          {/* VINIT - Large name, front layer */}
          <div className="relative z-30">
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.04em] text-black">
              VINIT
            </h1>
          </div>

          {/* SHARMA - Large name continuation */}
          <div className="relative z-30 -mt-2 md:-mt-4">
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.04em] text-black">
              SHARMA
            </h1>
          </div>

          {/* DEVELOPER - Very large, BEHIND the card */}
          <div className="absolute bottom-0 md:-bottom-8 lg:-bottom-12 left-0 right-0 z-0 overflow-hidden">
            <span className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black leading-none tracking-[-0.04em] text-neutral-100 select-none">
              DEVELOPER
            </span>
          </div>

          {/* Small egg-shaped card - centered, overlapping DEVELOPER */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div 
              className="relative w-24 h-32 md:w-32 md:h-44 lg:w-36 lg:h-48 overflow-hidden shadow-2xl"
              style={{
                borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img 
                src={profileImage} 
                alt="Vinit Sharma"
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Decorative line */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-10">
            <div className="w-px h-32 bg-neutral-200" />
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-between items-end relative z-20">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
            Creative Developer
          </span>
          <span className="text-[10px] text-neutral-300">
            Available for projects
          </span>
        </div>

        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-[0.2em] text-neutral-400 group-hover:text-black transition-colors uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-black animate-bounce transition-colors" />
        </button>

        <div className="text-right">
          <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
            Based in India
          </span>
        </div>
      </div>
    </section>
  );
};
