import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

export const Scene9 = ({ progress }) => {
  // Scroll 92-98%
  const localProgress = Math.max(0, Math.min(1, (progress - 92) / 6));

  // Zoom out effect
  const scale = 1.5 - localProgress * 0.7; // From 1.5 zoom to 0.8

  const text1Opacity = progress >= 93 ? 1 : 0;
  const text2Opacity = progress >= 95 ? 1 : 0;
  const text3Opacity = progress >= 97 ? 1 : 0;

  return (
    <div
      data-testid="scene-9"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#0f172a',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene9.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#0f172a',
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            transformOrigin: 'center center'
          }}
          animate={{ scale }}
          transition={{ duration: 0.5 }}
        >
          {/* Full Constellation Background */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  background: '#fff',
                  borderRadius: '50%',
                  opacity: Math.random()
                }}
              />
            ))}
          </div>

          {/* Center System */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Figure x={48} y={50} posture="straight" opacity={1} />
              <Figure x={52} y={50} posture="straight" opacity={1} />
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '600px',
                height: '600px',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: '50%', width: '20px', height: '20px', background: '#fbbf24', borderRadius: '50%', boxShadow: '0 0 10px #fbbf24' }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '15px', height: '15px', background: '#f87171', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, width: '18px', height: '18px', background: '#60a5fa', borderRadius: '50%' }} />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            width: '100%',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.5rem',
            lineHeight: '1.6',
            color: '#f8fafc',
            zIndex: 30,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text1Opacity }}
            transition={{ duration: 0.8 }}
          >
            And at the center of all of it—
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text2Opacity }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0.5rem' }}
          >
            always—
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: text3Opacity, scale: text3Opacity ? 1.2 : 0.9 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '1rem',
              fontWeight: '700',
              fontSize: '2rem',
              fontFamily: "'Playfair Display', serif",
              color: '#fbbf24'
            }}
          >
            you two.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
