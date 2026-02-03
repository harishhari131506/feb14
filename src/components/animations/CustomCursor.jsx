import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CustomCursor = () => {
  const { mousePosition } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(true);
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Disable custom cursor entirely on touch / coarse pointer devices
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia?.('(pointer: fine)');
      if (!mq || !mq.matches) {
        setIsFinePointer(false);
        return;
      }
    }

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

  if (prefersReducedMotion || !isVisible || !isFinePointer) return null;

  const cursorVariants = {
    default: {
      scale: 1,
      rotate: 0,
    },
    pointer: {
      scale: 1.3,
      rotate: -10,
    },
    text: {
      scale: 0.8,
      rotate: 0,
    },
  };

  return (
    <>
      {/* Main cursor heart */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-[#E11D48] drop-shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={cursorVariants}
        animate={cursorType}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="w-6 h-6"
        >
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      </motion.div>

      {/* Trailing glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: cursorType === 'pointer' ? 1.8 : 1,
          opacity: cursorType === 'pointer' ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
