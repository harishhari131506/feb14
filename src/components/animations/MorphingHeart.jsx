import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Signature Awwwards-level animation: Morphing Particle Heart
 * Particles float randomly, then form into heart shape on trigger
 * Inspired by Apple events and Spotify Wrapped
 */
const MorphingHeart = ({ trigger = false, particleCount = 200 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isForming, setIsForming] = useState(false);

  // Heart shape coordinates (normalized)
  const heartShape = [
    { x: 0.5, y: 0.3 }, // Top center
    { x: 0.35, y: 0.4 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.35, y: 0.75 },
    { x: 0.5, y: 0.8 },
    { x: 0.65, y: 0.75 },
    { x: 0.75, y: 0.65 },
    { x: 0.75, y: 0.5 },
    { x: 0.65, y: 0.4 },
  ];

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Initialize particles in random positions
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      targetX: Math.random() * canvas.width,
      targetY: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `hsl(${350 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        if (isForming) {
          // Move towards heart shape
          const heartPoint = heartShape[
            Math.floor((particle.x / canvas.width) * heartShape.length)
          ];
          if (heartPoint) {
            particle.targetX = heartPoint.x * canvas.width;
            particle.targetY = heartPoint.y * canvas.height;
          }
        } else {
          // Random movement
          particle.targetX += particle.vx;
          particle.targetY += particle.vy;
          
          if (particle.targetX < 0 || particle.targetX > canvas.width) particle.vx *= -1;
          if (particle.targetY < 0 || particle.targetY > canvas.height) particle.vy *= -1;
        }

        // Smooth interpolation
        particle.x += (particle.targetX - particle.x) * 0.05;
        particle.y += (particle.targetY - particle.y) * 0.05;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isForming, prefersReducedMotion, particleCount]);

  useEffect(() => {
    if (trigger && !isForming) {
      setIsForming(true);
      setTimeout(() => setIsForming(false), 3000);
    }
  }, [trigger, isForming]);

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-6xl">❤️</div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default MorphingHeart;
