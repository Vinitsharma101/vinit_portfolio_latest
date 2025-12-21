import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { ExperimentSection } from "@/components/ExperimentSection";
import { ProjectsHorizontalScroll } from "@/components/ProjectsHorizontalScroll";
import { SkillsExperiment } from "@/components/SkillsExperiment";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingNav } from "@/components/FloatingNav";

const Index = () => {
  return (
    <div className="relative">
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
        {/* Experiment 01: Projects */}
        <ExperimentSection
          number="01"
          title="Selected Works"
          description="A curated collection of projects that demonstrate problem-solving through code. Each experiment represents a unique challenge conquered."
          accent="olive"
        >
          <ProjectsHorizontalScroll />
        </ExperimentSection>

        {/* Experiment 02: Skills */}
        <ExperimentSection
          number="02"
          title="Technical Palette"
          description="The tools and technologies I use to bring ideas to life. Hover to explore proficiency levels and specializations."
          accent="clay"
        >
          <SkillsExperiment />
        </ExperimentSection>

        {/* Experiment 03: Philosophy */}
        <ExperimentSection
          number="03"
          title="Building Principles"
          description="The philosophical foundation behind my approach to development. How I think about systems, design, and user experience."
          accent="rust"
        >
          <PhilosophySection />
        </ExperimentSection>

        {/* Contact section */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
