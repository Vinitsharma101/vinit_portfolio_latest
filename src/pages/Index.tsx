import { useState, useEffect } from "react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { ExperimentSection } from "@/components/ExperimentSection";
import { ProjectsHorizontalScroll } from "@/components/ProjectsHorizontalScroll";
import { ContactSection } from "@/components/ContactSection";

import { FloatingNav } from "@/components/FloatingNav";
import { TechStackSection } from "@/components/TechStackSection";
import { CustomCursor } from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { ExperienceCanvasSection } from "@/components/ExperienceCanvasSectionProps";

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
      {/* <CustomCursor /> */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Floating navigation */}
      <FloatingNav />

      {/* Fixed hero section */}
      <Hero />

      {/* Spacer to allow hero to be visible */}
      <div className="h-screen" />

      {/* Content that covers the hero */}
      <div className="relative z-10 bg-background">
        {/* Experiment 01: Projects - Real World Builds */}
        <ExperimentSection
          number="01"
          title="Real-World Builds"
          description="Projects that solve problems. Each experiment represents a unique challenge conquered with code and creativity."
          accent="olive"
          bgVariant="sand"
        >
          <ProjectsHorizontalScroll />
        </ExperimentSection>

        {/* Experiment 02: Tech Stack */}
        <TechStackSection />

        {/* Experiment 03: Experience - System Architecture */}
        <ExperienceCanvasSection
          number="03"
          title="System Architecture"
          description="The journey through startups, teams, and real development challenges. Where theory met practice."
        />

        {/* Contact section */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
