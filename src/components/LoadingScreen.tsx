import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 16; // ~60fps
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
      // Start exit animation after fill completes
      setTimeout(() => {
        setIsExiting(true);
        // Complete after exit animation
        setTimeout(onComplete, 600);
      }, 200);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Centered TERMINAL text and loading */}
      <div className="flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase select-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: `linear-gradient(90deg, rgb(255, 77, 0) ${progress}%, rgba(255, 255, 255, 0.2) ${progress}%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          TERMINAL
        </h1>
        
        {/* Loading text centered under TERMINAL */}
        <span
          className="mt-4 text-xs md:text-sm tracking-wider opacity-40"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
