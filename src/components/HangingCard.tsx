import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HangingCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Card dimensions
  const cardWidth = 180;
  const cardHeight = 240;

  // Container dimensions
  const containerWidth = 220;
  const cardCenterX = containerWidth / 2;

  // Wire attachment points on card
  const cardDotLeftOffset = 14;
  const cardDotRightOffset = 14;

  // Wire top attachment points
  const wireTopLeftX = cardCenterX - cardWidth / 2 + cardDotLeftOffset;
  const wireTopRightX = cardCenterX + cardWidth / 2 - cardDotRightOffset;
  const wireTopY = 0;

  // Default card position
  const initialCardX = 0;
  const initialCardY = 50;

  // Raw motion values
  const x = useMotionValue(initialCardX);
  const y = useMotionValue(initialCardY);

  // Spring physics
  const springConfig = { stiffness: 80, damping: 15, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 🔑 RESET FUNCTION (FIX)
  const resetToDefault = () => {
    springX.set(initialCardX);
    springY.set(initialCardY);
  };

  // Start auto-return timer
  const startReturnTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      resetToDefault();
    }, 1000);
  };

  // Start timer on mount
  useEffect(() => {
    startReturnTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Wire paths
  const leftWirePath = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const cardDotX = wireTopLeftX + latestX;
      const cardDotY = latestY - 4;
      const midY = cardDotY / 2;
      const bendAmount = latestX * 0.4;

      return `M ${wireTopLeftX} ${wireTopY}
              Q ${wireTopLeftX + bendAmount * 0.3} ${midY},
                ${cardDotX} ${cardDotY}`;
    }
  );

  const rightWirePath = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const cardDotX = wireTopRightX + latestX;
      const cardDotY = latestY - 4;
      const midY = cardDotY / 2;
      const bendAmount = latestX * 0.4;

      return `M ${wireTopRightX} ${wireTopY}
              Q ${wireTopRightX + bendAmount * 0.3} ${midY},
                ${cardDotX} ${cardDotY}`;
    }
  );

  const handleDragStart = () => {
    setIsDragging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    startReturnTimer();
  };

  return (
    <div ref={containerRef} className="relative w-[220px] h-[340px] ">
      {/* Wires */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        <circle cx={wireTopLeftX} cy={wireTopY} r="3" fill="currentColor" />
        <circle cx={wireTopRightX} cy={wireTopY} r="3" fill="currentColor" />

        <motion.path
          d={leftWirePath}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        <motion.path
          d={rightWirePath}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Card */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing z-10"
        style={{
          x: springX,
          y: springY,
          width: cardWidth,
          left: `calc(50% - ${cardWidth / 2}px)`,
        }}
        drag
        dragConstraints={{
          top: 20,
          left: -80,
          right: 80,
          bottom: 100,
        }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
      >
        <div
          className={`relative overflow-hidden border-2 bg-background ${
            isDragging ? "shadow-2xl" : "shadow-lg"
          }`}
          style={{ height: cardHeight }}
        >
          <img
            src="/mypic.jpeg"
            alt="Card"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Card wire dots */}
        <div className="absolute -top-1 left-[10px] w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute -top-1 right-[10px] w-2 h-2 rounded-full bg-foreground/40" />
      </motion.div>
    </div>
  );
};

export default HangingCard;
