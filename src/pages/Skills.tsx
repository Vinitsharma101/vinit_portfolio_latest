import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TechItem {
  name: string;
  icon: string;
  level: string;
}

interface TechCategory {
  name: string;
  description: string;
  techs: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    name: "FRONTEND",
    description: "Building interfaces that feel alive",
    techs: [
      { name: "React", icon: "⚛", level: "Expert" },
      { name: "Next.js", icon: "▲", level: "Advanced" },
      { name: "TypeScript", icon: "TS", level: "Advanced" },
      { name: "Tailwind CSS", icon: "◐", level: "Expert" },
      { name: "Redux", icon: "◈", level: "Advanced" },
      { name: "Zustand", icon: "◇", level: "Proficient" },
      { name: "Framer Motion", icon: "◆", level: "Advanced" },
      { name: "HTML5", icon: "◇", level: "Expert" },
      { name: "CSS3", icon: "◆", level: "Expert" },
      { name: "SCSS", icon: "◈", level: "Advanced" },
    ],
  },
  {
    name: "BACKEND",
    description: "Engineering the invisible architecture",
    techs: [
      { name: "Node.js", icon: "⬡", level: "Advanced" },
      { name: "Express", icon: "⊡", level: "Advanced" },
      { name: "Python", icon: "◎", level: "Proficient" },
      { name: "REST API", icon: "⇄", level: "Expert" },
      { name: "GraphQL", icon: "◈", level: "Proficient" },
      { name: "Socket.io", icon: "◉", level: "Proficient" },
      { name: "JWT Auth", icon: "◊", level: "Advanced" },
    ],
  },
  {
    name: "DATABASES",
    description: "Where data finds its home",
    techs: [
      { name: "MongoDB", icon: "◐", level: "Advanced" },
      { name: "PostgreSQL", icon: "◑", level: "Proficient" },
      { name: "MySQL", icon: "◒", level: "Proficient" },
      { name: "Redis", icon: "◓", level: "Proficient" },
      { name: "Firebase", icon: "◔", level: "Advanced" },
      { name: "Supabase", icon: "◕", level: "Proficient" },
    ],
  },
  {
    name: "DEVELOPER TOOLS",
    description: "The craftsman's toolkit",
    techs: [
      { name: "Git", icon: "⎇", level: "Expert" },
      { name: "GitHub", icon: "◳", level: "Expert" },
      { name: "Docker", icon: "◳", level: "Proficient" },
      { name: "AWS", icon: "☁", level: "Proficient" },
      { name: "Vercel", icon: "▲", level: "Advanced" },
      { name: "VS Code", icon: "◫", level: "Expert" },
      { name: "Figma", icon: "◧", level: "Advanced" },
      { name: "Postman", icon: "◨", level: "Advanced" },
      { name: "Webpack", icon: "◩", level: "Proficient" },
      { name: "Vite", icon: "⚡", level: "Advanced" },
    ],
  },
];

const HorizontalCategory = ({ category, index }: { category: TechCategory; index: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const progress = scrollLeft / (scrollWidth - clientWidth);
        setScrollProgress(Math.min(progress, 0.85)); // Stop before edge
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="mb-16 md:mb-24">
      {/* Category header */}
      <div className="px-6 md:px-12 mb-8">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-xs tracking-[0.3em] text-[#5a5a5a]">
            0{index + 1}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f5f5f5]">
            {category.name}
          </h2>
        </div>
        <p className="text-[#6a6a6a] text-sm md:text-base italic font-serif">
          {category.description}
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        {/* Progress indicator */}
        <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-[#2a2a2a]">
          <div
            className="h-full bg-[#5a5a5a] transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pt-8 pb-4 px-6 md:px-12 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {category.techs.map((tech, techIndex) => (
            <div
              key={tech.name}
              className="flex-shrink-0 group cursor-pointer"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                transform: `translateX(${scrollProgress * techIndex * 3}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div
                className="w-40 md:w-52 h-32 md:h-40 border border-[#3a3a3a] p-4 md:p-6 flex flex-col justify-between transition-all duration-500"
                style={{
                  backgroundColor: hoveredTech === tech.name ? "#2a2a2a" : "transparent",
                  borderColor: hoveredTech === tech.name ? "#4a4a4a" : "#3a3a3a",
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl md:text-3xl text-[#6a6a6a] transition-colors duration-300 group-hover:text-[#9a9a9a]">
                    {tech.icon}
                  </span>
                  <span
                    className="text-[10px] tracking-widest text-[#5a5a5a] opacity-0 transition-opacity duration-300"
                    style={{ opacity: hoveredTech === tech.name ? 1 : 0 }}
                  >
                    {tech.level.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm md:text-base text-[#aaaaaa] transition-colors duration-300 group-hover:text-[#f5f5f5]">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}

          {/* Spacer to prevent reaching edge */}
          <div className="flex-shrink-0 w-24 md:w-40" />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1f1f1f" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors duration-300"
        >
          <span className="text-xl transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="text-sm tracking-widest uppercase">Back</span>
        </button>

        <span className="text-xs tracking-[0.3em] text-[#5a5a5a] uppercase">
          The Stack
        </span>
      </header>

      {/* Main content */}
      <main className="pt-32 md:pt-40 pb-20">
        {/* Hero */}
        <div className="px-6 md:px-12 mb-20 md:mb-32">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f5f5] mb-6">
            Technical
            <br />
            <span className="text-[#6a6a6a] italic">Palette</span>
          </h1>
          <p className="text-[#8a8a8a] max-w-lg text-base md:text-lg">
            A deeper look into the technologies that power my work. 
            Scroll horizontally through each category to explore.
          </p>
        </div>

        {/* Categories */}
        {techCategories.map((category, index) => (
          <HorizontalCategory key={category.name} category={category} index={index} />
        ))}

        {/* Philosophy note */}
        <div className="px-6 md:px-12 mt-20 md:mt-32 max-w-2xl">
          <div className="border-l border-[#3a3a3a] pl-6 md:pl-8">
            <p className="text-[#6a6a6a] font-serif italic text-lg md:text-xl mb-4">
              "Tools are extensions of thought. I choose technologies that amplify ideas, 
              not complicate them."
            </p>
            <span className="text-[#4a4a4a] text-sm tracking-widest">
              — VINIT SHARMA
            </span>
          </div>
        </div>

        {/* Back button */}
        <div className="px-6 md:px-12 mt-20">
          <button
            onClick={() => navigate("/")}
            className="group relative inline-flex items-center gap-4 text-[#8a8a8a] hover:text-[#f5f5f5] text-lg transition-all duration-500"
          >
            <span className="text-2xl transition-transform duration-500 group-hover:-translate-x-2">
              ←
            </span>
            <span className="relative">
              Return to Journey
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#f5f5f5] transition-all duration-500 group-hover:w-full" />
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Skills;
