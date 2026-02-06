import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

export const Scene10 = ({ progress }) => {
  // Scroll 98-100%
  const localProgress = Math.max(0, Math.min(1, (progress - 98) / 2));

  const text1Opacity = progress >= 98 ? 1 : 0;
  const text2Opacity = progress >= 99 ? 1 : 0;
  const text3Opacity = progress >= 99.5 ? 1 : 0;

  return (
    <div
      data-testid="scene-10"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#fef3c7',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene10.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%)',
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '10%', background: 'rgba(251, 191, 36, 0.1)', borderRight: '1px solid rgba(0,0,0,0.05)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '10%', background: 'rgba(251, 191, 36, 0.1)', borderLeft: '1px solid rgba(0,0,0,0.05)' }} />

        <motion.div
          animate={{ rotate: 3 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253, 186, 116, 0.1) 0%, transparent 60%)',
          }}
        />

        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Figure x={48} y={50} posture="straight" opacity={1} />
          <Figure x={52} y={50} posture="straight" opacity={1} />
        </div>

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + Math.random(), repeat: Infinity, delay: Math.random() }}
            style={{
              position: 'absolute',
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
              width: '6px',
              height: '6px',
              background: '#fbbf24',
              borderRadius: '50%',
              zIndex: 5
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            width: '100%',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.6rem',
            lineHeight: '1.6',
            color: '#854d0e',
            zIndex: 30
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text1Opacity }}
            transition={{ duration: 0.8 }}
          >
            This is what you built:
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text2Opacity }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0.5rem' }}
          >
            A world where being together
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: text3Opacity, y: text3Opacity ? 0 : 10 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '0.5rem',
              fontWeight: '600',
              color: '#d97706'
            }}
          >
            is the best place to be.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
