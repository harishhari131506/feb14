import { useSpring, config } from '@react-spring/web';
import { useReducedMotion } from './useReducedMotion';

/**
 * Physics-based animations using react-spring
 * Replaces easing curves with natural physics
 */
export const usePhysics = (options = {}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const {
    from = { scale: 1, opacity: 1 },
    to = { scale: 1, opacity: 1 },
    config: customConfig = config.gentle,
    immediate = false,
  } = options;

  const [springs, api] = useSpring(() => ({
    from,
    to,
    config: prefersReducedMotion ? { ...customConfig, duration: 0 } : customConfig,
    immediate: immediate || prefersReducedMotion,
  }));

  return [springs, api];
};

/**
 * Magnetic spring physics for interactive elements
 */
export const useMagneticPhysics = (strength = 0.3, radius = 100) => {
  const prefersReducedMotion = useReducedMotion();
  
  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: config.gentle,
  }));

  const handleMouseMove = (e, element) => {
    if (prefersReducedMotion || !element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength;
      api.start({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
        scale: 1.05,
      });
    } else {
      api.start({
        x: 0,
        y: 0,
        scale: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  return {
    springs,
    handleMouseMove,
    handleMouseLeave,
  };
};
