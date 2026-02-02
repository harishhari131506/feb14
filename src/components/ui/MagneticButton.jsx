import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { cn } from '../../utils/cn';

const MagneticButton = ({ children, className = '', onClick }) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    // Spring config for magnetic pull
    const stiffness = 150;
    const damping = 15;
    const mass = 0.1;

    const x = useSpring(0, { stiffness, damping, mass });
    const y = useSpring(0, { stiffness, damping, mass });

    // Shine effect coordinates
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Magnetic pull calculation
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Limit the magnetic pull radius
        if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
            x.set(distanceX * 0.3);
            y.set(distanceY * 0.3);
        } else {
            x.set(0);
            y.set(0);
        }

        // Shine effect calculation relative to button
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

        // Confetti burst
        const rect = ref.current.getBoundingClientRect();
        const xPos = (rect.left + rect.width / 2) / window.innerWidth;
        const yPos = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 60,
            spread: 50,
            origin: { x: xPos, y: yPos },
            colors: ['#FFE5E5', '#FFB6C1', '#F5EBE0', '#D4696A'],
            disableForReducedMotion: true
        });
    };

    // Dynamic gradient background for shine
    const shineBackground = useMotionTemplate`radial-gradient(
    circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 50%
  )`;

    return (
        <motion.button
            ref={ref}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn("relative overflow-hidden px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-soft-rose/50 transition-shadow", className)}
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-muted-red via-blush-pink to-muted-red bg-[length:200%_100%] animate-bg-pan opacity-90" />

            {/* Shine Overlay */}
            <motion.div
                className="absolute inset-0"
                style={{ background: shineBackground, opacity: hovered ? 1 : 0 }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center text-white tracking-wide font-inter">
                {children}
            </span>
        </motion.button>
    );
};

export default MagneticButton;
