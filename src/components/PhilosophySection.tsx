import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const principles = [
  {
    number: "01",
    title: "Systems Over Styles",
    description:
      "Great products emerge from well-designed systems. I build scalable architectures that evolve with your needs.",
  },
  {
    number: "02",
    title: "Clarity Through Simplicity",
    description:
      "Complex problems deserve simple solutions. Every line of code should earn its place.",
  },
  {
    number: "03",
    title: "Performance Is UX",
    description:
      "Speed isn't a feature—it's the foundation. <200ms response times respect your users' time.",
  },
  {
    number: "04",
    title: "Design Is Engineering",
    description:
      "Beautiful interfaces require beautiful code. Form and function are inseparable.",
  },
];

export const PhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
      {/* Cursor-following gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--accent) / 0.15), transparent 40%)`,
        }}
      />

      {principles.map((principle, index) => (
        <div
          key={principle.number}
          className={`py-8 border-t border-border transition-all duration-700 cursor-pointer relative ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ 
            transitionDelay: `${index * 100}ms`,
            transform: isInView 
              ? `translateY(0) ${hoveredIndex === index ? "translateX(8px)" : "translateX(0)"}` 
              : "translateY(32px)",
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span 
            className={`text-mono block mb-4 transition-colors duration-300 ${
              hoveredIndex === index ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {principle.number}
          </span>
          <h3 
            className={`text-2xl text-editorial mb-3 transition-colors duration-300 ${
              hoveredIndex === index ? "text-rust" : ""
            }`}
          >
            {principle.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {principle.description}
          </p>
          
          {/* Hover indicator */}
          <div 
            className={`absolute left-0 top-0 w-1 h-full bg-accent transition-all duration-300 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
};
