import React, { useRef, useEffect, useState } from 'react';
import Button from '../ui/Button';
import AnimatedButton from '../ui/AnimatedButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import confetti from 'canvas-confetti';
import soundManager from '../../utils/soundEffects';

gsap.registerPlugin(ScrollTrigger);

const Urgency = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isPastFeb14 = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14);
    const targetYear = isPastFeb14 ? currentYear + 1 : currentYear;

    const feb14 = new Date(targetYear, 1, 14);
    const diffTime = Math.abs(feb14 - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const containerRef = useRef(null);
    const badgeRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reminder-content", {
                y: 20,
                opacity: 0,
                duration: prefersReducedMotion ? 0.3 : 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });

            // Pulsing glow on badge
            if (badgeRef.current && !prefersReducedMotion) {
                gsap.to(badgeRef.current, {
                    boxShadow: '0 0 20px rgba(220, 38, 127, 0.5), 0 0 40px rgba(220, 38, 127, 0.3)',
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    // Countdown timer with 3D flip effect
    const CountdownDigit = ({ value, label }) => {
        const [displayValue, setDisplayValue] = useState(value);
        const [isFlipping, setIsFlipping] = useState(false);

        useEffect(() => {
            if (displayValue !== value) {
                setIsFlipping(true);
                setTimeout(() => {
                    setDisplayValue(value);
                    setIsFlipping(false);
                }, 300);
            }
        }, [value, displayValue]);

        return (
            <div className="flex flex-col items-center">
                <motion.div
                    className="relative w-16 h-20 bg-white rounded-lg shadow-lg overflow-hidden"
                    animate={isFlipping && !prefersReducedMotion ? {
                        rotateX: [0, -90, 0],
                    } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-muted-red">
                        {displayValue}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
                </motion.div>
                <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{label}</span>
            </div>
        );
    };

    const days = Math.floor(diffDays);
    const hours = 24 - now.getHours();
    const minutes = 60 - now.getMinutes();

    return (
        <section 
            ref={containerRef} 
            className="w-full py-20 flex flex-col items-center justify-center bg-white/50 relative overflow-hidden"
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-soft-rose/5 -z-10"
                animate={!prefersReducedMotion ? {
                    backgroundPosition: ['0% 0%', '100% 100%'],
                } : {}}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />

            <div className="text-center z-10 px-6 max-w-2xl mx-auto">
                {/* Urgency Badge */}
                <motion.div
                    ref={badgeRef}
                    className="reminder-content flex justify-center mb-6"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <motion.div
                        className="w-12 h-12 rounded-full bg-soft-rose/20 flex items-center justify-center text-muted-red shadow-sm relative"
                        animate={isHovered && !prefersReducedMotion ? {
                            y: [0, -5, 0],
                            rotate: [0, 5, -5, 0],
                        } : {
                            y: [0, -3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Calendar size={24} />
                        {!prefersReducedMotion && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-muted-red/30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            />
                        )}
                    </motion.div>
                </motion.div>

                <h2 className="reminder-content font-playfair text-3xl md:text-4xl text-soft-black mb-4">
                    Valentine's Day is approaching
                </h2>

                {/* Countdown Timer */}
                {diffDays < 365 && !prefersReducedMotion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center gap-4 mb-8"
                    >
                        <CountdownDigit value={days} label="Days" />
                        <CountdownDigit value={hours} label="Hours" />
                        <CountdownDigit value={minutes} label="Minutes" />
                    </motion.div>
                )}

                <motion.p
                    className="reminder-content font-inter text-gray-500 mb-8 font-light text-lg leading-relaxed"
                    animate={!prefersReducedMotion ? {
                        color: ['#6B7280', '#DC267F', '#6B7280'],
                    } : {}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                >
                    {diffDays < 365 ? (
                        <span className="font-medium text-muted-red block mb-2">
                            February 14 is in {diffDays} days.
                        </span>
                    ) : (
                        <span className="font-medium text-muted-red block mb-2">
                            February 14.
                        </span>
                    )}
                    Give yourself time to craft something meaningful.
                </motion.p>

                <div className="reminder-content">
                    <Button
                        onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white border border-muted-red/20 text-muted-red hover:bg-muted-red hover:text-white shadow-sm"
                    >
                        Start Creating
                    </Button>
                </div>
            </div>
        </section>
    );
};

const FinalCTA = () => {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".final-cta-content", {
                y: 20,
                opacity: 0,
                duration: prefersReducedMotion ? 0.3 : 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    // Particle system for button
    useEffect(() => {
        if (prefersReducedMotion || !buttonRef.current) return;

        const createParticle = () => {
            const particle = {
                id: Math.random(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
            };
            setParticles(prev => [...prev.slice(-10), particle]);
        };

        const interval = setInterval(createParticle, 500);
        return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    const handleButtonClick = () => {
        if (prefersReducedMotion) return;

        // Play heartbeat sound
        soundManager.playHeartbeat();
        
        // Explosive confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFE5E5', '#FFB6C1', '#F5EBE0', '#D4696A', '#DC267F'],
            shapes: ['circle', 'heart'],
        });

        document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section 
            ref={containerRef} 
            className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cream via-white to-soft-rose/10 overflow-hidden"
        >
            {/* Animated Gradient Mesh Background */}
            {!prefersReducedMotion && (
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            background: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 127, 0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 235, 224, 0.1), transparent 50%)',
                        }}
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                </div>
            )}

            {/* Subtle Gradient Blob */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-rose-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"
                animate={!prefersReducedMotion ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                } : {}}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 max-w-2xl px-6 text-center">
                <motion.h2
                    className="final-cta-content font-playfair text-4xl md:text-5xl lg:text-6xl text-soft-black mb-6 leading-tight"
                    animate={!prefersReducedMotion ? {
                        letterSpacing: ['0em', '0.02em', '0em'],
                    } : {}}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Make them feel loved.
                </motion.h2>

                <p className="final-cta-content font-inter text-gray-500 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto">
                    Every word counts. Every moment matters.
                </p>

                <div className="final-cta-content relative" ref={buttonRef}>
                    {/* Particle hearts inside button area */}
                    {!prefersReducedMotion && particles.map(particle => (
                        <motion.div
                            key={particle.id}
                            className="absolute text-xs text-muted-red/30"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                            }}
                            animate={{
                                x: particle.speedX * 100,
                                y: particle.speedY * 100,
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            ❤️
                        </motion.div>
                    ))}

                    <AnimatedButton
                        onClick={handleButtonClick}
                        className="bg-muted-red hover:bg-rose-gold text-white text-lg px-12 py-4 shadow-xl shadow-muted-red/20 relative z-10"
                        magnetic={true}
                        showParticles={true}
                    >
                        Begin Your Message
                    </AnimatedButton>
                </div>

                <motion.p
                    className="final-cta-content mt-8 text-xs text-gray-400 font-inter tracking-wide opacity-60"
                    animate={!prefersReducedMotion ? {
                        opacity: [0.6, 0.8, 0.6],
                    } : {}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    Free to create and share
                </motion.p>
            </div>
        </section>
    );
};

export { Urgency, FinalCTA };
