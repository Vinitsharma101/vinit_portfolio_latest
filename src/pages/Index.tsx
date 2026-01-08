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
import { useLockedScrollProgress } from "@/hooks/useLockedScrollProgress";

const Index = () => {
  const [showLoading, setShowLoading] = useState(() => {
    // Only show loading if it hasn't been shown this session
    return !sessionStorage.getItem("terminal-loaded");
  });

  const [revealDone, setRevealDone] = useState(false);
  const [revealDistance, setRevealDistance] = useState(() => window.innerHeight * 0.9);

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

  useEffect(() => {
    const onResize = () => setRevealDistance(window.innerHeight * 0.9);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const revealEnabled = !showLoading && !revealDone;
  const { progress: splitProgress, complete } = useLockedScrollProgress(revealEnabled, revealDistance);

  useEffect(() => {
    if (splitProgress >= 1 && !revealDone) setRevealDone(true);
  }, [splitProgress, revealDone]);

  const handleBeginJourney = () => {
    complete();
    setRevealDone(true);
  };

  return (
    <div className="relative">
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Floating navigation */}
      <FloatingNav />

      {/* Hero pinned; scroll input is locked + mapped to splitProgress until reveal completes */}
      <Hero splitProgress={splitProgress} onBeginJourney={handleBeginJourney} />

      <main className="relative z-0">
        {/* Experiment 01: Projects - stays static; revealed by Hero split */}
        <ExperimentSection
          number="01"
          title="Real-World Builds"
          description="Projects that solve problems. Each experiment represents a unique challenge conquered with code and creativity."
          accent="olive"
          animate={false}
        >
          <ProjectsHorizontalScroll />
        </ExperimentSection>

        {/* Content after Experiment 01 */}
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
      </main>
    </div>
  );
};

export default Index;
