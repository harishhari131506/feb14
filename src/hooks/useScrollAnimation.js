import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Custom hook for scroll-triggered animations
 * Returns refs and animation values for parallax and scroll-based effects
 */
export const useScrollAnimation = (options = {}) => {
  const {
    offset = ['start end', 'end start'],
    once = false,
    threshold = 0.3,
  } = options;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const [inViewRef, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      inViewRef(ref.current);
    }
  }, [inViewRef]);

  return {
    ref,
    scrollYProgress,
    inView,
  };
};

/**
 * Hook for parallax effects with customizable speed
 */
export const useParallax = (speed = 0.5, ref = null) => {
  const elementRef = useRef(ref?.current || null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return {
    ref: elementRef,
    y,
    opacity,
    scrollYProgress,
  };
};

/**
 * Hook for scroll progress with spring physics
 */
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
};
