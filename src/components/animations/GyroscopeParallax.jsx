import React from 'react';
import { motion } from 'framer-motion';
import { useGyroscope } from '../../hooks/useGyroscope';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Gyroscope Parallax Component
 * Elements tilt based on device orientation (mobile)
 */
const GyroscopeParallax = ({ 
  children, 
  intensity = 20,
  className = '',
}) => {
  const { parallaxX, parallaxY, isSupported } = useGyroscope();
  const prefersReducedMotion = useReducedMotion();

  if (!isSupported || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: parallaxY * intensity,
        rotateY: parallaxX * intensity,
        transformStyle: 'preserve-3d',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export default GyroscopeParallax;
