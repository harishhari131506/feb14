import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const withBase = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;

const steps = [
    {
        image: "choose.jpg",
        title: "Choose a Design",
        description: "Browse designs made for meaningful moments. Each template is a canvas for your emotions.",
        number: "01"
    },
    {
        image: "write.jpg",
        title: "Write from the Heart",
        description: "Add your words, photos, and memories. Let your feelings flow without restraint.",
        number: "02"
    },
    {
        image: "preview.jpg",
        title: "Preview with Care",
        description: "See it exactly as they will. Every detail, every word, perfectly placed.",
        number: "03"
    },
    {
        image: "share.jpg",
        title: "Share Your Love",
        description: "Send with a personal link. A private moment, delivered with intention.",
        number: "04"
    }
];

const StepCard = ({ image, title, description, number, index }) => {
    const cardRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const imgSrc = withBase(image);

    return (
        <motion.div
            ref={cardRef}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="step-card relative w-full max-w-2xl mx-auto mb-16 md:mb-24 z-10"
        >
            {/* Connecting line (draws from previous step) */}
            {index > 0 && !prefersReducedMotion && (
                <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-rose-gold/30 to-transparent"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 96, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
            )}

            {/* Glass Card Container */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-white/75 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_14px_54px_rgba(0,0,0,0.08)] hover:bg-white/85"
            >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-soft-rose/10 group">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cream to-blush-pink/20 animate-pulse z-10" />
                    )}

                    <img
                        src={imgSrc}
                        alt={title}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-700 will-change-transform",
                            imageLoaded ? "opacity-100" : "opacity-0",
                            isHovered ? "scale-105" : "scale-100"
                        )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 text-center">
                    {/* Number badge */}
                    <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 border border-rose-gold/20 mb-6 cursor-pointer hover:scale-110 transition-transform"
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <span className="font-playfair text-muted-red font-light">{number}</span>
                    </motion.div>

                    <h3 className="step-title font-playfair text-2xl md:text-3xl text-soft-black mb-4 tracking-wide">
                        {title}
                    </h3>

                    <motion.p
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: 0.55, ease: 'easeOut' }}
                        className="font-inter text-[15px] md:text-base text-gray-500 leading-relaxed font-light max-w-lg mx-auto"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

const HowItWorks = () => {
    const headerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        // Keep this effect lightweight: nothing to do here now.
    }, [prefersReducedMotion]);

    return (
        <Section
            className="bg-gradient-to-b from-cream/30 via-cream/50 to-soft-white relative overflow-hidden"
            id="how-it-works"
        >
            {/* Subtle background decoration with parallax */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-gold/[0.02] rounded-full blur-[120px] animate-parallax-slow" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blush-pink/[0.03] rounded-full blur-[100px] animate-parallax-fast" />

                {/* Floating decorative hearts */}
                {!prefersReducedMotion && [...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-gold/10 text-2xl select-none"
                        style={{
                            left: `${14 + i * 16}%`,
                            top: `${22 + (i % 2) * 36}%`,
                        }}
                        animate={{ y: [0, -14, 0], opacity: [0.08, 0.16, 0.08] }}
                        transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 py-16 md:py-32">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-muted-red/80 uppercase tracking-[0.2em] text-xs font-light mb-4 block"
                    >
                        The Process
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                        className="font-playfair text-4xl md:text-5xl lg:text-6xl text-soft-black mb-6 leading-tight"
                    >
                        Creating Your Love Letter
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
                        className="font-inter text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto"
                    >
                        Four simple steps to create something they'll treasure forever
                    </motion.p>
                </div>

                {/* Steps Container */}
                <div className="relative max-w-6xl mx-auto px-4">
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            index={index}
                            {...step}
                        />
                    ))}
                </div>

                {/* Progress indicator line */}
                {!prefersReducedMotion && (
                    <motion.div
                        className="w-px h-32 bg-gradient-to-b from-transparent via-rose-gold/10 to-transparent mx-auto mt-8"
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: 128, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                )}
            </div>
        </Section>
    );
};

export default HowItWorks;
