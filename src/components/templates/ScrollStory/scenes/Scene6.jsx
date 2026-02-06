import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

const Symbol = ({ type, x, y, delay = 0 }) => {
  const symbols = {
    circle: <circle cx="30" cy="30" r="15" stroke="rgba(72, 187, 181, 0.8)" strokeWidth="3" fill="none" />,
    triangle: <polygon points="30,15 45,45 15,45" stroke="rgba(255, 127, 80, 0.8)" strokeWidth="3" fill="none" />,
    wave: <path d="M 10,30 Q 20,20 30,30 T 50,30" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="3" fill="none" />,
    diamond: <rect x="20" y="20" width="20" height="20" transform="rotate(45 30 30)" stroke="rgba(216, 180, 254, 0.8)" strokeWidth="3" fill="none" />
  };

  return (
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0, -10, 0]
      }}
      transition={{
        delay,
        opacity: { duration: 0.5 },
        scale: { duration: 2, repeat: Infinity },
        rotate: { duration: 3, repeat: Infinity }
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {symbols[type]}
    </motion.svg>
  );
};

export const Scene6 = ({ progress }) => {
  // Scroll 58-70%
  // Figures static, facing each other.

  const symbol1Visible = progress >= 60; // Circle
  const symbol2Visible = progress >= 63; // Triangle + Circle transforms (handled by just adding type here for simplicity or stacking)
  const symbol3Visible = progress >= 66; // Bounce/Mix
  const allSymbolsGlow = progress >= 69;

  const text1Opacity = progress >= 60 ? 1 : 0;
  const text2Opacity = progress >= 63 ? 1 : 0;
  const text3Opacity = progress >= 66 ? 1 : 0;
  const text4Opacity = progress >= 69 ? 1 : 0;

  return (
    <div
      data-testid="scene-6"
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
        src="/templates/scrollstory/scene6.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)', // Warm ambient glow
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {/* Ambient glow center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Figures facing each other */}
        <Figure
          x={35}
          y={50}
          posture="standing"
          rotate={15} // Facing right
          opacity={1}
        />

        <Figure
          x={65}
          y={50}
          posture="standing"
          rotate={-15} // Facing left
          opacity={1}
        />

        {/* Symbols between them */}
        {symbol1Visible && <Symbol type="circle" x={50} y={45} delay={0} />}
        {symbol2Visible && <Symbol type="triangle" x={50} y={55} delay={0.2} />}
        {symbol3Visible && (
          <>
            <Symbol type="wave" x={45} y={50} delay={0.4} />
            <Symbol type="diamond" x={55} y={50} delay={0.6} />
          </>
        )}

        {/* Glow effect when all symbols present */}
        {allSymbolsGlow && (
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(72, 187, 181, 0.3) 0%, transparent 70%)', // Teal glow
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Text: Left side, Vertical stack */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: '30%',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.4rem',
            lineHeight: '1.8',
            color: '#78350f', // Warm dark
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            maxWidth: '400px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: text1Opacity, x: text1Opacity ? 0 : -10 }}
            transition={{ duration: 0.8 }}
          >
            You make a face.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: text2Opacity, x: text2Opacity ? 0 : -10 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0.5rem' }}
          >
            They make the face back.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: text3Opacity, x: text3Opacity ? 0 : -10 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0.5rem' }}
          >
            No one else knows what it means.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: text4Opacity, scale: text4Opacity ? 1.05 : 0.9 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '1.5rem',
              fontWeight: '700',
              fontSize: '1.8rem',
              fontFamily: "'Inter', sans-serif", // Spec said sans-serif warm
              color: '#14b8a6' // Teal-500
            }}
          >
            THAT'S THE WHOLE POINT.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
