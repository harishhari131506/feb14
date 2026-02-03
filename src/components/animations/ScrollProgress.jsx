import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[10000] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-muted-red via-rose-gold to-muted-red"
        style={{
          scaleX: smoothProgress,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
