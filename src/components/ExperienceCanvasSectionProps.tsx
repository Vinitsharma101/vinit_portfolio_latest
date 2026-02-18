import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ExperienceSection } from "./ExperienceSection";

interface ExperienceCanvasSectionProps {
  number: string;
  title: string;
  description: string;
}

const FloatingDecorations = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // Parallax transforms for decorative elements
  const circleY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const circleY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const circleY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const circleY4 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const circleX1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const circleX2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const arcRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const arcRotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const dotGroupY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const dotGroupY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const lineX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const lineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <>
      {/* Large circle outline - top right */}
      <motion.div
        style={{ y: circleY1, x: circleX1 }}
        className="absolute -top-20 -right-32 w-64 h-64 rounded-full border border-clay/20 pointer-events-none"
      />

      {/* Smaller filled circle - left side */}
      <motion.div
        style={{ y: circleY2 }}
        className="absolute top-1/4 -left-16 w-32 h-32 rounded-full bg-rust/5 pointer-events-none"
      />

      {/* Arc element - bottom right */}
      <motion.svg
        style={{ rotate: arcRotate }}
        className="absolute bottom-1/4 -right-20 w-48 h-48 pointer-events-none"
        viewBox="0 0 200 200"
      >
      </motion.svg>

      {/* Dotted vertical line - left */}
      <motion.div
        style={{ y: dotGroupY }}
        className="absolute top-1/3 left-8 flex flex-col gap-3 pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent/20"
          />
        ))}
      </motion.div>

      {/* Horizontal dotted line - top */}
      <motion.div
        style={{ x: lineX }}
        className="absolute top-20 right-1/4 flex gap-2 pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-graphite/30"
          />
        ))}
      </motion.div>

      {/* Circle with stroke - mid left */}
      <motion.div
        style={{ y: circleY1 }}
        className="absolute top-1/2 -left-24 w-40 h-40 rounded-full border-2 border-dashed border-clay/10 pointer-events-none"
      />

      {/* Small accent circle - bottom left */}
      <motion.div
        style={{ y: circleY2 }}
        className="absolute bottom-32 left-1/4 w-8 h-8 rounded-full bg-accent/10 pointer-events-none"
      />

      {/* Chevron decorative element - right side */}
      <motion.svg
        style={{ y: dotGroupY }}
        className="absolute top-2/3 -right-8 w-16 h-16 pointer-events-none"
        viewBox="0 0 50 50"
      >
        
      </motion.svg>

      {/* NEW: Large concentric circles - top left */}
      <motion.div
        style={{ y: circleY3, x: circleX2, scale: scaleProgress }}
        className="absolute -top-10 left-1/3 pointer-events-none"
      >
        <div className="w-48 h-48 rounded-full border border-clay/10" />
        <div className="absolute inset-4 rounded-full border border-clay/8" />
        <div className="absolute inset-8 rounded-full border border-clay/6" />
      </motion.div>

      {/* NEW: Diagonal dotted line - top right */}
      <motion.div
        style={{ y: lineY, x: lineX }}
        className="absolute top-40 right-16 flex gap-3 rotate-45 pointer-events-none"
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-rust/15"
          />
        ))}
      </motion.div>

      {/* NEW: Semi-circle arc - left center */}
      <motion.svg
        style={{ rotate: arcRotate2, y: circleY4 }}
        className="absolute top-1/3 left-16 w-32 h-32 pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path
          d="M 10 90 A 40 40 0 0 1 90 90"
          fill="none"
          stroke="hsl(var(--graphite))"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="4 4"
        />
      </motion.svg>

      {/* NEW: Scattered dots cluster - bottom right */}
      <motion.div
        style={{ y: dotGroupY2, x: circleX1 }}
        className="absolute bottom-48 right-1/3 pointer-events-none"
      >
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-4 w-2 h-2 rounded-full bg-accent/15" />
          <div className="absolute top-3 left-12 w-1.5 h-1.5 rounded-full bg-clay/20" />
          <div className="absolute top-8 left-2 w-1 h-1 rounded-full bg-rust/15" />
          <div className="absolute top-6 left-16 w-2.5 h-2.5 rounded-full bg-graphite/10" />
          <div className="absolute top-14 left-8 w-1.5 h-1.5 rounded-full bg-accent/12" />
          <div className="absolute top-12 left-20 w-1 h-1 rounded-full bg-clay/15" />
        </div>
      </motion.div>

      {/* NEW: Vertical line with endpoints - right side */}
      <motion.div
        style={{ y: circleY3 }}
        className="absolute top-1/4 right-24 flex flex-col items-center pointer-events-none"
      >
        <div className="w-2 h-2 rounded-full bg-rust/20" />
        <div className="w-px h-20 bg-gradient-to-b from-rust/20 to-transparent" />
      </motion.div>

      {/* NEW: Cross/plus element - mid section */}
      <motion.div
        style={{ y: dotGroupY, rotate: arcRotate }}
        className="absolute top-2/5 left-1/2 pointer-events-none opacity-150"
      >
        <div className="w-px h-8 bg-graphite absolute left-1/2 -translate-x-1/2" />
        <div className="h-px w-8 bg-graphite absolute top-1/2 -translate-y-1/2" />
      </motion.div>

      {/* NEW: Double arc - bottom center */}
      <motion.svg
        style={{ y: circleY2, scale: scaleProgress }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
        viewBox="0 0 250 100"
      >
        <path
          d="M 20 80 Q 125 20 230 80"
          fill="none"
          stroke="hsl(var(--clay))"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M 40 80 Q 125 35 210 80"
          fill="none"
          stroke="hsl(var(--clay))"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
      </motion.svg>

      {/* NEW: Floating ring - top center */}
      <motion.div
        style={{ y: circleY4, x: circleX2 }}
        className="absolute top-16 left-2/3 w-20 h-20 rounded-full border border-accent/10 pointer-events-none"
      />

      {/* NEW: Horizontal dashed line - mid left */}
      <motion.div
        style={{ x: lineX, y: lineY }}
        className="absolute top-3/5 left-4 w-32 border-t border-dashed border-graphite/15 pointer-events-none"
      />

      {/* NEW: Small circles trail - bottom left */}
      <motion.div
        style={{ y: dotGroupY2 }}
        className="absolute bottom-1/4 left-12 flex gap-4 items-end pointer-events-none"
      >
        <div className="w-3 h-3 rounded-full bg-rust/8" />
        <div className="w-2 h-2 rounded-full bg-rust/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-rust/12" />
        <div className="w-1 h-1 rounded-full bg-rust/15" />
      </motion.div>

      {/* NEW: Quarter circle - right bottom */}
      <motion.svg
        style={{ rotate: arcRotate, y: circleY3 }}
        className="absolute bottom-1/3 -right-12 w-40 h-40 pointer-events-none"
        viewBox="0 0 150 150"
      >
        <path
          d="M 150 0 A 150 150 0 0 1 0 150"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      </motion.svg>
    </>
  );
};

