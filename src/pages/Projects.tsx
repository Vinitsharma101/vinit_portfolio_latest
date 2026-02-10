import { Link } from "react-router-dom";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ContactSection } from "@/components/ContactSection";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import projectPreview1 from "@/assets/project-preview-1.jpg";
import projectPreview2 from "@/assets/project-preview-2.jpg";
import projectPreview3 from "@/assets/project-preview-3.jpg";
import projectPreview4 from "@/assets/project-preview-4.jpg";
import projectPreview5 from "@/assets/project-preview-5.jpg";
import projectPreview6 from "@/assets/project-preview-6.jpg";
import projectPreview7 from "@/assets/project-preview-7.jpg";

const projectPreviews: { src: string; aspect: '16:9' | '9:16' }[] = [
  { src: projectPreview1, aspect: '16:9' },
  { src: projectPreview2, aspect: '16:9' },
  { src: projectPreview3, aspect: '16:9' },
  { src: projectPreview4, aspect: '9:16' },
  { src: projectPreview5, aspect: '16:9' },
  { src: projectPreview6, aspect: '16:9' },
  { src: projectPreview7, aspect: '9:16' },
];

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

// Soft accent color palette
const accentColors = {
  peach: '#E8C4B8',
  sage: '#C5D1C0',
  lavender: '#D4CDE4',
  cream: '#F5EBE0',
  sky: '#C8DDE8',
  blush: '#E8D0D0',
  mint: '#D0E5E3',
  sand: '#E5DDD0',
};

