import { useState, useEffect } from "react";

interface Skill {
  name: string;
  category: string;
  level: number;
  description: string;
}

const skills: Skill[] = [
  { name: "React.js", category: "Frontend", level: 92, description: "Building complex, performant UIs with modern React patterns and hooks" },
  { name: "Next.js", category: "Framework", level: 88, description: "Full-stack React framework for production-ready applications" },
  { name: "Node.js", category: "Backend", level: 90, description: "Server-side JavaScript for scalable RESTful API development" },
  { name: "Express.js", category: "Backend", level: 88, description: "Fast, unopinionated web framework for Node.js applications" },
  { name: "React Native", category: "Mobile", level: 80, description: "Cross-platform mobile app development with native performance" },
  { name: "JavaScript", category: "Language", level: 95, description: "Modern ES6+ JavaScript for full-stack web development" },
  { name: "Python", category: "Language", level: 78, description: "Data processing, NLP, and backend scripting" },
  { name: "C/C++", category: "Language", level: 75, description: "Systems programming and algorithmic problem solving" },
  { name: "MongoDB", category: "Database", level: 85, description: "NoSQL database for flexible, scalable data storage" },
  { name: "MySQL", category: "Database", level: 82, description: "Relational database design and SQL optimization" },
  { name: "Firebase", category: "Cloud", level: 85, description: "Real-time database, authentication, and cloud functions" },
  { name: "Git", category: "Tools", level: 88, description: "Version control and collaborative development workflows" },
];

export const SkillsExperiment = () => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="grid md:grid-cols-2 gap-12 relative">
      {/* Cursor follower when skill is active */}
      {activeSkill && (
        <div 
          className="fixed w-4 h-4 bg-accent/30 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out mix-blend-difference"
          style={{
            left: mousePos.x - 8,
            top: mousePos.y - 8,
            transform: "scale(3)",
          }}
        />
      )}

      {/* Skills list */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group cursor-pointer"
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
            style={{
              transform: activeSkill?.name === skill.name ? "translateX(8px)" : "translateX(0)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span 
                className="text-lg transition-all duration-300"
                style={{
                  color: activeSkill?.name === skill.name ? "hsl(var(--rust))" : undefined,
                }}
              >
                {skill.name}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {skill.category}
              </span>
            </div>
            <div className="h-[2px] bg-border overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-700 ease-out"
                style={{
                  width: activeSkill?.name === skill.name ? `${skill.level}%` : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Active skill detail */}
      <div className="flex flex-col justify-center sticky top-32">
        <div
          className={`transition-all duration-500 ${
            activeSkill ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {activeSkill ? (
            <>
              <span className="text-mono text-accent block mb-2">
                {activeSkill.category}
              </span>
              <h3 className="text-3xl text-editorial mb-4">{activeSkill.name}</h3>
              <p className="text-muted-foreground mb-6">{activeSkill.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-serif text-rust">{activeSkill.level}</span>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Proficiency</span>
                  <span className="text-xs text-muted-foreground/60">out of 100</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">
              <p className="text-mono mb-2">Hover over a skill</p>
              <p className="text-sm">to explore capabilities</p>
              <div className="mt-8 w-16 h-16 border border-border/50 animate-pulse" />
            </div>
          )}
        </div>

        {/* Category legend */}
        <div className="mt-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs px-3 py-1.5 border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-default"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
