import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Liquid Morphing Shader Material
 * Creates organic, flowing liquid-like distortion effects
 */
const LiquidMorphMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 1.0,
    uIntensity: 0.5,
    uColor1: new THREE.Color('#FFE5E5'),
    uColor2: new THREE.Color('#FFB6C1'),
  },
  // Vertex Shader
  `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      // Add subtle wave distortion
      pos.z += sin(pos.x * 0.1 + uTime) * 0.1;
      pos.z += cos(pos.y * 0.1 + uTime) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uIntensity;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Noise function for organic movement
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Create flowing liquid effect
      vec2 flow = vec2(
        fbm(uv * 3.0 + uTime * uSpeed * 0.5),
        fbm(uv * 3.0 + uTime * uSpeed * 0.5 + 100.0)
      );
      
      uv += flow * uIntensity;
      
      // Gradient with noise for organic feel
      float gradient = mix(
        fbm(uv * 2.0 + uTime * uSpeed),
        fbm(uv * 4.0 - uTime * uSpeed),
        0.5
      );
      
      vec3 color = mix(uColor1, uColor2, gradient);
      
      // Add depth with subtle lighting
      float depth = sin(vPosition.z * 0.1 + uTime) * 0.5 + 0.5;
      color *= (0.8 + depth * 0.2);
      
      gl_FragColor = vec4(color, 0.6);
    }
  `
);

extend({ LiquidMorphMaterial });

const LiquidMorph = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  speed = 0.5,
  intensity = 0.5,
  color1 = '#FFE5E5',
  color2 = '#FFB6C1',
}) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!materialRef.current || prefersReducedMotion) return;

    materialRef.current.uniforms.uTime.value += delta * speed;

    // Subtle rotation for dynamic feel
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <liquidMorphMaterial
        ref={materialRef}
        uSpeed={speed}
        uIntensity={intensity}
        uColor1={new THREE.Color(color1)}
        uColor2={new THREE.Color(color2)}
        transparent
      />
    </mesh>
  );
};

export default LiquidMorph;
