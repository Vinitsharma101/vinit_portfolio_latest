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

  const text = "TERMINAL";
  const filledChars = Math.floor((progress / 100) * text.length);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-all duration-500 ease-out ${
        isExiting ? "opacity-0 translate-y-[-20px]" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Centered TERMINAL text */}
      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] uppercase select-none"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            style={{
              color: index < filledChars ? "rgb(255, 77, 0)" : "rgba(255, 255, 255, 0.2)",
              transition: "color 0.1s ease-out",
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default LoadingScreen;
