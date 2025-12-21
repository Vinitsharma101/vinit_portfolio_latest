import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    year: "2024",
    description: "A scalable marketplace with real-time inventory management and secure payment processing.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    category: "Frontend",
    year: "2024",
    description: "Interactive analytics dashboard transforming complex datasets into intuitive visual narratives.",
    tech: ["Next.js", "D3.js", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    title: "API Gateway System",
    category: "Backend",
    year: "2023",
    description: "Microservices architecture with rate limiting, authentication, and intelligent routing.",
    tech: ["Go", "Redis", "Docker", "Kubernetes"],
  },
  {
    id: 4,
    title: "Real-time Collaboration Tool",
    category: "Full Stack",
    year: "2023",
    description: "WebSocket-powered workspace enabling seamless team synchronization and document editing.",
    tech: ["React", "Socket.io", "MongoDB", "AWS"],
  },
];

export const ProjectsHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll controls */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => scroll("left")}
          className="p-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div ref={scrollRef} className="horizontal-scroll">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[350px] md:w-[450px] experiment-card group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Project number */}
            <span className="text-mono text-muted-foreground mb-4 block">
              {String(project.id).padStart(2, "0")}
            </span>

            {/* Project info */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs uppercase tracking-wider text-accent">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground">{project.year}</span>
            </div>

            <h3 className="text-2xl text-editorial mb-4 group-hover:text-rust transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* View project link */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <span className="line-reveal">View Project</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-mono text-muted-foreground text-center mt-8 md:hidden">
        ← Swipe to explore →
      </p>
    </div>
  );
};
