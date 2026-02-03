import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import { Smartphone, Edit3, Heart, Share2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { easings } from '../../utils/easings';
import PinnedScene from './PinnedScene';
import ImageDistortion from '../webgl/ImageDistortion';
import soundManager from '../../utils/soundEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        id: 1,
        title: "Beautiful by Default",
        description: "Every design is crafted to be felt, not just seen. Typography, spacing, and color are perfectly balanced so your message shines.",
        icon: Heart,
        visualColor: "bg-[#F8E7E7]",
        visualType: "typography",
        image: null, // Add image path if available
    },
    {
        id: 2,
        title: "Your Words, Your Way",
        description: "Add messages, photos, and moments that matter. Our editor keeps the focus on your story while handling the design details.",
        icon: Edit3,
        visualColor: "bg-[#F5EBE0]",
        visualType: "editor",
        image: null,
    },
    {
        id: 3,
        title: "Perfect Everywhere",
        description: "Whether they open it on a phone, tablet, or desktop, your love letter adapts beautifully to their screen.",
        icon: Smartphone,
        visualColor: "bg-[#E8C4B8]",
        visualType: "devices",
        image: null,
    },
    {
        id: 4,
        title: "Share Privately",
        description: "A private link, just for them. No social feeds, no ads, just a quiet space for your connection.",
        icon: Share2,
        visualColor: "bg-[#FFF8F3]",
        visualType: "privacy",
        image: null,
    }
];

// Typography Visual Component
const TypographyVisual = ({ isVisible }) => {
    const lettersRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!isVisible || prefersReducedMotion || !lettersRef.current) return;

        const letters = lettersRef.current.querySelectorAll('.floating-letter');
        letters.forEach((letter, i) => {
            gsap.fromTo(letter,
                {
                    opacity: 0,
                    y: 50,
                    rotation: -15 + Math.random() * 30,
                    scale: 0.5,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "back.out(1.7)",
                }
            );
        });
    }, [isVisible, prefersReducedMotion]);

    const sampleText = "LOVE";
    return (
        <div ref={lettersRef} className="flex items-center justify-center gap-2 h-full">
            {sampleText.split('').map((letter, i) => (
                <motion.div
                    key={i}
                    className="floating-letter font-playfair text-6xl md:text-8xl text-soft-black/20"
                    whileHover={!prefersReducedMotion ? {
                        scale: 1.2,
                        color: '#DC267F',
                        rotate: [0, -5, 5, 0],
                    } : {}}
                    transition={{ duration: 0.3 }}
                >
                    {letter}
                </motion.div>
            ))}
        </div>
    );
};

// Editor Visual Component
const EditorVisual = ({ isVisible }) => {
    const [typingText, setTypingText] = useState('');
    const fullText = "My dearest...";
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!isVisible || prefersReducedMotion) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setTypingText(fullText.slice(0, currentIndex + 1));
                if (currentIndex > 0) {
                    soundManager.playPenClick();
                }
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [isVisible, prefersReducedMotion]);

    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="bg-white/80 rounded-lg p-6 w-full max-w-md shadow-lg">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="font-inter text-gray-700">
                    {typingText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-5 bg-muted-red ml-1"
                    />
                </div>
            </div>
        </div>
    );
};

// Devices Visual Component
const DevicesVisual = ({ isVisible }) => {
    const devicesRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!isVisible || prefersReducedMotion || !devicesRef.current) return;

        const devices = devicesRef.current.querySelectorAll('.device');
        devices.forEach((device, i) => {
            gsap.fromTo(device,
                {
                    opacity: 0,
                    scale: 0.8,
                    rotationY: -90,
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                    delay: i * 0.2,
                    ease: "power2.out",
                }
            );
        });
    }, [isVisible, prefersReducedMotion]);

    return (
        <div ref={devicesRef} className="h-full flex items-center justify-center gap-4 perspective-1000">
            {['📱', '💻', '🖥️'].map((emoji, i) => (
                <motion.div
                    key={i}
                    className="device text-6xl md:text-8xl"
                    whileHover={!prefersReducedMotion ? {
                        scale: 1.2,
                        z: 50,
                        rotateY: 15,
                    } : {}}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {emoji}
                </motion.div>
            ))}
        </div>
    );
};

// Privacy Visual Component
const PrivacyVisual = ({ isVisible }) => {
    const lockRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (!isVisible || prefersReducedMotion || !lockRef.current) return;

        // Draw lock SVG path animation
        const path = lockRef.current.querySelector('path');
        if (path) {
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: "power2.out",
            });
        }

        // Pulse animation
        gsap.to(lockRef.current, {
            scale: [1, 1.1, 1],
            duration: 2,
            repeat: Infinity,
            ease: "power2.inOut",
        });
    }, [isVisible, prefersReducedMotion]);

    return (
        <div className="h-full flex items-center justify-center">
            <svg
                ref={lockRef}
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="text-muted-red"
            >
                <path
                    d="M30 50 L30 40 C30 25 42 15 60 15 C78 15 90 25 90 40 L90 50 M30 50 L30 90 C30 100 38 105 60 105 C82 105 90 100 90 90 L90 50"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};

