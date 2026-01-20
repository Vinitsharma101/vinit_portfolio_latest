import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HangingCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Card dimensions - smaller, more like an ID card
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
  
  // Initial card position
  const initialCardX = 0;
  const initialCardY = 50;
  
  // Motion values for card position
  const x = useMotionValue(initialCardX);
  const y = useMotionValue(initialCardY);
  
  // Soft spring physics
  const springConfig = { stiffness: 80, damping: 15, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Start auto-return timer and cleanup on unmount
  useEffect(() => {
    // Start initial timer to return to position
    const startReturnTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        x.set(initialCardX);
        y.set(initialCardY);
      }, 3000);
    };

    // Start timer on mount
    startReturnTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [x, y, initialCardX, initialCardY]);

  // Calculate wire paths based on card position
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    timeoutRef.current = setTimeout(() => {
      x.set(initialCardX);
      y.set(initialCardY);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-[220px] h-[340px]"
    >
      {/* SVG for wires */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        {/* Wire attachment points */}
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
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div 
          className={`
            relative overflow-hidden border-2 border-foreground/20 bg-background
            transition-shadow duration-300
            ${isDragging ? 'shadow-2xl' : 'shadow-lg'}
          `}
          style={{ 
            height: cardHeight,
            boxShadow: isDragging 
              ? '8px 12px 30px rgba(0,0,0,0.25)' 
              : '4px 6px 20px rgba(0,0,0,0.15)',
          }}
        >
          {/* Card inner border effect */}
          <div className="absolute inset-[2px] border border-foreground/10 pointer-events-none z-20" />
          
          {/* Image placeholder */}
          <div className="w-full h-full bg-muted flex items-center justify-center overflow-hidden">
            {/* Subtle pattern background */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, currentColor 25%, transparent 25%),
                    linear-gradient(-45deg, currentColor 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, currentColor 75%),
                    linear-gradient(-45deg, transparent 75%, currentColor 75%)
                  `,
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                }}
              />
            </div>
            
            {/* Placeholder content */}
            <div className="relative z-10 text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-foreground/10 flex items-center justify-center border border-foreground/10">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">YOUR PHOTO</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1 italic">Drag me!</p>
            </div>

            {/* Decorative corner marks */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-foreground/20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-foreground/20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-foreground/20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-foreground/20" />
          </div>
        </div>
        
        {/* Wire attachment points on card */}
        <div className="absolute -top-1 left-[10px] w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute -top-1 right-[10px] w-2 h-2 rounded-full bg-foreground/40" />
      </motion.div>
    </div>
  );
};

export default HangingCard;