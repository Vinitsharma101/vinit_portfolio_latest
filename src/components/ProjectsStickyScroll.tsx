import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import projectPreview1 from "@/assets/project-preview-1.png";
import projectPreview2 from "@/assets/project-preview-2.png";
import projectPreview3 from "@/assets/project-preview-3.png";
import projectPreviewx from "@/assets/image.png";
import projectPreview6 from "@/assets/project-preview-6.png";



gsap.registerPlugin(useGSAP, ScrollTrigger);

const content = [
  {
    number: "01",
    title: "Project Manager Web App",
    category: "Full Stack",
    tools: "React, Node.js, REST APIs",
    image: projectPreview1,
    link: "/projects",
  },
  {
    number: "02",
    title: "Live Location Sharing",
    category: "Real-Time App",
    tools: "WebSockets, React, Maps API",
    image: projectPreview2,
    link: "/projects",
  },
  {
    number: "03",
    title: "Token Buddy Platform",
    category: "Data Viz",
    tools: "React, Charts, TypeScript",
    image: projectPreview3,
    link: "/projects",
  },
  {
    number: "04",
    title: "Projecttory - Find Your Team",
    category: "Social Platform",
    tools: "React, Charts, TypeScript",
    image: projectPreview6,
    link: "/projects",
  },
  {
    number: "05",
    title: "Portfolio Website",
    category: "Frontend",
    tools: "React, Charts, TypeScript",
    image: projectPreviewx,
    link: "/projects",
  },
  
];

export const ProjectsStickyScroll = () => {
  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("p-work-box");
      const container = document.querySelector(".p-work-container");
      if (!box.length || !container) return;

      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;

      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".p-work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "p-work",
        invalidateOnRefresh: true,
      },
    });

    tl.to(".p-work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getById("p-work")?.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        .p-work-section {
          height: 100vh;
          box-sizing: border-box;
          will-change: transform;
          overflow: hidden;
        }
        .p-work-container {
          margin: auto;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0 80px;
        }
        .p-work-section h2 {
          margin-top: 60px;
          margin-bottom: 0;
          font-size: 70px;
          font-weight: 500;
        }
        .p-work-section h2 span {
          color: hsl(var(--accent));
        }
        .p-work-flex {
          width: 100%;
          display: flex;
          height: 100%;
          margin-left: -80px;
          padding-right: 120px;
          position: relative;
        }
        .p-work-flex::before,
        .p-work-flex::after {
          content: "";
          width: calc(50000vw);
          height: 1px;
          background-color: hsl(var(--foreground) / 0.15);
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
        .p-work-flex::after {
          top: 100%;
        }
        .p-work-box {
          padding: 80px;
          display: flex;
          flex-direction: column;
          width: 600px;
          box-sizing: border-box;
          border-right: 1px solid hsl(var(--foreground) / 0.15);
          flex-shrink: 0;
          gap: 50px;
          justify-content: start;
        }
        .p-work-flex .p-work-box:nth-child(even) {
          flex-direction: column-reverse;
        }
        .p-work-title {
          justify-content: space-between;
          display: flex;
          width: 100%;
          margin-bottom: 20px;
        }
        .p-work-title > div {
          text-align: right;
        }
        .p-work-title h3 {
          font-size: 50px;
          line-height: 50px;
          margin: 0;
          font-weight: 600;
          color: hsl(var(--foreground));
        }
        .p-work-info h4 {
          font-size: 18px;
          font-weight: 400;
          margin: 0;
          color: hsl(var(--foreground));
        }
        .p-work-info p {
          font-weight: 200;
          color: hsl(var(--muted-foreground));
          margin: 0;
          margin-top: 3px;
        }
        .p-work-info > p {
          width: 90%;
        }
        .p-work-image {
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .p-work-image-in {
          position: relative;
          display: block;
        }
        .p-work-image img {
          max-width: 100%;
          max-height: 350px;
          display: block;
        }
        .p-work-link {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: hsl(var(--background));
          width: 50px;
          border-radius: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          transition: 0.3s;
          opacity: 0;
          color: hsl(var(--foreground));
        }
        .p-work-image-in:hover .p-work-link {
          opacity: 1;
        }

        @media only screen and (max-height: 900px) {
          .p-work-image img { max-height: 250px; }
          .p-work-box { padding-top: 40px; padding-bottom: 40px; }
          .p-work-section h2 { font-size: 60px; margin-top: 50px; }
        }
        @media only screen and (max-width: 1400px) {
          .p-work-title h3 { font-size: 35px; }
          .p-work-info p { font-size: 13px; }
          .p-work-info h4 { font-size: 15px; }
          .p-work-box { width: 450px; padding: 50px; }
          .p-work-flex { margin-left: -50px; padding-right: 75px; }
          .p-work-section h2 { font-size: 50px; }
        }
        @media only screen and (max-width: 1024px) {
          .p-work-box { width: 350px; padding: 30px; }
          .p-work-flex { margin-left: -30px; padding-right: 45px; }
        }
        @media only screen and (max-height: 650px) {
          .p-work-image img { max-height: 200px; }
          .p-work-section h2 { font-size: 40px; margin-bottom: 20px; }
          .p-work-box { gap: 20px; }
        }
      `}</style>

      <div className="p-work-section">
        <div className="p-work-container">
          <h2 className="flex items-center justify-between gap-4 w-full">
            <span>
              My <span>Work</span>
            </span>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs sm:text-sm text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
            >
              <span className="tracking-wide">More Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </h2>

          <div className="p-work-flex">
            {content.map((item) => (
              <div className="p-work-box" key={item.number}>
                <div className="p-work-info">
                  <div className="p-work-title">
                    <h3>{item.number}</h3>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{item.tools}</p>
                </div>

                <div className="p-work-image">
                  <Link to={item.link} className="p-work-image-in">
                    <div className="p-work-link">
                      <ArrowRight />
                    </div>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ filter: "saturate(0.9) contrast(1.05)" }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
