import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projectPreview1 from "@/assets/project-preview-1.jpg";
import projectPreview2 from "@/assets/project-preview-2.jpg";
import projectPreview3 from "@/assets/project-preview-3.jpg";
import projectPreview4 from "@/assets/project-preview-4.jpg";
import projectPreview5 from "@/assets/project-preview-5.jpg";
import projectPreview6 from "@/assets/project-preview-6.jpg";

const INTERVAL_MS = 3500;

const content = [
  {
    title: "Project Manager Web App",
    description:
      "Built a task and team collaboration platform with real-time React UI, authentication, and REST APIs.",
    image: projectPreview1,
  },
  {
    title: "Live Location Sharing",
    description:
      "Real-time location sharing app using WebSockets with <200ms map marker updates and seamless session management.",
    image: projectPreview2,
  },
  {
    title: "Token Buddy Platform",
    description:
      "Healthcare data visualization platform with monthly team reports, identifying trends for user satisfaction.",
    image: projectPreview3,
  },
  
  
  
];

// Decorative canvas elements
const CanvasElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute -top-6 -right-6 w-32 h-32 border-2 border-foreground/[0.07] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
    <motion.svg
      className="absolute top-[30%] -left-4 w-24 h-48"
      viewBox="0 0 50 100"
    >
      <path
        d="M 40 0 Q 5 25 40 50 Q 75 75 40 100"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.1"
      />
    </motion.svg>
    <div className="absolute top-[15%] right-[8%] w-2 h-2 bg-foreground/10 rounded-full" />
    <div className="absolute top-[65%] left-[5%] w-1.5 h-1.5 bg-foreground/[0.08] rounded-full" />
    <div className="absolute bottom-[20%] right-[12%] w-2 h-2 bg-foreground/[0.06] rounded-full" />
    <div className="absolute top-[45%] -right-2 w-20 h-px bg-foreground/[0.08] rotate-45" />
    <motion.svg
      className="absolute bottom-[15%] left-[3%] w-8 h-16"
      viewBox="0 0 30 60"
    >
      <path d="M 6 10 L 15 19 L 24 10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.1" />
      <path d="M 6 22 L 15 31 L 24 22" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.08" />
      <path d="M 6 34 L 15 43 L 24 34" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.05" />
    </motion.svg>
    <div className="absolute top-[80%] right-[6%]">
      <div className="w-4 h-px bg-foreground/10" />
      <div className="w-px h-4 bg-foreground/10 -mt-2 ml-[7px]" />
    </div>
  </div>
);

export const ProjectsStickyScroll = () => {
  const [activeCard, setActiveCard] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const startProgress = useCallback(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / INTERVAL_MS, 1);
      setProgress(pct);
      if (pct < 1) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
  }, []);

  const stopProgress = useCallback(() => {
    if (progressRef.current) {
      cancelAnimationFrame(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setActiveCard((prev) => (prev + 1) % content.length);
  }, []);

  useEffect(() => {
    startProgress();
    intervalRef.current = setInterval(() => {
      advance();
      startProgress();
    }, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopProgress();
    };
  }, [advance, startProgress, stopProgress]);

  const goTo = (index: number) => {
    setActiveCard(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startProgress();
    intervalRef.current = setInterval(() => {
      advance();
      startProgress();
    }, INTERVAL_MS);
  };

  return (
    <div className="relative">
      <CanvasElements />

      <div className="relative border-2 border-foreground/20 rounded-lg overflow-hidden">
        {/* Faded background text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[800px] md:text-[100px] font-serif opacity-[0.03] pointer-events-none select-none leading-none">
          PROJECTS
        </div>

      <div className="px-5 md:px-8 py-5 flex flex-col justify-between">
        {/* Top: Title + NXT */}
        <div className="flex justify-between items-start gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-sm"
            >
              <span className="text-mono text-muted-foreground text-[10px] tracking-widest uppercase block mb-1">
                Featured Project
              </span>

              <h2 className="text-editorial text-xl md:text-2xl lg:text-3xl mb-2">
                {content[activeCard].title}
              </h2>

              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-xs">
                {content[activeCard].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* NXT */}
          <button
            onClick={() => goTo((activeCard + 1) % content.length)}
            className="hidden md:flex items-center gap-2 group shrink-0 mt-2"
          >
            <span className="text-4xl lg:text-5xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 tracking-tight">
              NXT
            </span>
            <ArrowRight className="w-6 h-6 text-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>

        {/* Image Section */}
        <div className="mt-4 relative">

          {/* Big Image (smaller + balanced) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45 }}
              className="w-full md:w-[55%] h-[170px]  md:h-[350px] rounded-xl overflow-hidden"
            >
              <img
                src={content[activeCard].image}
                alt={content[activeCard].title}
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.9) contrast(1.05)" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Right Corner Controls */}
          <div className="absolute top-0 right-0 flex flex-col items-end gap-3">

            {/* 4 Small Progress Lines */}
            <div className="flex gap-2">
              {content.map((_, index) => (
                <div
                  key={index}
                  className={`h-[3px] w-14 md:w-16 rounded-full transition-all duration-300 ${
                    activeCard === index
                      ? "bg-accent"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-1">
              {content.map((item, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-14 h-10 md:w-16 md:h-11 rounded-md overflow-hidden transition-all duration-300 ${
                    activeCard === index
                      ? "opacity-100 ring-2 ring-accent"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-foreground/20 px-6 md:px-10 py-4 flex items-center justify-between">
        <span className="text-mono text-muted-foreground text-sm hidden sm:block">
          {content.length} Projects
        </span>

        <Link
          to="/projects"
          className="group inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
        >
          <span className="tracking-wide">View All Projects</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  </div>
);

};
