import { useRef } from "react";
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
      "Speed isn't a feature—it's the foundation. Fast experiences respect your users' time.",
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

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-16">
      {principles.map((principle, index) => (
        <div
          key={principle.number}
          className={`py-8 border-t border-border transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <span className="text-mono text-muted-foreground block mb-4">
            {principle.number}
          </span>
          <h3 className="text-2xl text-editorial mb-3">{principle.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {principle.description}
          </p>
        </div>
      ))}
    </div>
  );
};
