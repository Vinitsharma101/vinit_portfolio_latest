import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 16;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }, 200);
    }
  }, [progress, onComplete]);

  const text = "PORTFOLIO";
  const fillProgress = (progress / 100) * text.length;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@700&display=swap');

    .loading-root {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #0a0a0a;
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    .loading-root.exiting {
      opacity: 0;
      transform: translateY(-20px);
    }

    /* ── SVG filter lives off-screen ── */
    .goo-svg {
      position: absolute;
      width: 0;
      height: 0;
      overflow: hidden;
    }

    /* ── Goo wrapper ── */
    .goo-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: url(#goo);
    }

    /* ── PORTFOLIO letters ── */
    .portfolio-text {
      font-size: clamp(3.5rem, 10vw, 10rem);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      user-select: none;
      position: relative;
      z-index: 2;
      background: transparent;
    }

    .portfolio-text span {
      transition: color 0.15s ease-out, text-shadow 0.15s ease-out;
    }

    /* ── Drop blob ── */
    .dropp {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background-color: rgba(255, 77, 0, 0.85);
      position: absolute;
      right: 40%;
      top: 50%;
      transform-origin: center;
      animation: dropFall 4s cubic-bezier(0.77, 0.02, 0.68, 0.14) infinite;
      z-index: 1;
    }

    .droppp {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background-color: rgba(255, 77, 0, 0.85);
      position: absolute;
      right: 80%;
      top: 50%;
      transform-origin: center;
      animation: dropFall 4s cubic-bezier(0.77, 0.02, 0.68, 0.14) infinite;
      z-index: 1;
    }

    .drop {
      height: 28px;
      width: 24px;
      border-radius: 50%;
      background-color: rgba(255, 77, 0, 0.85);
      position: absolute;
      left: 0;
      top: 50%;
      transform-origin: center;
      animation: dropSlide 3s cubic-bezier(0.77, 0.02, 0.68, 0.14) infinite;
      z-index: 1;
    }

    @keyframes dropSlide {
      0% {
        transform: translate(-1500%, -50%) scaleY(0.55);
        width: 14px;
        opacity: 0;
      }
      8% {
        opacity: 1;
      }
      35% {
        transform: translate(200%, -50%) scaleY(1);
        width: 24px;
      }
      65% {
        transform: translate(700%, -50%) scaleY(1);
        width: 24px;
      }
      92% {
        opacity: 1;
      }
      100% {
        transform: translate(1500%, -50%) scaleY(0.55);
        width: 14px;
        opacity: 0;
      }
    }

    @keyframes dropFall {
      0% {
        transform: translateY(-700%) scaleX(0.55);
        height: 52px;
        opacity: 0;
      }
      8% {
        opacity: 1;
      }
      35% {
        transform: translateY(-180%) scaleX(1);
        height: 28px;
      }
      65% {
        transform: translateY(80%) scaleX(1);
        height: 28px;
      }
      92% {
        opacity: 1;
      }
      100% {
        transform: translateY(700%) scaleX(0.55);
        height: 52px;
        opacity: 0;
      }
    }

    /* ── Progress bar ── */
    .progress-bar-wrapper {
      position: absolute;
      bottom: -28px;
      left: 0;
      width: 62%;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: rgba(255, 77, 0, 0.9);
      border-radius: 2px;
      box-shadow: 0 0 8px rgba(255, 77, 0, 0.6);
      transition: width 0.05s linear;
    }

    /* ── "loading..." label with shimmer ── */
    .loading-label {
      margin-top: 52px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(0.65rem, 1.2vw, 0.85rem);
      letter-spacing: 0.5em;
      text-transform: uppercase;
      background: linear-gradient(90deg, #ff4d00, #fff, #ff4d00);
      background-repeat: no-repeat;
      background-size: 80%;
      animation: shimmer 3s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: rgba(255, 255, 255, 0);
    }

    @keyframes shimmer {
      0%   { background-position: -500%; }
      100% { background-position: 500%; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Off-screen SVG filter for goo effect */}
      <svg className="goo-svg " aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -8"
              result="gooResult"
            />
            <feBlend in="SourceGraphic" in2="gooResult" />
          </filter>
        </defs>
      </svg>

      <div className={`loading-root${isExiting ? " exiting" : ""}`}>
        <div className="goo-container ">
          <h1 className="portfolio-text ">
            {text.split("").map((char, index) => {
              const letterProgress = Math.min(
                Math.max(fillProgress - index, 0),
                1
              );
              const orangeColor = `rgba(255, 77, 0, ${letterProgress})`;
              const greyColor = `rgba(255, 255, 255, ${
                0.15 * (1 - letterProgress)
              })`;

              return (
                <span
                  key={index}
                  style={{
                    color: letterProgress > 0.5 ? orangeColor : greyColor,
                    textShadow:
                      letterProgress > 0.5
                        ? `0 0 30px rgba(255, 77, 0, ${letterProgress * 0.5})`
                        : "none",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>

          <div className="drop" />
          <div className="dropp" />
          <div className="droppp" />

          <div className="progress-bar-wrapper">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="loading-label">loading...</p>
      </div>
    </>
  );
};

export default LoadingScreen;