import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { ExperimentSection } from "@/components/ExperimentSection";
import { ProjectsHorizontalScroll } from "@/components/ProjectsHorizontalScroll";
import { SkillsExperiment } from "@/components/SkillsExperiment";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ExperienceSection } from "@/components/ExperienceSection";
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
        {/* Experiment 01: Projects - Real World Builds */}
        <ExperimentSection
          number="01"
          title="Real-World Builds"
          description="Projects that solve problems. Each experiment represents a unique challenge conquered with code and creativity."
          accent="olive"
        >
          <ProjectsHorizontalScroll />
        </ExperimentSection>

        {/* Experiment 02: Experience - System Architecture */}
        <ExperimentSection
          number="02"
          title="System Architecture"
          description="The journey through startups, teams, and real development challenges. Where theory met practice."
          accent="clay"
        >
          <ExperienceSection />
        </ExperimentSection>

        {/* Experiment 03: Skills - Technical Palette */}
        <ExperimentSection
          number="03"
          title="Technical Palette"
          description="The tools and technologies I use to bring ideas to life. Hover to explore proficiency levels."
          accent="rust"
        >
          <SkillsExperiment />
        </ExperimentSection>

        {/* Experiment 04: Philosophy - Performance Thinking */}
        <ExperimentSection
          number="04"
          title="Performance Thinking"
          description="The philosophical foundation behind my approach. How I think about systems, design, and user experience."
          accent="graphite"
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
