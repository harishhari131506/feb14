import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Gyroscope Parallax Hook
 * Uses device orientation for mobile tilt effects
 */
export const useGyroscope = () => {
  const [orientation, setOrientation] = useState({ beta: 0, gamma: 0 });
  const [isSupported, setIsSupported] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const handleOrientation = (event) => {
      // Beta: front-to-back tilt (-180 to 180)
      // Gamma: left-to-right tilt (-90 to 90)
      setOrientation({
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      });
    };

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch((error) => {
          console.warn('Device orientation permission denied:', error);
        });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [prefersReducedMotion]);

  // Convert orientation to parallax values
  const parallaxX = orientation.gamma / 90; // -1 to 1
  const parallaxY = orientation.beta / 90; // -1 to 1

  return {
    orientation,
    parallaxX,
    parallaxY,
    isSupported: isSupported && !prefersReducedMotion,
  };
};
