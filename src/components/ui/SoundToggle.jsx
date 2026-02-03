import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import soundManager from '../../utils/soundEffects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Sound Toggle Component
 * Allows users to enable/disable sound effects
 */
const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Enable sound on first user interaction
    const enableOnInteraction = async () => {
      if (!enabled) return;
      await soundManager.enable();
    };

    if (enabled) {
      enableOnInteraction();
    } else {
      soundManager.disable();
    }
  }, [enabled]);

  if (prefersReducedMotion) return null;

  const handleToggle = async () => {
    const newState = !enabled;
    setEnabled(newState);
    
    if (newState) {
      await soundManager.enable();
      // Play test sound
      soundManager.playPenClick();
    } else {
      soundManager.disable();
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-muted-red" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-400" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
