import { motion } from 'framer-motion';
import { Figure } from '../figures/Figure';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const OrbitalParticles = () => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const angle = (i / 150) * Math.PI * 2;
      const radius = 3 + Math.random() * 2; // Wide orbit
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2; // Height variance
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fb7185" // Coral
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const Scene4 = ({ progress }) => {
  // Scroll 30-45%
  const localProgress = Math.max(0, Math.min(1, (progress - 30) / 15));

  // Curved paths: start apart, curve inward
  // Start X: 30, 70 -> End X: 40, 60
  const f1X = 30 + (localProgress * 15); // 30 -> 45
  const f2X = 70 - (localProgress * 15); // 70 -> 55
  // Y dips slightly to simulate curve/orbit
  const curvature = Math.sin(localProgress * Math.PI) * 10;
  const fY = 50 + curvature;

  const text1Opacity = progress >= 32 ? 1 : 0;
  const text2Opacity = progress >= 38 ? 1 : 0;

  return (
    <div
      data-testid="scene-4"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#292524',
        overflow: 'hidden'
      }}
    >
      <img
        src="/templates/scrollstory/scene4.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #292524 0%, #78350f 100%)', // Darker warm background for orbit
          opacity: 0.9,
          zIndex: 1
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {/* 3D Orbitals */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <OrbitalParticles />
          </Canvas>
        </div>

        {/* Figures */}
        <Figure
          x={f1X}
          y={fY}
          posture="straight"
          opacity={1}
          rotate={localProgress * 10}
        />
        <Figure
          x={f2X}
          y={fY}
          posture="straight"
          opacity={1}
          rotate={-localProgress * 10}
        />

        {/* Visible Trails (SVG) */}
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <motion.path
            d={`M 30,50 Q ${30 + 15},${50 + 20} ${45},50`}
            fill="none"
            stroke="rgba(251, 113, 133, 0.4)" // Rose-400
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: localProgress }}
          />
          <motion.path
            d={`M 70,50 Q ${70 - 15},${50 + 20} ${55},50`}
            fill="none"
            stroke="rgba(251, 113, 133, 0.4)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: localProgress }}
          />
        </svg>

        {/* Text */}
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            width: '100%',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.6rem',
            color: '#fb7185', // Warm coral
            textShadow: '0 0 20px rgba(251, 113, 133, 0.3)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: text1Opacity, x: text1Opacity ? 0 : -20 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'left', marginLeft: '25%' }}
          >
            You don't walk toward them.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: text2Opacity, scale: text2Opacity ? 1.3 : 0.8 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{
              marginTop: '1rem',
              fontWeight: '800',
              fontSize: '3rem',
              color: '#fbbf24', // Gold
              textAlign: 'center'
            }}
          >
            You're PULLED.
          </motion.div>
        </div>
      </div>
    </div>
  );
};
