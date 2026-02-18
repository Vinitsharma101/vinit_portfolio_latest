import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import projectPreview1 from "@/assets/project-preview-1.jpg";
import projectPreview2 from "@/assets/project-preview-2.jpg";
import projectPreview3 from "@/assets/project-preview-3.jpg";
import projectPreview4 from "@/assets/project-preview-4.jpg";



const content = [
  {
    title: "Project Manager Web App",
    description:
      "Built a task and team collaboration platform with real-time React UI, authentication, and REST APIs. Features include drag-and-drop task boards, team management, and analytics dashboards powered by React, Node.js, Express.js, and FastAPI.",
    content: (
      <img
        src={projectPreview1}
        alt="Project Manager preview"
        className="w-full h-full object-cover rounded-xl"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
    ),
  },
  {
    title: "Live Location Sharing",
    description:
      "Developed a real-time location sharing app using WebSockets with <200ms map marker updates and seamless session management. Built with Leaflet.js and Node.js for instant geolocation tracking across devices.",
    content: (
      <img
        src={projectPreview2}
        alt="Live Location preview"
        className="w-full h-full object-cover rounded-xl"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
    ),
  },
  {
    title: "Token Buddy Platform",
    description:
      "Healthcare data visualization platform with monthly team reports, identifying trends that led to 15% improvement in user satisfaction. Features rich analytics dashboards and real-time data processing.",
    content: (
      <img
        src={projectPreview3}
        alt="Token Buddy preview"
        className="w-full h-full object-cover rounded-xl"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
    ),
  },
  {
    title: "NLP & Web Scraping Tools",
    description:
      "Built tools for extracting, cleaning, and analyzing web-based textual data using natural language processing techniques. Automates data pipelines with Python, enabling insights from unstructured web content.",
    content: (
      <img
        src={projectPreview4}
        alt="NLP Tools preview"
        className="w-full h-full object-cover rounded-xl"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
    ),
  },
];

// Decorative canvas elements
const CanvasElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Circle outline - top right */}
    <motion.div
      className="absolute -top-6 -right-6 w-32 h-full border-2 border-foreground/[0.07] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />

    {/* Dotted arc - left */}
    <motion.svg
      className="absolute top-[30%] -left-4 w-24 h-48"
      viewBox="0 0 50 100"
    >
      <path
        d="M 40 0 Q 5 25 40 50 Q 75 75 40 100"
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.1"
      />
    </motion.svg>

    {/* Small dots */}
    <div className="absolute top-[15%] right-[8%] w-2 h-2 bg-foreground/10 rounded-full" />
    <div className="absolute top-[65%] left-[5%] w-1.5 h-1.5 bg-foreground/[0.08] rounded-full" />
    <div className="absolute bottom-[20%] right-[12%] w-2 h-2 bg-foreground/[0.06] rounded-full" />

    {/* Diagonal line */}
    <div className="absolute top-[45%] -right-2 w-20 h-px bg-foreground/[0.08] rotate-45" />

    {/* Chevrons - bottom left */}
    <motion.svg
      className="absolute bottom-[15%] left-[3%] w-8 h-16"
      viewBox="0 0 30 60"
    >
      <path d="M 6 10 L 15 19 L 24 10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.1" />
      <path d="M 6 22 L 15 31 L 24 22" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.08" />
      <path d="M 6 34 L 15 43 L 24 34" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" opacity="0.05" />
    </motion.svg>

    {/* Small cross */}
    <div className="absolute top-[80%] right-[6%]">
      <div className="w-4 h-px bg-foreground/10" />
      <div className="w-px h-4 bg-foreground/10 -mt-2 ml-[7px]" />
    </div>
  </div>
);

export const ProjectsStickyScroll = () => {
  return (
    <div className="relative fixed inset-0 max-h-screen">
      <CanvasElements />
      {/* Bordered container */}
      <div className="border-2 border-foreground/20 rounded-xl relative">
        <StickyScroll content={content} />

        {/* Bottom bar with button */}
        <div className="border-t-2 border-foreground/20 px-8 py-5 flex items-center justify-between">
          <span className="text-mono text-muted-foreground hidden sm:block">
            Projects
          </span>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
          >
            <span className="tracking-wide">View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};
