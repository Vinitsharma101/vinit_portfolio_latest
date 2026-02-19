import { useState, useEffect } from "react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { ExperimentSection } from "@/components/ExperimentSection";
import { ContactSection } from "@/components/ContactSection";

import { FloatingNav } from "@/components/FloatingNav";
import { TechStackSection } from "@/components/TechStackSection";
import { CustomCursor } from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { ExperienceCanvasSection } from "@/components/ExperienceCanvasSectionProps";
import { ProjectsStickyScroll } from "@/components/ProjectsStickyScroll";

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
      <div className="relative z-10">
        {/*  01: Projects - Real World Builds */}
        <div className="sticky  z-[1] top-0">
          <div className="bg-sand">
            <ExperimentSection
              number="01"
              title="Real-World Builds"
              description="Projects that solve problems. Each project represents a unique challenge conquered with code and creativity."
              accent="olive"
              bgVariant="sand"
            >
              <ProjectsStickyScroll />
            </ExperimentSection>
          </div>
        </div>

        
        {/*  02: Tech Stack */}
        <div className="sticky top-0 z-[2]">
          <TechStackSection />
        </div>

        {/*  03: Experience  */}
         <div className="sticky z-[3]">
          <div className="bg-background">
            <ExperienceCanvasSection
              number="03"
              title="System Architecture"
              description="The journey through startups, teams, and real development challenges. Where theory met practice."
            />
          </div>
        </div>
        {/* Contact section */}
        <div className="relative z-[4]">
          <ContactSection />
        </div>{" "}
      </div>
    </div>
  );
};

export default Index;
