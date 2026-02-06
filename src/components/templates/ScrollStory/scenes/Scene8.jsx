import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

const Moment = ({ label, x, y, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 5
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: ['0 0 10px rgba(251, 191, 36, 0.4)', '0 0 20px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.4)']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          padding: '10px 20px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          color: '#78350f',
          fontWeight: '500',
          border: '1px solid #fbbf24'
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export const Scene8 = ({ progress }) => {
  // Scroll 82-92%
  const localProgress = Math.max(0, Math.min(1, (progress - 82) / 10));

  const moment1 = progress >= 83; // Laugh
  const moment2 = progress >= 85; // Dance
  const moment3 = progress >= 87; // Coffee
  const moment4 = progress >= 89; // Road
  const moment5 = progress >= 91; // Quiet

  const text1Opacity = progress >= 84 ? 1 : 0;
  const text2Opacity = progress >= 88 ? 1 : 0;

  const moments = [
    { label: '✨ Laugh', x: 20, y: 25, visible: moment1, delay: 0 },
    { label: '✨ Dance', x: 50, y: 15, visible: moment2, delay: 0 },
    { label: '✨ Coffee', x: 80, y: 25, visible: moment3, delay: 0 },
    { label: '✨ Road', x: 25, y: 75, visible: moment4, delay: 0 },
    { label: '✨ Quiet', x: 75, y: 70, visible: moment5, delay: 0 }
  ];

  return (
    <div
      data-testid="scene-8"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#fb7185',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene8.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #fb7185 0%, #fbbf24 100%)', // Coral-gold joy
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {/* Couple at center */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Figure x={48} y={50} posture="straight" opacity={1} />
          <Figure x={52} y={50} posture="straight" opacity={1} />
        </div>

        {/* Constellation Threads */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {moments.map((moment, index) => (
            moment.visible && (
              <motion.line
                key={index}
                x1="50%"
                y1="50%"
                x2={`${moment.x}%`}
                y2={`${moment.y}%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          ))}
        </svg>

        {/* Moments */}
        {moments.map((moment, index) => (
          moment.visible && (
            <Moment
              key={index}
              label={moment.label}
              x={moment.x}
              y={moment.y}
              delay={0}
            />
          )
        ))}

        {/* Rotating entire system slowly */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, transparent 40%, rgba(255,255,255,0.1) 60%)',
            pointerEvents: 'none'
          }}
        />

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%', // Bottom
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '100%',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.6rem',
            lineHeight: '1.6',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 30
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text1Opacity }}
            transition={{ duration: 0.8 }}
          >
            They don't fix your bad day.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: text2Opacity, scale: text2Opacity ? 1.1 : 0.9 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '0.5rem',
              fontWeight: '800',
              fontSize: '2.2rem',
              color: '#fff',
              textShadow: '0 4px 12px rgba(251, 191, 36, 0.6)'
            }}
          >
            They DOUBLE your good ones.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
