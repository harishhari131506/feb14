import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';
import { useState, useEffect } from 'react';

export const Scene11 = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-testid="scene-11"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#fff7ed',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene11.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Figure
            x={48}
            y={50}
            posture="straight"
            opacity={1}
          />
          <Figure
            x={52}
            y={50}
            posture="straight"
            opacity={1}
            rotate={-20}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '2.5rem',
            lineHeight: '1.4',
            color: '#c2410c',
            fontWeight: '700',
            zIndex: 30,
            textShadow: '0 4px 10px rgba(255,255,255,0.8)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.9 }}
            transition={{ duration: 1.5 }}
          >
            Go find them.<br />
            <span style={{ fontSize: '2rem', fontWeight: '400', color: '#9a3412' }}>Tell them this.</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
