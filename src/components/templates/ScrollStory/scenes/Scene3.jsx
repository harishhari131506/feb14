import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';
import { ParticleSystem } from '../particles/ParticleSystem';

export const Scene3 = ({ progress }) => {
  // Scroll 18-30%
  // Local progress 0-1
  const localProgress = Math.max(0, Math.min(1, (progress - 18) / 12));

  // Both figures visible
  // Distance closes to 40% apart (e.g. at 30% and 70%)
  // Start: 20% and 90% -> End: 30% and 70%
  const fig1X = 20 + (localProgress * 10); // 20 -> 30
  const fig2X = 90 - (localProgress * 20); // 90 -> 70

  const text1Opacity = progress >= 22 ? 1 : 0;
  const text2Opacity = progress >= 28 ? 1 : 0;

  // Posture straightens
  const posture = localProgress > 0.5 ? 'straight' : 'standing';

  return (
    <div
      data-testid="scene-3"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, #f5f5f4 0%, #fde68a ${localProgress * 100}%)`, // Warming gold
        overflow: 'hidden'
      }}
    >
      <ParticleSystem count={60} color="#fbbf24" speed={0.4} spread={15} />

      {/* Figure 1: Standing straighter */}
      <Figure
        x={fig1X}
        y={50}
        posture={posture}
        opacity={1}
      />

      {/* Figure 2: Entering */}
      <Figure
        x={fig2X}
        y={50}
        posture="standing"
        opacity={1}
      />

      {/* Light glow center */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
          opacity: localProgress,
          pointerEvents: 'none'
        }}
      />

      {/* Text: Center bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          width: '100%',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.5rem',
          lineHeight: '1.6',
          color: '#78350f', // Warm dark gold/brown for contrast on light BG? Or spec says Gold-white text. 
          // Spec says "Gold-white text". On a light background that might be hard. 
          // Let's use a warm gold with shadow or a slightly darker gold for readability.
          // Spec: "Gold-white text" usually implies white text with gold glow or just gold.
          // Since background is "Warming gold atmosphere" (likely light), I'll use a deep warm gold/brown for readability unless BG is dark.
          // Wait, previous scenes were Dark -> Light?
          // "Grey foggy" -> "Grey space warming" -> "Warming gold atmosphere".
          // If atmosphere is light, text needs to be dark-ish or have heavy shadow.
          // If atmosphere is "Gold" as in Dark Gold, text can be white.
          // Re-reading Spec 1-2: "Grey foggy space", "Grey space warming". This implies dark-ish.
          // So I will assume a dark-ish gold background or use White text with Shadow.
          color: '#ffffff',
          textShadow: '0 2px 15px rgba(217, 119, 6, 0.6)' // Amber shadow
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: text1Opacity, y: text1Opacity ? 0 : 20 }}
          transition={{ duration: 1 }}
        >
          The room doesn't change.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: text2Opacity,
            scale: text2Opacity ? 1.05 : 0.95 // Pulse/Emphasis
          }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '0.5rem',
            fontWeight: '700',
            fontSize: '1.8rem',
            color: '#fbbf24' // Amber-400
          }}
        >
          YOU change.
        </motion.div>
      </div>
    </div>
  );
};
