import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

export const Scene7 = ({ progress }) => {
  // Scroll 70-82%
  const localProgress = Math.max(0, Math.min(1, (progress - 70) / 12));

  // Dark shape shrinks from medium (200px) to zero
  const worrySize = Math.max(200 - localProgress * 200, 0);
  const worryOpacity = Math.max(0.8 - localProgress * 0.8, 0);

  // Light expands from center (couple)
  const lightRadius = 100 + localProgress * 800; // Explodes out to cover screen

  const text1Opacity = progress >= 72 ? 1 : 0;
  const text2Opacity = progress >= 76 ? 1 : 0;
  const text3Opacity = progress >= 79 ? 1 : 0;
  // "smaller" text literally gets smaller
  const text3Scale = progress >= 79 ? Math.max(0.5, 1 - (progress - 79) * 0.1) : 1;

  return (
    <div
      data-testid="scene-7"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#e5e7eb', // Light grey base, gets covered by light
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene7.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#e5e7eb', // Light grey base
          opacity: 0.7, // Lower opacity since it's just grey
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {/* Dark shape (Worry) Top Left */}
        <motion.div
          animate={{
            width: `${worrySize}px`,
            height: `${worrySize}px`,
            opacity: worryOpacity
          }}
          style={{
            position: 'absolute',
            left: '20%',
            top: '20%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', // Blobby
            background: '#1f2937', // Dark grey
            filter: 'blur(20px)',
            zIndex: 20
          }}
        />

        {/* Couple at center - Source of light */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Figure x={48} y={50} posture="straight" opacity={1} />
          <Figure x={52} y={50} posture="straight" opacity={1} />
        </div>

        {/* Expanding light from couple */}
        <motion.div
          animate={{
            width: `${lightRadius}px`,
            height: `${lightRadius}px`,
            opacity: 1
          }}
          transition={{
            duration: 0.1 // Instant update with scroll basically
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254, 243, 199, 0.8) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 5
          }}
        />

        {/* Text: Center Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.5rem',
            lineHeight: '1.6',
            color: '#b45309', // Dark amber for readability on light BG
            zIndex: 30,
            width: '100%',
            maxWidth: '700px'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text1Opacity }}
            transition={{ duration: 0.8 }}
          >
            Suddenly the thing you were worried about
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text2Opacity }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0.5rem' }}
          >
            feels...
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{
              opacity: text3Opacity,
              scale: text3Scale
            }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '700',
              color: '#d97706', // Amber-600
              display: 'inline-block'
            }}
          >
            smaller.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
