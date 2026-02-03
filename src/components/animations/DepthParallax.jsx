import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * 3D Depth-based Parallax with Perspective Camera
 * Replaces basic Y-axis parallax with true 3D depth
 */
const DepthParallax = ({ children, layers = 3, intensity = 1 }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { mousePosition } = useMousePosition();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Create depth layers with different parallax speeds
  const layerTransforms = Array.from({ length: layers }, (_, i) => {
    const depth = (i + 1) / layers; // 0.33, 0.66, 1.0
    const speed = depth * intensity;
    
    // Y-axis parallax (scroll-based)
    const y = useTransform(scrollYProgress, [0, 1], [-200 * speed, 200 * speed]);
    
    // Z-axis depth (blur based on depth)
    const blur = useTransform(scrollYProgress, [0, 1], [depth * 3, depth * 3]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 - depth * 0.1, 1, 1 + depth * 0.1]);
    
    // Mouse-based rotation (3D tilt)
    const rotateX = useTransform(
      () => (mousePosition.y / window.innerHeight - 0.5) * -10 * depth,
      [-10 * depth, 10 * depth]
    );
    const rotateY = useTransform(
      () => (mousePosition.x / window.innerWidth - 0.5) * 10 * depth,
      [-10 * depth, 10 * depth]
    );

    return { y, blur, scale, rotateX, rotateY, depth };
  });

  if (prefersReducedMotion) {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (index >= layers) return child;
        
        const transforms = layerTransforms[index];
        
        return (
          <motion.div
            style={{
              y: transforms.y,
              filter: `blur(${transforms.blur}px)`,
              scale: transforms.scale,
              rotateX: transforms.rotateX,
              rotateY: transforms.rotateY,
              transformStyle: 'preserve-3d',
              zIndex: layers - index, // Foreground layers on top
            }}
            className="relative"
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default DepthParallax;