// Canvas background with colored regions
const CanvasBackground = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large peach blob - top right */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-20 right-[-10%] w-[500px] h-[600px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div 
          className="w-full h-full rounded-[inherit]"
          style={{ backgroundColor: accentColors.peach, opacity: 0.5 }}
        />
      </motion.div>

      {/* Sage rectangle - left side */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] left-[-5%] w-[300px] h-[400px] -rotate-12"
      >
        <div 
          className="w-full h-full"
          style={{ backgroundColor: accentColors.sage, opacity: 0.4 }}
        />
      </motion.div>

      {/* Lavender circle - mid right */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[35%] right-[5%] w-[250px] h-[250px] rounded-full"
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ backgroundColor: accentColors.lavender, opacity: 0.45 }}
        />
      </motion.div>

      {/* Sky panel - left middle */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[50%] left-[10%] w-[200px] h-[350px] rotate-6"
      >
        <div 
          className="w-full h-full"
          style={{ backgroundColor: accentColors.sky, opacity: 0.35 }}
        />
      </motion.div>

      {/* Blush blob - bottom area */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[65%] right-[15%] w-[400px] h-[300px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
      >
        <div 
          className="w-full h-full rounded-[inherit]"
          style={{ backgroundColor: accentColors.blush, opacity: 0.4 }}
        />
      </motion.div>

      {/* Mint square - bottom left */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[75%] left-[-3%] w-[180px] h-[180px] rotate-45"
      >
        <div 
          className="w-full h-full"
          style={{ backgroundColor: accentColors.mint, opacity: 0.45 }}
        />
      </motion.div>

      {/* Sand stripe - decorative */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[45%] left-[40%] w-[60px] h-[500px] -rotate-12"
      >
        <div 
          className="w-full h-full"
          style={{ backgroundColor: accentColors.sand, opacity: 0.3 }}
        />
      </motion.div>

      {/* Small cream accent */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[85%] right-[35%] w-[150px] h-[150px] rounded-full"
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ backgroundColor: accentColors.cream, opacity: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

// Decorative floating elements
const FloatingElements = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Circle outline */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[18%] right-[12%] w-48 h-48 border-2 border-[#1a1a1a]/10 rounded-full"
      />
      
      {/* Chevrons */}
      <motion.svg
        style={{ y: y2 }}
        className="absolute top-[55%] left-[6%] w-12 h-24"
        viewBox="0 0 40 80"
      >
        <path d="M 8 15 L 20 27 L 32 15" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.15" />
        <path d="M 8 30 L 20 42 L 32 30" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.12" />
        <path d="M 8 45 L 20 57 L 32 45" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.08" />
      </motion.svg>

      {/* Dotted arc */}
      <motion.svg
        style={{ y: y3 }}
        className="absolute top-[40%] right-[8%] w-40 h-80"
        viewBox="0 0 80 160"
      >
        <path
          d="M 60 0 Q 10 40 60 80 Q 110 120 60 160"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.12"
        />
      </motion.svg>

      {/* Small dots */}
      <motion.div style={{ y: y1 }} className="absolute top-[25%] left-[35%] w-2 h-2 bg-[#1a1a1a]/15 rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute top-[60%] left-[28%] w-1.5 h-1.5 bg-[#1a1a1a]/12 rounded-full" />
      <motion.div style={{ y: y3 }} className="absolute top-[72%] right-[22%] w-2 h-2 bg-[#1a1a1a]/10 rounded-full" />

      {/* Diagonal line */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[32%] right-[40%] w-24 h-px bg-[#1a1a1a]/10 rotate-45"
      />
    </div>
  );
};

// Project accent backgrounds - different colors for different projects
const projectAccents = [
  { color: accentColors.peach, position: 'left', rotation: -3 },
  { color: accentColors.sage, position: 'right', rotation: 5 },
  { color: accentColors.lavender, position: 'left', rotation: 2 },
  { color: accentColors.sky, position: 'right', rotation: -4 },
  { color: accentColors.blush, position: 'left', rotation: 6 },
  { color: accentColors.mint, position: 'right', rotation: -2 },
  { color: accentColors.sand, position: 'left', rotation: 4 },
];

// Editorial project entry component
const ProjectEntry = ({ 
  project, 
  index,
}: { 
  project: Project; 
  index: number;
}) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const accentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isEven = index % 2 === 0;
  const offsetClass = isEven ? "md:ml-0" : "md:ml-auto";
  const alignClass = isEven ? "md:text-left" : "md:text-right";
  
  const accent = projectAccents[index % projectAccents.length];
  const preview = projectPreviews[index % projectPreviews.length];
  const imgWidth = preview.aspect === '16:9' ? 'w-[320px] md:w-[420px]' : 'w-[220px] md:w-[280px]';

  return (
    <motion.div
      ref={entryRef}
      style={{ y, opacity }}
      className={`relative max-w-4xl ${offsetClass} mb-32 md:mb-48`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating preview image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${imgWidth} z-[60] pointer-events-none`}
            style={{
              [isEven ? 'right' : 'left']: '-10%',
              transform: 'translateX(' + (isEven ? '60%' : '-60%') + ')',
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={preview.src}
              alt={`${project.title} preview`}
              className="w-full h-auto shadow-2xl"
              style={{ 
                filter: 'saturate(0.9) contrast(1.05)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Colored accent panel behind content */}
      <motion.div
        style={{ y: accentY }}
        className={`absolute ${accent.position === 'left' ? '-left-8 md:-left-16' : '-right-8 md:-right-16'} top-1/2 -translate-y-1/2 w-[120%] h-[85%] -z-10`}
      >
        <div 
          className="w-full h-full"
          style={{ 
            backgroundColor: accent.color, 
            opacity: 0.25,
            transform: `rotate(${accent.rotation}deg)`,
          }}
        />
      </motion.div>

      {/* Project number */}
      <span 
        className={`absolute -top-8 ${isEven ? 'left-0 md:-left-12' : 'right-0 md:-right-12'} text-[100px] md:text-[160px] font-serif text-[#1a1a1a]/[0.06] leading-none select-none pointer-events-none`}
      >
        {String(project.id).padStart(2, "0")}
      </span>

      <div className={`relative z-10 space-y-6 ${alignClass}`}>
        {/* Category badge with color */}
        <div className={`flex items-center gap-4 ${isEven ? '' : 'md:justify-end'}`}>
          <span 
            className="text-xs uppercase tracking-[0.25em] px-3 py-1"
            style={{ backgroundColor: accent.color, opacity: 0.7 }}
          >
            {project.category}
          </span>
          <span className="text-xs text-[#1a1a1a]/40 tracking-wider">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-editorial leading-[1.1] text-[#1a1a1a] group">
          <a 
            href={project.links?.live || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block hover:text-[#1a1a1a]/70 transition-colors duration-500"
          >
            {project.title}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a1a1a] group-hover:w-full transition-all duration-500" />
          </a>
        </h2>

        {/* Description */}
        <p className={`text-lg text-[#1a1a1a]/55 leading-relaxed max-w-2xl ${isEven ? '' : 'md:ml-auto'}`}>
          {project.longDescription}
        </p>

        {/* Tech stack */}
        <div className={`flex flex-wrap gap-3 pt-2 ${isEven ? '' : 'md:justify-end'}`}>
          {project.tech.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              className="text-xs tracking-wide px-2 py-0.5 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
              style={{ 
                backgroundColor: i % 2 === 0 ? `${accent.color}40` : 'transparent',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={`flex items-center gap-6 pt-4 ${isEven ? '' : 'md:justify-end'}`}>
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm text-[#1a1a1a]"
            >
              <Globe className="w-4 h-4" />
              <span className="relative">
                View Live
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1a1a1a] group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="relative">
                Source
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1a1a1a] group-hover/link:w-full transition-all duration-300" />
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: '#FAF8F5' }} // Neutral warm white base
    >
      {/* Canvas colored regions */}
      <CanvasBackground />
      
      {/* Decorative floating elements */}
      <FloatingElements />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs tracking-wider uppercase">Back</span>
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40">Archive</span>
        </div>
      </header>

      {/* Hero section */}
      <motion.section 
        ref={headerRef}
        style={{ y: headerY, opacity: headerOpacity }}
        className="pt-32 pb-24 md:pt-40 md:pb-32 px-8 max-w-7xl mx-auto relative z-10"
      >
        {/* Accent shape behind title */}
        <div 
          className="absolute top-24 left-0 w-[300px] h-[200px] -z-10 -rotate-3"
          style={{ backgroundColor: accentColors.cream, opacity: 0.6 }}
        />
        
        <div className={`transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-end gap-4 mb-8">
            <span 
              className="text-xs tracking-[0.3em] uppercase px-3 py-1"
              style={{ backgroundColor: accentColors.sage, opacity: 0.6 }}
            >
              Selected Works
            </span>
            <span className="flex-1 h-px bg-[#1a1a1a]/15 max-w-[200px]" />
            <span className="text-xs text-[#1a1a1a]/40">2024—2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-editorial mb-8 leading-[0.9] text-[#1a1a1a]">
            Projects
          </h1>
          
          <p className="text-xl md:text-2xl text-[#1a1a1a]/50 max-w-xl leading-relaxed font-light">
            A curated archive of experiments, systems, and interfaces.
          </p>
        </div>
      </motion.section>

      {/* Projects canvas */}
      <section className="px-8 md:px-12 lg:px-16 pb-32 max-w-7xl mx-auto relative z-10">
        {projects.map((project, index) => (
          <ProjectEntry 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </section>

      {/* End marker with accent */}
      <div className="flex items-center justify-center py-24 relative z-10">
        <div 
          className="absolute w-[200px] h-[80px] -z-10"
          style={{ backgroundColor: accentColors.lavender, opacity: 0.3 }}
        />
        <div className="flex items-center gap-6">
          <span className="w-12 h-px bg-[#1a1a1a]/20" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40">End of Archive</span>
          <span className="w-12 h-px bg-[#1a1a1a]/20" />
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Projects;
