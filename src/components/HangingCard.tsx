import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HangingCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Card dimensions
  const cardWidth = 280;
  const cardHeight = 350;
  
  // Container center X for calculating wire positions
  const containerWidth = 320;
  const cardCenterX = containerWidth / 2;
  
  // Wire attachment points on card (10px from edges, matching the dots)
  const cardDotLeftOffset = 14;
  const cardDotRightOffset = 14;
  
  // Wire top attachment points (aligned with where card dots will be at rest)
  const wireTopLeftX = cardCenterX - cardWidth / 2 + cardDotLeftOffset;
  const wireTopRightX = cardCenterX + cardWidth / 2 - cardDotRightOffset;
  const wireTopY = 0;
  
  // Initial card position (centered, hanging below)
  const initialCardY = 60;
  
  // Motion values for card offset from initial position
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  
  // Softer spring physics for gentle, realistic return
  const springConfig = { stiffness: 80, damping: 15, mass: 0.8 };
  const springX = useSpring(offsetX, springConfig);
  const springY = useSpring(offsetY, springConfig);

  // Calculate actual Y position (initial + offset)
  const actualY = useTransform(springY, (value) => initialCardY + value);

  // Calculate wire paths based on card position - wire ends connect to card dots
  const leftWirePath = useTransform(
    [springX, actualY],
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
    [springX, actualY],
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
    // Cancel any pending return timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Return to default position after 3 seconds
    timeoutRef.current = setTimeout(() => {
      offsetX.set(0);
      offsetY.set(0);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[320px] h-[480px] mx-auto"
    >
      {/* SVG for wires */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        {/* Wire attachment points (small circles at top) */}
        <circle cx={wireTopLeftX} cy={wireTopY} r="3" fill="currentColor" className="text-foreground/60" />
        <circle cx={wireTopRightX} cy={wireTopY} r="3" fill="currentColor" className="text-foreground/60" />
        
        {/* Left wire */}
        <motion.path
          d={leftWirePath}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-foreground/40"
          style={{ strokeLinecap: "round" }}
        />
        
        {/* Right wire */}
        <motion.path
          d={rightWirePath}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-foreground/40"
          style={{ strokeLinecap: "round" }}
        />
      </svg>

      {/* Draggable Card */}
      <motion.div
        className="absolute cursor-grab active:cursor-grabbing z-10"
        style={{
          x: springX,
          y: actualY,
          width: cardWidth,
          left: `calc(50% - ${cardWidth / 2}px)`,
          top: 0,
        }}
        drag
        dragMomentum={false}
        dragConstraints={{
          top: -40,
          left: -100,
          right: 100,
          bottom: 60,
        }}
        dragElastic={0.1}
        onDrag={(_, info) => {
          offsetX.set(info.offset.x);
          offsetY.set(info.offset.y);
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
      >
        <div 
          className={`
            relative overflow-hidden border border-border bg-background
            shadow-lg transition-shadow duration-300
            ${isDragging ? 'shadow-2xl' : 'shadow-md'}
          `}
          style={{ height: cardHeight }}
        >
          {/* Card inner border effect */}
          <div className="absolute inset-[1px] border border-border/30 pointer-events-none z-20" />
          
          {/* Image placeholder - replace src with actual image */}
          <div className="w-full h-full bg-muted flex items-center justify-center overflow-hidden">
            {/* Placeholder pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, currentColor 25%, transparent 25%),
                    linear-gradient(-45deg, currentColor 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, currentColor 75%),
                    linear-gradient(-45deg, transparent 75%, currentColor 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}
              />
            </div>
            
            {/* Placeholder text */}
            <div className="relative z-10 text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/10 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Your Image</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Drag me around!</p>
            </div>
          </div>
          
          {/* Card corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground/20" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground/20" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground/20" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground/20" />
        </div>
        
        {/* Wire attachment points on card (small visual indicators) */}
        <div className="absolute -top-1 left-[10px] w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute -top-1 right-[10px] w-2 h-2 rounded-full bg-foreground/40" />
      </motion.div>
    </div>
  );
};

export default HangingCard;
