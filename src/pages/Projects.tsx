import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ContactSection } from "@/components/ContactSection";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  links?: {
    live?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "TeamSphere - Project Manager",
    category: "Full Stack",
    year: "2024",
    description: "Built a task and team collaboration platform with real-time React UI, authentication, and REST APIs.",
    longDescription: "A comprehensive project management solution designed for teams to collaborate effectively. Features include real-time updates, task assignments, progress tracking, and team communication tools.",
    tech: ["React", "Node.js", "Express.js", "FastAPI", "SQL", "Tailwind CSS"],
    features: ["Real-time collaboration", "Task management", "Team dashboards", "Authentication system"],
    links: {
      live: "https://teamsphere.vercel.app/",
      github: "https://github.com/Vinitsharma101/teamsphere-ProMnager",
    },
  },
  {
    id: 2,
    title: "LocateMe - Live Location Sharing",
    category: "Real-time Systems",
    year: "2024",
    description: "Developed a real-time location sharing app using WebSockets with <200ms map marker updates and seamless session management.",
    longDescription: "A high-performance location sharing application that enables users to share their live location with minimal latency. Built with WebSocket technology for instant updates and interactive map visualization.",
    tech: ["WebSockets", "Leaflet.js", "Node.js", "Real-time UI"],
    features: ["Sub-200ms updates", "Interactive maps", "Session management", "Multi-user support"],
    links: {
      live: "https://locatemee.vercel.app/",
      github: "https://github.com/Vinitsharma101/realtime-locationsharing",
    },
  },
  {
    id: 3,
    title: "Token Buddy Platform",
    category: "Healthcare Tech",
    year: "2025",
    description: "Healthcare data visualization platform with monthly team reports, identifying trends that led to 15% improvement in user satisfaction.",
    longDescription: "An analytics-driven healthcare platform that transforms raw data into actionable insights. Provides comprehensive reporting and trend analysis to improve patient care and operational efficiency.",
    tech: ["React", "Data Visualization", "Analytics", "Node.js"],
    features: ["Data visualization", "Trend analysis", "Monthly reports", "Performance metrics"],
    links: {
      live: "https://tokenbuddy.in/",
    },
  },
  {
    id: 4,
    title: "NLP & Web Scraping Tools",
    category: "Data Engineering",
    year: "2024",
    description: "Built tools for extracting, cleaning, and analyzing web-based textual data using natural language processing techniques.",
    longDescription: "A suite of data engineering tools designed to extract, process, and analyze textual data from web sources. Leverages NLP techniques for sentiment analysis, entity extraction, and text classification.",
    tech: ["Python", "NLP", "Web Scraping", "Data Analysis"],
    features: ["Text extraction", "Data cleaning", "Sentiment analysis", "Entity recognition"],
  },
  {
    id: 5,
    title: "Portfolio Website",
    category: "Frontend",
    year: "2025",
    description: "A creative portfolio showcasing projects and skills with smooth animations and interactive elements.",
    longDescription: "This very portfolio you're viewing — built with React and modern web technologies. Features parallax effects, smooth scrolling, and a unique editorial design aesthetic.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Parallax effects", "Responsive design", "Interactive UI", "Performance optimized"],
    links: {
      live: "https://vntdev.vercel.app/",
    },
  },
  {
    id: 6,
    title: "Projecttory - Find Your Team",
    category: "Social Platform",
    year: "2025",
    description: "A global platform connecting peers to find teammates for projects, featuring project creation and join requests.",
    longDescription: "A collaborative platform designed to connect developers, designers, and creators worldwide. Users can create projects, discover teammates with matching skills, and send join requests to collaborate on exciting ideas globally.",
    tech: ["React", "Node.js", "MongoDB", "Real-time Notifications"],
    features: ["Global teammate matching", "Project creation", "Join requests", "Skill-based search"],
    links: {
      live: "https://projecttory.vercel.app/",
      github: "https://github.com/Vinitsharma101/Projectory",
    },
  },
  {
    id: 7,
    title: "Chattriix - Desktop Chat App",
    category: "Communication",
    year: "2025",
    description: "A modern chat application with desktop-inspired UI, featuring real-time messaging and sleek design.",
    longDescription: "A beautifully designed chat application that brings the desktop messaging experience to the web. Features real-time communication, modern UI patterns, and seamless user interactions for an engaging chat experience.",
    tech: ["React", "WebSockets", "Tailwind CSS", "Real-time Messaging"],
    features: ["Desktop UI design", "Real-time messaging", "Modern interface", "Responsive layout"],
    links: {
      live: "https://chattriix.vercel.app/",
      github: "https://github.com/Vinitsharma101/realtime-chat-webapp-",
    },
  },
];

