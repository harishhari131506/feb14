import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Morphing Text Component
 * Text morphs between different words with liquid-like transitions
 * Inspired by Type01.co and Resn
 */
const MorphingText = ({ 
  words = [],
  duration = 3000,
  className = '',
  onMorph,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % words.length;
        if (onMorph) onMorph(words[next]);
        return next;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration, prefersReducedMotion, onMorph]);

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  const currentWord = words[currentIndex] || words[0];

  return (
    <span className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ 
            opacity: 0,
            y: 20,
            scale: 0.8,
            filter: 'blur(10px)',
          }}
          animate={{ 
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{ 
            opacity: 0,
            y: -20,
            scale: 1.2,
            filter: 'blur(10px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="inline-block"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/**
 * Liquid Morphing Text (Advanced)
 * Uses clip-path and blur for liquid-like morphing effect
 */
export const LiquidMorphingText = ({ 
  words = [],
  duration = 3000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  const currentWord = words[currentIndex] || words[0];
  const nextWord = words[(currentIndex + 1) % words.length] || words[0];

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        key={`current-${currentIndex}`}
        initial={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          filter: 'blur(0px)',
        }}
        animate={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          filter: 'blur(10px)',
        }}
        transition={{
          duration: 0.6,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="inline-block"
      >
        {currentWord}
      </motion.span>
      <motion.span
        key={`next-${currentIndex}`}
        initial={{ 
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          filter: 'blur(10px)',
        }}
        animate={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0 inline-block"
      >
        {nextWord}
      </motion.span>
    </span>
  );
};

export default MorphingText;
