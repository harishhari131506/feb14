import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';
import { ParticleSystem } from '../particles/ParticleSystem';

export const Scene2 = ({ progress }) => {
  // Scroll 8-18%
  // Local progress 0-1
  const localProgress = Math.max(0, Math.min(1, (progress - 8) / 10));

  // Figure 1 (Left) turns head towards right
  // We can simulate head turning with rotation or specific posture update if Figure supports it.
  // Using rotation for now as per previous code, or just static transition if 'turning' isn't a prop.
  // The spec says "Head turning". Let's assume Figure can handle a prop or we just rotate slightly.

  // Figure 2 (Right) materializes at edge
  const secondFigureOpacity = localProgress;

  // Text opacities based on absolute scroll %
  const text1Opacity = progress >= 8 ? 1 : 0;
  const text2Opacity = progress >= 12 ? 1 : 0;
  const text3Opacity = progress >= 15 ? 1 : 0;

  return (
    <div
      data-testid="scene-2"
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
        src="/templates/scrollstory/scene2.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          // Grey space warming from right
          background: `linear-gradient(90deg, #9ca3af 0%, #f3f4f6 ${localProgress * 100}%)`,
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <ParticleSystem count={30} color="#fcd34d" speed={0.3} spread={12} />

        {/* Figure 1: Turning Head */}
        <Figure
          x={20}
          y={50}
          posture="slumped"
          rotate={localProgress * 10} // Slight turn effect
          opacity={0.9}
        />

        {/* Figure 2: Materializing at far right */}
        <Figure
          x={90}
          y={50}
          posture="standing"
          opacity={secondFigureOpacity}
          scale={0.8} // Tiny/distant
        />

        {/* Light seeping from right */}
        <motion.div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '40%',
            height: '100%',
            background: 'linear-gradient(to left, rgba(253, 230, 138, 0.4), transparent)',
            opacity: localProgress,
            pointerEvents: 'none'
          }}
        />

        {/* Text: Left side, staggered */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: '40%',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.5rem',
            lineHeight: '1.6',
            color: '#f9fafb', // Warm white
            textShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: text1Opacity, y: text1Opacity ? 0 : 10 }}
            transition={{ duration: 1 }}
          >
            And then—
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: text2Opacity, y: text2Opacity ? 0 : 10 }}
            transition={{ duration: 1 }}
            style={{ marginTop: '0.5rem' }}
          >
            you hear their key
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: text3Opacity, y: text3Opacity ? 0 : 10 }}
            transition={{ duration: 1 }}
            style={{ marginTop: '0.5rem' }}
          >
            in the door.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
