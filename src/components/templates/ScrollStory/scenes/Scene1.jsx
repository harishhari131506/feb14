import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';
import { ParticleSystem } from '../particles/ParticleSystem';

export const Scene1 = ({ progress }) => {
  // Scroll 0-8%
  // Figure walks slowly from left to right: 10% to 20%
  const figureX = 10 + (progress / 8) * 10;

  // Text appears at 3% scroll
  const textOpacity = progress >= 3 ? Math.min((progress - 3) / 2, 1) : 0;

  return (
    <div
      data-testid="scene-1"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#9ca3af',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene1.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #9ca3af 0%, #6b7280 100%)',
          opacity: 0.9,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <ParticleSystem count={40} color="#e5e7eb" speed={0.2} spread={15} />

        {/* Tired figure (center-left) */}
        <Figure
          x={figureX}
          y={50}
          posture="slumped"
          opacity={0.9}
          scale={1}
        />

        {/* Text: Bottom left, simple fade in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: textOpacity }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            maxWidth: '350px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.95)',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          There's a specific kind<br />
          of tiredness<br />
          that disappears<br />
          when you see them.
        </motion.div>
      </div>
    </div>
  );
};