export const ExperienceCanvasSection = ({
  number,
  title,
  description,
}: ExperienceCanvasSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { threshold: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background number
  const bgNumberY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgNumberOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.09, 0]);

  // Header slide-in from right
  const headerX = useTransform(scrollYProgress, [0, 0.15], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Content reveal
  const contentY = useTransform(scrollYProgress, [0.1, 0.25], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-24 md:py-32 px-8 md:px-16 overflow-hidden"
    >
      {/* Large background typography - "03" */}
      <motion.div
        style={{ y: bgNumberY, opacity: bgNumberOpacity }}
        className="absolute -right-20 top-1/4 text-[40vw] font-serif font-bold text-foreground leading-none select-none pointer-events-none"
      >
        03
      </motion.div>

      {/* Secondary background text */}
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.03, 0.2, 0])
        }}
        className="absolute left-10 top-1/3 text-[8vw] font-serif text-foreground leading-none select-none pointer-events-none tracking-widest"
      >
        JOURNEY
      </motion.div>

      {/* Floating decorative elements */}
      <FloatingDecorations scrollYProgress={scrollYProgress} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header with slide-in */}
        <motion.div
          ref={headerRef}
          style={{ x: headerX, opacity: headerOpacity }}
          className="border-l-2 border-l-clay pl-6 mb-16"
        >
          <span className="text-mono text-muted-foreground block mb-2">
            {number}
          </span>
          <h2 className="text-4xl md:text-5xl text-editorial mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-xl">{description}</p>
        </motion.div>

        {/* Content with reveal animation */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative"
        >
          {/* Accent color panel behind content */}
          <div className="absolute -left-4 -top-4 -bottom-4 w-1 bg-gradient-to-b from-clay/0 via-clay/30 to-clay/0 pointer-events-none" />
          
          <ExperienceSection />
        </motion.div>
      </div>

      {/* Bottom decorative arc */}
      <motion.svg
        style={{ 
          opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 0.1]),
          scale: useTransform(scrollYProgress, [0.5, 0.8], [0.9, 1])
        }}
        className="absolute bottom-20 left-1/4 w-96 h-48 pointer-events-none"
        viewBox="0 0 400 200"
      >
        <path
          d="M 0 200 Q 200 0 400 200"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
        />
      </motion.svg>
    </section>
  );
};