const FeatureBlock = ({ feature, index, disableViewportAnimation = false }) => {
    const isEven = index % 2 === 0;
    const [isVisible, setIsVisible] = useState(disableViewportAnimation);
    const prefersReducedMotion = useReducedMotion();

    // Function to render the correct visual component
    const renderVisual = () => {
        switch (feature.visualType) {
            case 'typography':
                return <TypographyVisual isVisible={isVisible} />;
            case 'editor':
                return <EditorVisual isVisible={isVisible} />;
            case 'devices':
                return <DevicesVisual isVisible={isVisible} />;
            case 'privacy':
                return <PrivacyVisual isVisible={isVisible} />;
            default:
                return (
                    <div className="text-soft-black/20 font-playfair italic text-3xl opacity-50">
                        {feature.title} Visual
                    </div>
                );
        }
    };

    return (
        <div
            className={cn(
                "relative py-16 md:py-32 w-full flex items-center justify-center",
                // Subtle alternating background
                index % 2 !== 0 ? "bg-soft-rose/5" : "bg-transparent"
            )}
        >
            <div className={cn(
                "w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}>
                {/* Visual Side */}
                <motion.div
                    initial={
                        disableViewportAnimation
                            ? false
                            : { opacity: 0, x: isEven ? -50 : 50 }
                    }
                    whileInView={
                        disableViewportAnimation
                            ? undefined
                            : { opacity: 1, x: 0 }
                    }
                    viewport={
                        disableViewportAnimation
                            ? undefined
                            : { once: true, margin: "-10%" }
                    }
                    transition={
                        disableViewportAnimation
                            ? undefined
                            : { duration: 0.8, ease: "easeOut" }
                    }
                    onViewportEnter={() => {
                        setIsVisible(true);
                        if (!prefersReducedMotion) soundManager.playPaperRustle();
                    }}
                    onViewportLeave={
                        disableViewportAnimation
                            ? undefined
                            : () => setIsVisible(false)
                    }
                    className={cn(
                        "feature-visual w-full md:w-1/2 aspect-[4/3] rounded-2xl shadow-xl overflow-hidden",
                        feature.visualColor,
                        "flex items-center justify-center relative group"
                    )}
                >
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {renderVisual()}
                </motion.div>

                {/* Content Side */}
                <motion.div
                    initial={
                        disableViewportAnimation
                            ? false
                            : { opacity: 0, x: isEven ? 50 : -50 }
                    }
                    whileInView={
                        disableViewportAnimation
                            ? undefined
                            : { opacity: 1, x: 0 }
                    }
                    viewport={
                        disableViewportAnimation
                            ? undefined
                            : { once: true, margin: "-10%" }
                    }
                    transition={
                        disableViewportAnimation
                            ? undefined
                            : { duration: 0.8, delay: 0.2, ease: "easeOut" }
                    }
                    className="feature-content w-full md:w-1/2 text-center md:text-left"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "back.out(1.7)" }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-soft-rose/30 text-muted-red mb-6"
                    >
                        <feature.icon size={24} strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="font-playfair text-3xl md:text-4xl text-soft-black mb-6">
                        {feature.title}
                    </h3>

                    <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                        {feature.description}
                    </p>

                    {/* Reading progress indicator */}
                    {!prefersReducedMotion && (
                        <motion.div
                            className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden max-w-md mx-auto md:mx-0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-muted-red to-rose-gold"
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.6 }}
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

const Features = () => {
    const sectionRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    // Scroll progress indicator
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section ref={sectionRef} id="features" className="bg-cream relative">
            {/* Scroll progress line */}
            {!prefersReducedMotion && (
                <div className="fixed left-0 top-0 bottom-0 w-1 bg-gray-200 z-50">
                    <motion.div
                        className="h-full bg-gradient-to-b from-muted-red via-rose-gold to-muted-red"
                        style={{ width: '100%', height: progressWidth }}
                    />
                </div>
            )}

            {/* First feature as pinned scene */}
            {/* {features.length > 0 && (
                !prefersReducedMotion ? (
                    <PinnedScene
                        className="relative"
                        pinDuration="+=50%"
                        timeline={[
                            {
                                selector: '.feature-visual',
                                props: {
                                    // Keep it visible from the very start of the pin
                                    // and just add a subtle refinement as you scroll.
                                    from: { scale: 0.95, opacity: 1, rotateY: -10 },
                                    to: { scale: 1, opacity: 1, rotateY: 0 },
                                },
                                position: 0,
                            },
                            {
                                selector: '.feature-content',
                                props: {
                                    from: { x: 30, opacity: 1 },
                                    to: { x: 0, opacity: 1 },
                                },
                                position: 0.3, // Start slightly after visual
                            },
                        ]}
                    >
                        <FeatureBlock feature={features[0]} index={0} disableViewportAnimation />
                    </PinnedScene>
                ) : (
                    <FeatureBlock feature={features[0]} index={0} />
                )
            )} */}

            {/* Remaining features */}
            {features.map((feature, index) => (
                <FeatureBlock key={feature.id} feature={feature} index={index + 1} />
            ))}
        </section>
    );
};

export default Features;
