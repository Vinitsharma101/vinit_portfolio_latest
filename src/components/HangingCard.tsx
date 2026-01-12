import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HangingCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
  const initialCardX = 0;
  const initialCardY = 60;
  
  // Motion values for card position
  const x = useMotionValue(initialCardX);
  const y = useMotionValue(initialCardY);
  
  // Magnetic hover offset
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  
  // Softer spring physics for gentle, realistic return
  const springConfig = { stiffness: 80, damping: 15, mass: 0.8 };
  const magnetSpringConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springMagnetX = useSpring(magnetX, magnetSpringConfig);
  const springMagnetY = useSpring(magnetY, magnetSpringConfig);
  
  // Combined position (drag + magnetic effect)
  const combinedX = useTransform([springX, springMagnetX], ([sx, mx]: number[]) => sx + mx);
  const combinedY = useTransform([springY, springMagnetY], ([sy, my]: number[]) => sy + my);

  // Magnetic hover effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging || !cardRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    const cardCenterXPos = cardRect.left + cardRect.width / 2;
    const cardCenterYPos = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distX = mouseX - cardCenterXPos;
    const distY = mouseY - cardCenterYPos;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    // Magnetic effect radius
    const magnetRadius = 200;
    const maxOffset = 12;
    
    if (distance < magnetRadius) {
      const strength = 1 - (distance / magnetRadius);
      const offsetX = (distX / distance) * maxOffset * strength * strength;
      const offsetY = (distY / distance) * maxOffset * strength * strength;
      
      magnetX.set(offsetX);
      magnetY.set(offsetY);
    } else {
      magnetX.set(0);
      magnetY.set(0);
    }
  }, [isDragging, magnetX, magnetY]);

  const handleMouseLeave = useCallback(() => {
    magnetX.set(0);
    magnetY.set(0);
  }, [magnetX, magnetY]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Calculate wire paths based on card position - wire ends connect to card dots
  const leftWirePath = useTransform(
    [combinedX, combinedY],
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
    [combinedX, combinedY],
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
    magnetX.set(0);
    magnetY.set(0);
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
        ref={cardRef}
        className="absolute cursor-grab active:cursor-grabbing z-10"
        style={{
          x: combinedX,
          y: combinedY,
          width: cardWidth,
          left: `calc(50% - ${cardWidth / 2}px)`,
        }}
        drag
        dragMomentum={false}
        dragConstraints={{
          top: 20,
          left: -100,
          right: 100,
          bottom: 120,
        }}
        dragElastic={0.1}
        onDrag={(_, info) => {
          x.set(initialCardX + info.offset.x);
          y.set(initialCardY + info.offset.y);
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