// Floating decorative elements that move on scroll
const FloatingElements = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large circle outline */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[15%] right-[10%] w-64 h-64 border border-border/20 rounded-full"
      />
      
      {/* Dotted arc path */}
      <motion.svg
        style={{ y: y2 }}
        className="absolute top-[40%] left-[5%] w-96 h-96 opacity-10"
        viewBox="0 0 200 200"
      >
        <path
          d="M 20 100 Q 100 20 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="text-foreground"
        />
      </motion.svg>

      {/* Rotated square */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute top-[60%] right-[15%] w-32 h-32 border border-border/15 rotate-45"
      />

      {/* Small decorative circles */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[25%] left-[20%] w-3 h-3 bg-accent/20 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[70%] left-[25%] w-2 h-2 bg-rust/20 rounded-full"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[45%] right-[25%] w-4 h-4 border border-accent/20 rounded-full"
      />

      {/* Curved dashed line */}
      <motion.svg
        style={{ y: y1 }}
        className="absolute top-[80%] right-[30%] w-64 h-32 opacity-10"
        viewBox="0 0 200 100"
      >
        <path
          d="M 0 80 Q 50 20 100 50 T 200 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          className="text-foreground"
        />
      </motion.svg>

      {/* Vertical dotted line */}
      <motion.div
        style={{ 
          y: y2,
          backgroundImage: 'repeating-linear-gradient(to bottom, hsl(var(--border)) 0px, hsl(var(--border)) 4px, transparent 4px, transparent 10px)',
        }}
        className="absolute top-[10%] left-[50%] h-48 w-px"
      />

      {/* Geometric outline shapes */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[35%] left-[8%] w-20 h-20 border border-border/10"
      />
      
      {/* Horizontal guide line */}
      <motion.div
        style={{ 
          y: y1,
          backgroundImage: 'repeating-linear-gradient(to right, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 20px, transparent 20px, transparent 40px)',
        }}
        className="absolute top-[55%] left-0 right-0 h-px opacity-5"
      />
    </div>
  );
};

// Editorial project entry component
const ProjectEntry = ({ 
  project, 
  index,
}: { 
  project: Project; 
  index: number;
}) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(entryRef, { threshold: 0.1 });
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Alternate layout for visual variety
  const isEven = index % 2 === 0;
  const offsetClass = isEven ? "md:ml-0" : "md:ml-auto";
  const alignClass = isEven ? "md:text-left" : "md:text-right";

  return (
    <motion.div
      ref={entryRef}
      style={{ y, opacity }}
      className={`relative max-w-4xl ${offsetClass} mb-32 md:mb-48`}
    >
      {/* Project number - positioned as decorative element */}
      <span 
        className={`absolute -top-8 ${isEven ? 'left-0 md:-left-16' : 'right-0 md:-right-16'} text-[120px] md:text-[180px] font-serif text-border/20 leading-none select-none pointer-events-none`}
      >
        {String(project.id).padStart(2, "0")}
      </span>

      <div className={`relative z-10 space-y-6 ${alignClass}`}>
        {/* Category and year - subtle metadata */}
        <div className={`flex items-center gap-4 ${isEven ? '' : 'md:justify-end'}`}>
          <span className="text-xs uppercase tracking-[0.25em] text-accent">
            {project.category}
          </span>
          <span className="w-8 h-px bg-border" />
          <span className="text-xs text-muted-foreground tracking-wider">
            {project.year}
          </span>
        </div>

        {/* Title - editorial and bold */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-editorial leading-[1.1] group">
          <a 
            href={project.links?.live || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block hover:text-rust transition-colors duration-500"
          >
            {project.title}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-rust group-hover:w-full transition-all duration-500" />
          </a>
        </h2>

        {/* Description */}
        <p className={`text-lg text-muted-foreground leading-relaxed max-w-2xl ${isEven ? '' : 'md:ml-auto'}`}>
          {project.longDescription}
        </p>

        {/* Tech stack - minimal tags */}
        <div className={`flex flex-wrap gap-3 pt-2 ${isEven ? '' : 'md:justify-end'}`}>
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs tracking-wide text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links - refined and minimal */}
        <div className={`flex items-center gap-6 pt-4 ${isEven ? '' : 'md:justify-end'}`}>
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm text-foreground"
            >
              <Globe className="w-4 h-4" />
              <span className="relative">
                View Live
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="relative">
                Source
                <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useInView(headerRef, { threshold: 0.1 });
  const { scrollYProgress } = useScroll();
  
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs tracking-wider uppercase">Back</span>
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase text-white/50">Archive</span>
        </div>
      </header>

      {/* Hero section - editorial masthead */}
      <motion.section 
        ref={headerRef}
        style={{ y: headerY, opacity: headerOpacity }}
        className="pt-32 pb-24 md:pt-40 md:pb-32 px-8 max-w-7xl mx-auto relative z-10"
      >
        <div className={`transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-end gap-4 mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Selected Works</span>
            <span className="flex-1 h-px bg-border/50 max-w-[200px]" />
            <span className="text-xs text-muted-foreground">2024—2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-editorial mb-8 leading-[0.9]">
            Projects
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-light">
            A curated archive of experiments, systems, and interfaces.
          </p>
        </div>
      </motion.section>

      {/* Projects canvas - editorial layout */}
      <section className="px-8 md:px-12 lg:px-16 pb-32 max-w-7xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <ProjectEntry 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </section>

      {/* End marker */}
      <div className="flex items-center justify-center py-24 relative z-10">
        <div className="flex items-center gap-6">
          <span className="w-12 h-px bg-border" />
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">End of Archive</span>
          <span className="w-12 h-px bg-border" />
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Projects;
