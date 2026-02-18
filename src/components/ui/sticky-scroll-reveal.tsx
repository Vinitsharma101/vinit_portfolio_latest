import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 3000;

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
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
      if (pct < 1) {
        progressRef.current = requestAnimationFrame(tick);
      }
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
  }, [content.length]);

  // Auto-rotate
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

  return (
    <div className="relative flex justify-center gap-10 rounded-md py-8">
      {/* Left: text content */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl min-h-[20rem] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h2 className="text-2xl md:text-3xl text-editorial text-foreground">
                {content[activeCard].title}
              </motion.h2>
              <motion.p className="text-base text-muted-foreground max-w-sm mt-4 leading-relaxed">
                {content[activeCard].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-8 w-full max-w-sm">
            <div className="h-[2px] w-full bg-muted-foreground/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {/* Dot indicators */}
            <div className="flex gap-2 mt-3">
              {content.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCard(index);
                    // Reset timer
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    startProgress();
                    intervalRef.current = setInterval(() => {
                      advance();
                      startProgress();
                    }, INTERVAL_MS);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeCard === index
                      ? "bg-foreground scale-125"
                      : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: sticky image */}
      <div
        className={cn(
          "hidden lg:flex items-center justify-center h-72 w-96 rounded-xl overflow-hidden",
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};