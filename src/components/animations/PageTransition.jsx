import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import soundManager from '../../utils/soundEffects';

/**
 * Awwwards-level page transition: "Unfolding Letter" effect
 * Pages unfold like opening a love letter
 */
const PageTransition = ({ children }) => {
  const location = useLocation();

  const variants = {
    initial: {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', // Folded (top edge only)
      filter: 'blur(10px)',
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Fully unfolded
      filter: 'blur(0px)',
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1], // Custom easing for elegant unfold
        clipPath: {
          duration: 1.0,
          ease: [0.76, 0, 0.24, 1],
        },
        filter: {
          duration: 0.8,
          delay: 0.2,
        },
      },
    },
    exit: {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', // Folds back down
      filter: 'blur(10px)',
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        clipPath: {
          duration: 0.6,
        },
      },
    },
  };

  // Play whoosh sound on transition
  React.useEffect(() => {
    soundManager.playWhoosh(0.4);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
