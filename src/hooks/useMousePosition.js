import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track mouse position for cursor effects and magnetic interactions
 */
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { mousePosition, isHovering };
};

/**
 * Hook for magnetic effect calculations
 */
export const useMagnetic = (strength = 0.3, radius = 100) => {
  const { mousePosition } = useMousePosition();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleMouseMove = (e) => {
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < radius) {
        const pullStrength = (1 - distance / radius) * strength;
        setOffset({
          x: distanceX * pullStrength,
          y: distanceY * pullStrength,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, radius]);

  return { elementRef, offset };
};
