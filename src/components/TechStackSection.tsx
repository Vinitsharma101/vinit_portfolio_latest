import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "@/hooks/useInView";

interface TechCategory {
  name: string;
  techs: { name: string; icon: string }[];
}

const techCategories: TechCategory[] = [
  {
    name: "FRONTEND",
    techs: [
      { name: "React", icon: "⚛" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "TS" },
      { name: "Tailwind", icon: "◐" },
      { name: "Redux", icon: "◈" },
      { name: "HTML5", icon: "◇" },
      { name: "CSS3", icon: "◆" },
    ],
  },
  {
    name: "BACKEND",
    techs: [
      { name: "Node.js", icon: "⬡" },
      { name: "Express", icon: "⊡" },
      { name: "Python", icon: "◎" },
      { name: "REST API", icon: "⇄" },
      { name: "GraphQL", icon: "◈" },
    ],
  },
  {
    name: "DATABASES",
    techs: [
      { name: "MongoDB", icon: "◐" },
      { name: "PostgreSQL", icon: "◑" },
      { name: "MySQL", icon: "◒" },
      { name: "Redis", icon: "◓" },
      { name: "Firebase", icon: "◔" },
    ],
  },
  {
    name: "DEVELOPER TOOLS",
    techs: [
      { name: "Git", icon: "⎇" },
      { name: "Docker", icon: "◳" },
      { name: "AWS", icon: "☁" },
      { name: "VS Code", icon: "◫" },
      { name: "Figma", icon: "◧" },
      { name: "Postman", icon: "◨" },
    ],
  },
];

const TechRow = ({ category, index }: { category: TechCategory; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isActive = isHovered || isTouched;

  const handleTouch = () => {
    setIsTouched(!isTouched);
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouch}
    >
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#3a3a3a]" />
      
      {/* Main row */}
      <div className="py-8 md:py-12 px-6 md:px-12 flex items-center justify-between">
        <h3
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight transition-all duration-500"
          style={{
            color: isActive ? "#ffffff" : "#8a8a8a",
          }}
        >
          {category.name}
        </h3>
        
        <span
          className="text-sm md:text-base tracking-widest transition-all duration-500"
          style={{
            color: isActive ? "#ffffff" : "#5a5a5a",
          }}
        >
          {category.techs.length} TOOLS
        </span>
      </div>

      {/* Tech icons reveal */}
      <div
        className="overflow-hidden transition-all duration-700 ease-out"
        style={{
          maxHeight: isActive ? "120px" : "0px",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="px-6 md:px-12 pb-8 flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
          {category.techs.map((tech, techIndex) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 flex-shrink-0 transition-all duration-500"
              style={{
                transform: isActive 
                  ? `translateX(${Math.min(techIndex * 8, 40)}px)` 
                  : "translateX(-20px)",
                opacity: isActive ? 1 : 0,
                transitionDelay: `${techIndex * 50}ms`,
              }}
            >
              <span className="text-2xl md:text-3xl text-[#6a6a6a]">
                {tech.icon}
              </span>
              <span className="text-sm md:text-base text-[#aaaaaa] whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider for last item */}
      {index === techCategories.length - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3a3a3a]" />
      )}
    </div>
  );
};

export const TechStackSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32"
      style={{ backgroundColor: "#1f1f1f" }}
    >
      {/* Section header */}
      <div className="px-6 md:px-12 mb-12 md:mb-20">
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs tracking-[0.3em] text-[#6a6a6a] uppercase mb-4 block">
            Experiment 05
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#f5f5f5] mb-4">
            The Stack
          </h2>
          <p className="text-[#8a8a8a] max-w-xl text-base md:text-lg">
            Technologies I engineer with. Hover to explore the tools behind the systems.
          </p>
        </div>
      </div>

      {/* Tech rows */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {techCategories.map((category, index) => (
          <TechRow key={category.name} category={category} index={index} />
        ))}
      </div>

      {/* Action button */}
      <div className="px-6 md:px-12 mt-16 md:mt-24">
        <button
          onClick={() => navigate("/skills")}
          className="group relative inline-flex items-center gap-4 text-[#f5f5f5] text-lg md:text-xl tracking-wide transition-all duration-500 hover:gap-6"
        >
          <span className="relative">
            Open the Stack
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#f5f5f5] transition-all duration-500 group-hover:w-full" />
          </span>
          <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </button>
      </div>
    </section>
  );
};
