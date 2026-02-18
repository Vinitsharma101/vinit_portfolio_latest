import { Mail, Phone, ArrowUpRight, Award, BookOpen } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import TextPressure from "./TextPressure";
import electric from "@/assets/eletric.png";

const ScrollRevealText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.5;
      const current = rect.top;

      if (current >= start) {
        setScrollProgress(0);
      } else if (current <= end) {
        setScrollProgress(1);
      } else {
        const progress = (start - current) / (start - end);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-lg md:text-xl leading-relaxed mb-8">
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = scrollProgress > wordProgress;
        const isRevealing =
          scrollProgress > wordProgress - 0.1 && scrollProgress <= wordProgress;

        const blurAmount = isRevealed ? 0 : isRevealing ? 2 : 4;

        return (
          <span
            key={index}
            className={`inline-block mr-[0.3em] transition-all duration-300 ${
              isRevealed
                ? "opacity-100 text-[#e5e5e5]"
                : isRevealing
                  ? "opacity-50 text-[#8a8a8a]"
                  : "opacity-20 text-[#4a4a4a]"
            }`}
            style={{
              transitionDelay: `${index * 10}ms`,
              filter: `blur(${blurAmount}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

const certificates = [
  "NLP and Web Scraping",
  "Cloud Computing – NPTEL",
  "Introduction to DBMS",
  "Meta Back-End Developer",
];

export const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="max-h-screen py-16 md:py-24 px-8 md:px-16 bg-black text-[#f5f5f5] flex flex-col justify-center relative overflow-hidden"
    >
      <div className="absolute right-5 top-1/3 -translate-y-1/2 pointer-events-none select-none opacity-30">
        <img
          src={electric}
          alt=""
          className="w-64 md:w-80 lg:w-96 object-contain"
        />
      </div>

      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 77, 0, 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 77, 0, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <span className="text-mono text-[#6a6a6a] block mb-4">Final Stage</span>

        <div className="mb-16 max-w-4xl">
          <div
            className={`relative transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ height: "auto", minHeight: "fit-content" }}
          >
            <TextPressure
              text="Let's Create"
              flex
              alpha={false}
              stroke={true}
              width
              weight
              italic={false}
              textColor="#FF4D00"
              strokeColor="#FF4D00"
              minFontSize={56}
            />
          </div>

          <div
            className={`relative transition-all duration-700 delay-150 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ height: "auto", minHeight: "fit-content" }}
          >
            <TextPressure
              text="Something Together"
              flex
              alpha={false}
              stroke={true}
              width
              weight
              italic={true}
              textColor="#FF4D00"
              strokeColor="#FF4D00"
              minFontSize={56}
            />
          </div>
        </div>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Contact info */}
          <div className="space-y-8">
            <a
              href="mailto:vinitsharmapc827@gmail.com"
              className="group flex items-start gap-4 p-6 border border-[#2a2a2a] hover:border-terminal/50 transition-all duration-300"
            >
              <Mail className="w-5 h-5 mt-1 text-[#6a6a6a] group-hover:text-terminal transition-colors" />
              <div>
                <span className="text-mono text-xs text-[#6a6a6a] block mb-1">
                  Email
                </span>
                <span className="text-lg text-[#e5e5e5]">
                  vinitsharmapc827@gmail.com
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-terminal transition-opacity" />
            </a>

            <a
              href="tel:+917056101827"
              className="group flex items-start gap-4 p-6 border border-[#2a2a2a] hover:border-terminal/50 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mt-1 text-[#6a6a6a] group-hover:text-terminal transition-colors" />
              <div>
                <span className="text-mono text-xs text-[#6a6a6a] block mb-1">
                  Phone
                </span>
                <span className="text-lg text-[#e5e5e5]">+91 7056101827</span>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-terminal transition-opacity" />
            </a>

            {/* Certificates */}
            <div className="p-6 border border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-terminal" />
                <span className="text-mono text-xs text-[#6a6a6a]">
                  Certifications ---
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {certificates.map((cert, i) => (
                  <div key={cert} className="relative group/cert">
                    <a
                      href="https://drive.google.com/drive/folders/11lhsthi_i6OYYTE0iHhl4VoMuQF5Ttit?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className={`text-xs px-3 py-1.5 border transition-all duration-300 cursor-pointer block ${
                          hoveredCert === i
                            ? "border-terminal/50 bg-terminal/10 text-terminal"
                            : "border-[#2a2a2a] text-[#8a8a8a]"
                        }`}
                        onMouseEnter={() => setHoveredCert(i)}
                        onMouseLeave={() => setHoveredCert(null)}
                      >
                        {cert}
                      </span>
                    </a>
                    {/* Hover tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md text-xs text-white bg-[#1a1a1a] border border-[#3a3a3a] whitespace-nowrap opacity-0 group-hover/cert:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      Click to open
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#3a3a3a]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-center">
            <ScrollRevealText text="Detail-oriented B.E. graduate seeking opportunities in full stack development. Strong technical foundation and interpersonal skills, committed to delivering solutions and evolving in fast-paced environments." />
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="text-xs px-3 py-2 border border-terminal/30 text-terminal/80">
                Freelance Projects
              </span>
              <span className="text-xs px-3 py-2 border border-terminal/30 text-terminal/80">
                Full-time Opportunities
              </span>
              <span className="text-xs px-3 py-2 border border-terminal/30 text-terminal/80">
                Startup Collaboration
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-terminal" />
              <span className="text-mono text-xs text-[#6a6a6a]">
                Soft Skills
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Teamwork",
                "Communication",
                "Time Management",
                "Emotional Intelligence",
              ].map((skill) => (
                <span key={skill} className="text-xs text-[#8a8a8a]">
                  {skill} •
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-terminal/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-mono text-xs text-[#6a6a6a]">
            © 2025 Vinit Sharma. All rights reserved.
          </span>
          <div className="flex gap-8">
            <a
              href="https://github.com/Vinitsharma101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[#6a6a6a] hover:text-terminal transition-colors line-reveal"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sharma-vinit101/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[#6a6a6a] hover:text-terminal transition-colors line-reveal"
            >
              LinkedIn
            </a>
            <a
              href="https://vntdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono text-xs text-[#6a6a6a] hover:text-terminal transition-colors line-reveal"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};