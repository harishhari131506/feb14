import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Handwritten text reveal effect using SVG path animation
 * Text appears as if being written by hand
 */
const HandwrittenText = ({ 
  text, 
  className = '',
  strokeColor = '#DC267F',
  strokeWidth = 2,
  duration = 2,
  delay = 0,
}) => {
  const pathRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [pathLength, setPathLength] = useState(0);

  // Convert text to SVG path (simplified - in production use a font-to-path converter)
  // For now, we'll use a cursive-style path approximation
  useEffect(() => {
    if (pathRef.current && !prefersReducedMotion) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  // Simplified path - in production, use a library to convert text to paths
  // For demonstration, we'll create a wavy cursive path
  const createCursivePath = (text) => {
    // This is a placeholder - real implementation would use opentype.js or similar
    // to convert actual font glyphs to paths
    const points = [];
    const chars = text.split('');
    chars.forEach((char, i) => {
      const x = i * 30;
      const y = Math.sin(i * 0.5) * 10;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    });
    return points.join(' ');
  };

  return (
    <svg
      className={className}
      viewBox={`0 0 ${text.length * 30} 50`}
      style={{ width: '100%', height: 'auto' }}
    >
      <motion.path
        ref={pathRef}
        d={createCursivePath(text)}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        animate={{
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          duration,
          delay,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
};

export default HandwrittenText;
