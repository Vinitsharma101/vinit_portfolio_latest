import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight, Building2, Calendar } from "lucide-react";

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  period: string;
  description: string[];
  isActive?: boolean;
}

const experiences: Experience[] = [
  {
  id: 1,
  role: "Full Stack Developer Intern",
  company: "Token Buddy",
  type: "Startup",
  period: "Dec 2025 - Present",
  description: [
    "Worked on building full stack web application features and dashboard functionality",
    "Implemented secure authentication and managed backend logic for user data",
    "Analyzed user feedback data and contributed to improving overall user experience",
  ],
  isActive: true,
},
{
  id: 2,
  role: "Junior Software Developer Intern",
  company: "L.P. Engineering Works",
  type: "Company",
  period: "Aug 2025 - Jan 2025",
  description: [
    "Assisted in developing and maintaining backend APIs with guidance from senior developers",
    "Worked on testing, debugging, and improving performance of applications",
    "Collaborated with team members and handled database operations using MongoDB and SQL",
  ],
},
  {
    id: 3,
    role: "Training",
    company: "Chandigarh University",
    type: "NLP & Web Scraping",
    period: "Dec 2024 - Jan 2025",
    description: [
      "Completed focused training on natural language processing and web scraping techniques",
      "Built small tools for extracting, cleaning, and analyzing web-based textual data",
    ],
  },
];

export const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
    
      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`relative grid md:grid-cols-2 gap-8 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Timeline dot */}
            <div 
              className={`absolute left-0 md:left-1/2 top-0 w-3 h-3 border-2 bg-background transition-all duration-300 md:-translate-x-1/2 ${
                exp.isActive 
                  ? "border-accent bg-accent" 
                  : hoveredId === exp.id 
                    ? "border-rust" 
                    : "border-border"
              }`}
            />

            {/* Left side - meta */}
            <div className={`pl-8 md:pl-0 md:pr-16 md:justify-self-end md:text-right ${index % 2 === 1 ? "md:order-2 md:pl-16 md:pr-0 md:justify-self-start md:text-left" : ""}`}>
              <div className="flex items-center gap-2 md:justify-end mb-2" style={{ flexDirection: index % 2 === 1 ? "row" : "row-reverse" }}>
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-mono text-muted-foreground">{exp.period}</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end" style={{ flexDirection: index % 2 === 1 ? "row" : "row-reverse" }}>
                <Building2 className="w-3 h-3 text-accent" />
                <span className="text-sm text-accent">{exp.type}</span>
              </div>
            </div>

            {/* Right side - content */}
            <div className={`pl-8 md:pl-16 ${index % 2 === 1 ? "md:order-1 md:pr-16 md:pl-0" : ""}`}>
              <div 
                className={`p-6 border transition-all duration-300 cursor-pointer ${
                  hoveredId === exp.id 
                    ? "border-accent/50 bg-card shadow-lg" 
                    : "border-border/50 bg-transparent"
                }`}
                style={{
                  transform: hoveredId === exp.id ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-editorial mb-1">{exp.role}</h3>
                    <p className="text-foreground font-medium">{exp.company}</p>
                  </div>
                  {exp.isActive && (
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent border border-accent/30">
                      Current
                    </span>
                  )}
                </div>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 flex items-center gap-2 text-sm transition-opacity duration-300 ${hoveredId === exp.id ? "opacity-100" : "opacity-0"}`}>
                  <span className="text-rust">Learn more</span>
                  <ArrowUpRight className="w-3 h-3 text-rust" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
