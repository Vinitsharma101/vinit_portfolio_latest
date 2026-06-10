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
  // Always start as true — loading screen shows by default on every render
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // After mount, check if we've already loaded this session
    if (sessionStorage.getItem("terminal-loaded")) {
      setShowLoading(false);
    }
    // Otherwise stay true — loading screen will call handleLoadingComplete
  }, []);

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

      {/* Hide main content while loading to prevent flash */}
      <div style={{ visibility: showLoading ? "hidden" : "visible" }}>
        <CustomCursor />
        <ScrollProgress />
        <FloatingNav />
        <Hero />
        <div className="h-screen" />

        <div className="relative z-10">
          <div className="z-[1]">
            <div className="bg-sand">
              <ProjectsStickyScroll />
            </div>
          </div>

          <div className="sticky top-0 z-[2]">
            <TechStackSection />
          </div>

          <div className="sticky z-[3]">
            <div className="bg-background">
              <ExperienceCanvasSection
                number=""
                title="Experience and Work"
                description="The journey through startups, teams, and real development challenges. Where theory met practice."
              />
            </div>
          </div>

          <div className="relative z-[4]">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;