import { useState } from "react";

interface Skill {
  name: string;
  category: string;
  level: number;
  description: string;
}

const skills: Skill[] = [
  { name: "React", category: "Frontend", level: 95, description: "Building complex, performant UIs with modern React patterns" },
  { name: "TypeScript", category: "Language", level: 90, description: "Type-safe development for scalable applications" },
  { name: "Node.js", category: "Backend", level: 88, description: "Server-side JavaScript and RESTful API development" },
  { name: "PostgreSQL", category: "Database", level: 85, description: "Relational database design and optimization" },
  { name: "Next.js", category: "Framework", level: 88, description: "Full-stack React framework for production" },
  { name: "Tailwind CSS", category: "Styling", level: 92, description: "Utility-first CSS for rapid UI development" },
  { name: "GraphQL", category: "API", level: 80, description: "Flexible and efficient data querying" },
  { name: "Docker", category: "DevOps", level: 75, description: "Containerization for consistent deployments" },
];

export const SkillsExperiment = () => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Skills list */}
      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group cursor-pointer"
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg group-hover:text-rust transition-colors">
                {skill.name}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
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
      <div className="flex flex-col justify-center">
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
                <span className="text-4xl font-serif">{activeSkill.level}%</span>
                <span className="text-sm text-muted-foreground">Proficiency</span>
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <p className="text-mono">Hover over a skill</p>
              <p className="text-sm mt-2">to explore details</p>
            </div>
          )}
        </div>

        {/* Category legend */}
        <div className="mt-12 flex flex-wrap gap-4">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs px-3 py-1 border border-border text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
