import { Mail, Phone, ArrowUpRight } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="min-h-screen py-24 md:py-32 px-8 md:px-16 bg-primary text-primary-foreground flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <span className="text-mono opacity-60 block mb-4">Final Stage</span>
        <h2 className="text-5xl md:text-7xl text-editorial mb-16">
          Let's Create<br />
          <span className="italic">Something</span> Together
        </h2>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Contact info */}
          <div className="space-y-8">
            <a
              href="mailto:vinitsharmapc827@gmail.com"
              className="group flex items-start gap-4 p-6 border border-primary-foreground/20 hover:border-primary-foreground/50 hover:bg-primary-foreground/5 transition-all duration-300"
            >
              <Mail className="w-5 h-5 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div>
                <span className="text-mono text-xs opacity-60 block mb-1">Email</span>
                <span className="text-lg">vinitsharmapc827@gmail.com</span>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="tel:+917056101827"
              className="group flex items-start gap-4 p-6 border border-primary-foreground/20 hover:border-primary-foreground/50 hover:bg-primary-foreground/5 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div>
                <span className="text-mono text-xs opacity-60 block mb-1">Phone</span>
                <span className="text-lg">+91 7056101827</span>
              </div>
              <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-center">
            <p className="text-lg opacity-80 mb-8 leading-relaxed">
              I'm currently open to new projects and collaborations. Whether you have 
              a specific idea or just want to explore possibilities, I'd love to hear from you.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="text-xs px-3 py-2 border border-primary-foreground/30">
                Freelance Projects
              </span>
              <span className="text-xs px-3 py-2 border border-primary-foreground/30">
                Full-time Opportunities
              </span>
              <span className="text-xs px-3 py-2 border border-primary-foreground/30">
                Consulting
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-mono text-xs opacity-60">
            © 2024 Vinit Sharma. All rights reserved.
          </span>
          <div className="flex gap-8">
            <a href="#" className="text-mono text-xs opacity-60 hover:opacity-100 transition-opacity line-reveal">
              GitHub
            </a>
            <a href="#" className="text-mono text-xs opacity-60 hover:opacity-100 transition-opacity line-reveal">
              LinkedIn
            </a>
            <a href="#" className="text-mono text-xs opacity-60 hover:opacity-100 transition-opacity line-reveal">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
