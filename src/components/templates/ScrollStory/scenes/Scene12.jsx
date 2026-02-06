import { motion } from 'framer-motion';

export const Scene12 = () => {
  return (
    <div
      data-testid="scene-12"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#fff7ed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene12.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff7ed', // Solid background color as overlay base
          opacity: 0.85,
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{ fontSize: '1.5rem', color: '#9a3412', marginBottom: '0.5rem' }}>
            Send this to the person
          </p>
          <p style={{ fontSize: '1.5rem', color: '#9a3412', marginBottom: '0.5rem' }}>
            who makes your world
          </p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ea580c' }}>
            lighter.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '1rem 3rem',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#fff',
            background: '#ea580c',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(234, 88, 12, 0.4)',
            marginBottom: '1.5rem'
          }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'The Journey',
                text: 'A story for you.',
                url: window.location.href,
              });
            } else {
              alert('Copied to clipboard!');
            }
          }}
        >
          Share This
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            background: 'none',
            border: 'none',
            color: '#9a3412',
            fontSize: '0.9rem',
            opacity: 0.7,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onClick={() => window.location.reload()}
        >
          Keep this for yourself (Replay)
        </motion.button>
      </div>
    </div>
  );
};
