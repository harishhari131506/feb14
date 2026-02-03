import React, { useState, useEffect, useRef } from 'react';
import Section from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';

const testimonials = [
    {
        id: 1,
        name: "Sarah & Michael",
        role: "Long Distance",
        text: "He cried when he opened it. It felt closer than a call—like opening a letter I wrote just for him.",
        rating: 5
    },
    {
        id: 2,
        name: "James R.",
        role: "Anniversary",
        text: "I'm not good at expressing feelings, but this made it easy. She saved it and looks at it every day.",
        rating: 5
    },
    {
        id: 3,
        name: "Emily & Kay",
        role: "Just Because",
        text: "We captured our favorite memories in a way that feels timeless. The music choice was the perfect touch.",
        rating: 5
    }
];

const StarRating = ({ rating, delay = 0 }) => {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <div className="flex gap-1 justify-center mb-6">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        delay: prefersReducedMotion ? 0 : delay + i * 0.1,
                        duration: 0.3,
                        ease: "back.out(1.7)",
                    }}
                    className="text-yellow-400 text-xl"
                >
                    ⭐
                </motion.div>
            ))}
        </div>
    );
};

const Avatar = ({ name, index }) => {
    const avatarRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!avatarRef.current || prefersReducedMotion) return;

        // Circular reveal animation
        gsap.fromTo(avatarRef.current,
            {
                scale: 0,
                rotation: -180,
            },
            {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: index * 0.1,
            }
        );

        // Spinning border on hover
        const border = avatarRef.current.querySelector('.avatar-border');
        if (border) {
            gsap.to(border, {
                rotation: 360,
                duration: 2,
                repeat: Infinity,
                ease: "none",
            });
        }
    }, [index, prefersReducedMotion]);

    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
    const colors = ['#FFE5E5', '#F5EBE0', '#E8C4B8'];
    const bgColor = colors[index % colors.length];

    return (
        <div
            ref={avatarRef}
            className="relative w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden"
            style={{ backgroundColor: bgColor }}
        >
            <div className="absolute inset-0 flex items-center justify-center font-playfair text-muted-red text-xl font-semibold">
                {initials}
            </div>
            <motion.div
                className="avatar-border absolute inset-0 rounded-full border-2 border-muted-red/30"
                style={{
                    borderStyle: 'dashed',
                }}
            />
        </div>
    );
};

const SocialProof = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!isAutoPlaying || prefersReducedMotion) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, prefersReducedMotion]);

    // Floating heart confetti background
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current) return;

        const hearts = [];
        const count = 8;

        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'absolute text-rose-gold/10 text-xl pointer-events-none';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${12 + Math.random() * 8}px`;
            
            containerRef.current.appendChild(heart);
            hearts.push(heart);

            gsap.to(heart, {
                y: `+=${Math.random() * 100 - 50}`,
                x: `+=${Math.random() * 100 - 50}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.5,
            });
        }

        return () => {
            hearts.forEach(heart => heart.remove());
        };
    }, [prefersReducedMotion]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <Section className="bg-cream relative overflow-hidden" id="love-notes" ref={containerRef}>
            <div className="flex flex-col items-center justify-center py-12 md:py-24 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="font-dancing text-5xl md:text-6xl text-muted-red mb-6"
                    >
                        Love Notes
                    </motion.h2>
                </motion.div>

                {/* Testimonial Card */}
                <div className="relative w-full max-w-3xl min-h-[400px] flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ 
                                opacity: 0, 
                                x: 100,
                                scale: 1.05,
                                filter: 'blur(10px)',
                            }}
                            animate={{ 
                                opacity: 1, 
                                x: 0,
                                scale: 1,
                                filter: 'blur(0px)',
                            }}
                            exit={{ 
                                opacity: 0, 
                                x: -100,
                                scale: 0.95,
                                filter: 'blur(10px)',
                            }}
                            transition={{ 
                                duration: prefersReducedMotion ? 0.3 : 0.8, 
                                ease: "easeOut" 
                            }}
                            className="bg-white/85 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-2xl p-10 md:p-16 text-center w-full mx-4"
                        >
                            {/* Quote marks with SVG animation */}
                            {!prefersReducedMotion && (
                                <motion.div
                                    className="absolute top-6 left-6 text-rose-gold/30 text-6xl font-playfair"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    "
                                </motion.div>
                            )}

                            <motion.div
                                className="flex justify-center mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.5, ease: "back.out(1.7)" }}
                            >
                                <Heart className="w-8 h-8 text-rose-gold/80" fill="currentColor" />
                            </motion.div>

                            <StarRating rating={testimonials[currentIndex].rating} delay={0.3} />

                            <motion.blockquote
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="font-playfair text-2xl md:text-3xl text-soft-black leading-relaxed mb-10"
                            >
                                "{testimonials[currentIndex].text}"
                            </motion.blockquote>

                            <Avatar name={testimonials[currentIndex].name} index={currentIndex} />

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="font-inter"
                            >
                                <cite className="not-italic font-medium text-lg text-soft-black block mb-1">
                                    {testimonials[currentIndex].name}
                                </cite>
                                <span className="text-sm text-gray-500 uppercase tracking-widest">
                                    {testimonials[currentIndex].role}
                                </span>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots with magnetic effect */}
                    <div className="flex gap-4 mt-12">
                        {testimonials.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300 relative",
                                    index === currentIndex
                                        ? "bg-rose-gold w-3 scale-110"
                                        : "bg-gray-300 hover:bg-gray-400"
                                )}
                                whileHover={!prefersReducedMotion ? { scale: 1.3 } : {}}
                                whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
                                animate={index === currentIndex && !prefersReducedMotion ? {
                                    scale: [1.1, 1.2, 1.1],
                                } : {}}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                aria-label={`Go to testimonial ${index + 1}`}
                            >
                                {index === currentIndex && !prefersReducedMotion && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-rose-gold/30"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                        }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Subtle Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center opacity-60"
                >
                    <p className="font-inter text-sm text-gray-500 tracking-wide">
                        12,847 messages sent with love
                    </p>
                </motion.div>
            </div>
        </Section>
    );
};

export default SocialProof;
