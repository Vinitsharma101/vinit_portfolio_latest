import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projectPreview1 from "@/assets/project-preview-1.png";
import projectPreview2 from "@/assets/project-preview-2.png";
import projectPreview3 from "@/assets/project-preview-3.png";

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

export const ProjectsStickyScroll = () => {
  const [activeCard, setActiveCard] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null,
  );
  const startTimeRef = useRef<number>(Date.now());

  const startProgress = useCallback(() => {
    startTimeRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed < INTERVAL_MS)
        progressRef.current = requestAnimationFrame(tick);
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
    <div className="border-2 border-foreground/20 rounded-lg overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-foreground/10 shrink-0">
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
          Featured Projects
        </span>
        <button
          onClick={() => goTo((activeCard + 1) % content.length)}
          className="flex items-center gap-1.5 group"
        >
          <span className="text-sm font-bold tracking-widest text-foreground group-hover:text-accent transition-colors duration-300">
            NXT
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>

      {/* Main area */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Image */}
        <div
          className="w-full md:w-[58%] shrink-0 overflow-hidden
                        h-[180px] sm:h-[220px] md:h-auto
                        border-b md:border-b-0 md:border-r border-foreground/10"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCard}
              src={content[activeCard].image}
              alt={content[activeCard].title}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.9) contrast(1.05)" }}
            />
          </AnimatePresence>
        </div>

        {/* Text + controls panel */}
        <div className="flex flex-col justify-between px-4 sm:px-5 py-4 flex-1 min-h-0">
          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-1.5"
            >
              <span className="text-[9px] tracking-widest uppercase text-muted-foreground/60">
                0{activeCard + 1} / 0{content.length}
              </span>
              <h2 className="text-sm sm:text-base md:text-lg font-serif leading-snug text-foreground">
                {content[activeCard].title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {content[activeCard].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails + progress */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Animated progress bars */}
            <div className="flex gap-2">
              {content.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex-1 h-[3px] rounded-full overflow-hidden bg-muted-foreground/20"
                >
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: activeCard === i ? "100%" : "0%" }}
                    transition={
                      activeCard === i
                        ? { duration: INTERVAL_MS / 1000, ease: "linear" }
                        : { duration: 0.2 }
                    }
                  />
                </button>
              ))}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {content.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex-1 h-10 sm:h-12 rounded overflow-hidden transition-all duration-300 ${
                    activeCard === i
                      ? "ring-2 ring-accent opacity-100"
                      : "opacity-35 hover:opacity-60"
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

      {/* Bottom bar */}
      <div className="border-t border-foreground/10 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase hidden sm:block">
          Projects
        </span>
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
        >
          <span className="tracking-wide">View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};
