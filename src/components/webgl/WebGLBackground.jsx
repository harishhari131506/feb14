import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * WebGL Background Component
 * Provides Three.js canvas for shader effects
 */
const WebGLBackground = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WebGLBackground;
