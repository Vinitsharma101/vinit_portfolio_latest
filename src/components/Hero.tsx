import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="fixed inset-0 h-screen w-full flex flex-col justify-between p-8 md:p-16 bg-background z-0">
      {/* Top navigation hint */}
      <div className="flex justify-between items-start">
        <span className="text-mono text-muted-foreground">Portfolio / 2024</span>
        <span className="text-mono text-muted-foreground">Scroll to explore</span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-editorial animate-fade-up">
            Vinit Sharma
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up-delay-1 font-sans">
            I design and engineer systems for the web. 
            <span className="text-foreground"> Building experiments</span> at the intersection of function and form.
          </p>
        </div>
      </div>

      {/* Bottom navigation hint */}
      <div className="flex justify-between items-end">
        <div className="space-y-1 animate-fade-up-delay-2">
          <p className="text-mono text-muted-foreground">Based in</p>
          <p className="text-sm">India</p>
        </div>

        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-2 animate-fade-up-delay-3"
        >
          <span className="text-mono text-muted-foreground group-hover:text-foreground transition-colors">
            Begin Journey
          </span>
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground animate-float transition-colors" />
        </button>

        <div className="space-y-1 text-right animate-fade-up-delay-2">
          <p className="text-mono text-muted-foreground">Available for</p>
          <p className="text-sm">Projects & Collaboration</p>
        </div>
      </div>
    </section>
  );
};
