import { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOnDark, setIsOnDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check background color at cursor position
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          setIsOnDark(brightness < 128);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-[9999] rounded-full border-2 transition-opacity duration-200 mix-blend-difference ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - 16,
        top: position.y - 16,
        width: 32,
        height: 32,
        borderColor: isOnDark ? 'white' : 'black',
      }}
    />
  );
};
