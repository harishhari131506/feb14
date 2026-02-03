import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import confetti from 'canvas-confetti';

/**
 * Premium animated button with magnetic effect, glow, and particle system
 */
const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  magnetic = true,
  showParticles = true,
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Magnetic spring physics
  const stiffness = 150;
  const damping = 15;
  const mass = 0.1;
  
  const x = useSpring(0, { stiffness, damping, mass });
  const y = useSpring(0, { stiffness, damping, mass });
  
  // Shine effect coordinates
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  const handleMouseMove = (e) => {
    if (!ref.current || !magnetic || prefersReducedMotion) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull within radius
    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
    
    // Shine effect
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
    
    // Confetti burst on click
    if (showParticles && !prefersReducedMotion && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const xPos = (rect.left + rect.width / 2) / window.innerWidth;
      const yPos = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { x: xPos, y: yPos },
        colors: ['#FFE5E5', '#FFB6C1', '#F5EBE0', '#D4696A'],
        disableForReducedMotion: true,
      });
    }
  };

  // Dynamic gradient background for shine
  const shineBackground = useMotionTemplate`radial-gradient(
    circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 50%
  )`;

  const baseStyles = "relative px-10 py-4 rounded-full font-medium text-base transition-all duration-500 overflow-hidden cursor-pointer";
  
  const variants = {
    primary: "bg-muted-red text-white hover:bg-rose-gold hover:text-soft-black shadow-md hover:shadow-lg shadow-muted-red/20",
    secondary: "bg-white text-rose-600 border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50/50 shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-neutral-600 hover:text-rose-600 hover:bg-rose-50/30 border border-transparent hover:border-rose-100"
  };

  return (
    <motion.button
      ref={ref}
      style={magnetic && !prefersReducedMotion ? { x, y } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={!prefersReducedMotion ? {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }
      } : {}}
      whileTap={!prefersReducedMotion ? {
        scale: 0.97,
        transition: { duration: 0.1 }
      } : {}}
      className={cn(baseStyles, variants[variant], className)}
    >
      {/* Animated gradient border (rotating) */}
      {!prefersReducedMotion && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #DC267F, #FFB6C1, #F5EBE0, #DC267F)',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Glow pulse effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-muted-red/30 blur-2xl rounded-full -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ background: shineBackground, opacity: hovered ? 1 : 0 }}
      />

      {/* Particle hearts inside button (subtle) */}
      {showParticles && !prefersReducedMotion && hovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/30 text-xs"
              initial={{
                x: '50%',
                y: '50%',
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </>
      )}

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
