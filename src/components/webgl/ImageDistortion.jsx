import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Image Distortion Shader
 * Distorts images based on scroll position for dynamic effect
 */
const DistortionMaterial = shaderMaterial(
  {
    uTexture: null,
    uTime: 0,
    uDistortion: 0,
    uScrollProgress: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uDistortion;
    uniform float uScrollProgress;
    
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Wave distortion based on scroll
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * uDistortion * uScrollProgress;
      uv.x += wave * 0.1;
      
      // Ripple effect
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(uv, center);
      float ripple = sin(dist * 20.0 - uTime * 3.0) * uDistortion * uScrollProgress * 0.05;
      uv += normalize(uv - center) * ripple;
      
      // Sample texture with distortion
      vec4 color = texture2D(uTexture, uv);
      
      // Add subtle chromatic aberration on scroll
      float chroma = uDistortion * uScrollProgress * 0.02;
      color.r = texture2D(uTexture, uv + vec2(chroma, 0.0)).r;
      color.b = texture2D(uTexture, uv - vec2(chroma, 0.0)).b;
      
      gl_FragColor = color;
    }
  `
);

extend({ DistortionMaterial });

const ImageDistortion = ({ imageSrc, position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  const scroll = useScroll();

  const texture = useLoader(THREE.TextureLoader, imageSrc);

  useFrame((state, delta) => {
    if (!materialRef.current || prefersReducedMotion) return;

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uScrollProgress.value = scroll.offset;
    materialRef.current.uniforms.uDistortion.value = Math.sin(state.clock.elapsedTime) * 0.5 + 0.5;
  });

  if (prefersReducedMotion) {
    return (
      <mesh position={position} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    );
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <distortionMaterial
        ref={materialRef}
        uTexture={texture}
        uDistortion={0.3}
      />
    </mesh>
  );
};

export default ImageDistortion;
