import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';

export const Scene5 = ({ progress }) => {
  // Scroll 45-58%
  const localProgress = Math.max(0, Math.min(1, (progress - 45) / 13));

  const isCollision = progress >= 48 && progress < 50;
  const isAfterCollision = progress >= 50;

  // Figures meet at 48%
  // Start 45% -> 48% (closing distance)
  const approachProgress = Math.min(1, (progress - 45) / 3);
  const figureDistance = Math.max(0, 10 - approachProgress * 10);

  const blurAmount = isAfterCollision ? Math.min((progress - 50) / 4 * 10, 8) : 0;

  // Text Timings
  const text1Opacity = progress >= 45 ? 1 : 0; // "And when you reach them-"
  const text2Opacity = progress >= 50 ? 1 : 0; // "everything else"
  const text3Opacity = progress >= 54 ? 1 : 0; // "goes QUIET"

  return (
    <div
      data-testid="scene-5"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#78350f',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene5.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #78350f 0%, #fbbf24 100%)', // Transitioning from dark warm to gold/joyful
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {/* Background blur effect */}
        <motion.div
          animate={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            opacity: isAfterCollision ? 1 : 0
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.1)', // Soft overlay
            zIndex: 5
          }}
        />

        {/* Collision burst */}
        {isCollision && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(251, 191, 36, 0.5) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 20
            }}
          />
        )}

        {/* Radiating particles from collision */}
        {isAfterCollision && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos((i / 20) * Math.PI * 2) * 300,
                  y: Math.sin((i / 20) * Math.PI * 2) * 300,
                  opacity: 0,
                  scale: 1
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#fff',
                  pointerEvents: 'none',
                  zIndex: 15
                }}
              />
            ))}
          </>
        )}

        {/* Figures */}
        {!isAfterCollision ? (
          <>
            {/* Moving together */}
            <Figure
              x={50 - figureDistance}
              y={50}
              posture="straight"
              opacity={0.9}
            />
            <Figure
              x={50 + figureDistance}
              y={50}
              posture="straight"
              opacity={0.9}
            />
          </>
        ) : (
          /* Together close with halo */
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Figure x={48} y={50} posture="straight" opacity={1} />
            <Figure x={52} y={50} posture="straight" opacity={1} />

            {/* Orbital halo */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                pointerEvents: 'none'
              }}
            />
          </div>
        )}

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            top: '65%', // Top of bottom third roughly
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.5rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.95)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            maxWidth: '600px',
            zIndex: 30
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text1Opacity }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            And when you reach them—
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: text2Opacity }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '1.25rem' }}
          >
            everything else
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: text3Opacity, scale: text3Opacity ? 1.1 : 0.9 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '0.5rem',
              fontWeight: '700', // Bold/Emphasized
              fontSize: '2.5rem',
              fontFamily: "'Playfair Display', serif",
              color: '#e879f9' // Lavender-gold feel (Fuchsia-400)
            }}
          >
            goes QUIET.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
