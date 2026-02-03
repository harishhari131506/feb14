import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CustomCursor = () => {
  const { mousePosition, isHovering } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    setIsVisible(true);
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);

    // Detect hoverable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer'
      ) {
        setCursorType('pointer');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [mousePosition, cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(220, 38, 127, 0.2)',
      borderColor: 'rgba(220, 38, 127, 0.4)',
    },
    text: {
      scale: 0.8,
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      borderColor: 'rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={cursorVariants}
        animate={cursorType}
        transition={{ duration: 0.2 }}
      />

      {/* Trailing glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(220, 38, 127, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: cursorType === 'pointer' ? 1.5 : 1,
          opacity: cursorType === 'pointer' ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
