import { useState, useEffect } from "react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { ExperimentSection } from "@/components/ExperimentSection";
import { ProjectsHorizontalScroll } from "@/components/ProjectsHorizontalScroll";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingNav } from "@/components/FloatingNav";
import { TechStackSection } from "@/components/TechStackSection";
import { CustomCursor } from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [showLoading, setShowLoading] = useState(() => {
    // Only show loading if it hasn't been shown this session
    return !sessionStorage.getItem("terminal-loaded");
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem("terminal-loaded", "true");
    setShowLoading(false);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoading]);

  return (
    <div className="relative">
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Floating navigation */}
      <FloatingNav />

      {/* Experiment 01 - Fixed behind Hero, revealed through split */}
      <div className="fixed inset-0 z-0">
        <ExperimentSection
          number="01"
          title="Real-World Builds"
          description="Projects that solve problems. Each experiment represents a unique challenge conquered with code and creativity."
          accent="olive"
        >
          <ProjectsHorizontalScroll />
        </ExperimentSection>
      </div>

      {/* Hero with split reveal on top */}
      <Hero />

      {/* Spacer for Hero + Experiment 01 reveal */}
      <div className="h-[200vh]" />

      {/* Content that follows after reveal */}
      <div className="relative z-10 bg-background">

        {/* Experiment 02: Tech Stack */}
        <TechStackSection />

        {/* Experiment 03: Experience - System Architecture */}
        <ExperimentSection
          number="03"
          title="System Architecture"
          description="The journey through startups, teams, and real development challenges. Where theory met practice."
          accent="clay"
          slideFrom="right"
        >
          <ExperienceSection />
        </ExperimentSection>

        {/* Contact section */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
