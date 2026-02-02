import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
    const headlineText = "Your Love Story, Beautifully Told";

    // Kinetic typography variants
    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Gentle ripple
                delayChildren: 0.3
            }
        }
    };

    const letterAnim = {
        hidden: { opacity: 0, letterSpacing: "-0.05em" },
        show: {
            opacity: 1,
            letterSpacing: "normal",
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative w-full h-[100dvh] bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-warm-beige/30 via-cream to-white opacity-80 pointer-events-none" />

            {/* Content Container - 60% whitespace feel */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">

                {/* Headline - Kinetic Typography */}
                <motion.h1
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl text-soft-black leading-tight mb-6"
                    variants={letterContainer}
                    initial="hidden"
                    animate="show"
                >
                    {headlineText.split("").map((char, index) => (
                        <motion.span key={index} variants={letterAnim} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subheadline - Slow Fade */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="font-inter font-light text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
                >
                    Create a digital love letter they'll treasure forever.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    className="pt-4"
                >
                    <Button variant='primary' className="text-gray-500" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>
                        Begin Your Message
                    </Button>
                </motion.div>

                {/* Social Proof - Understated */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
                    className="mt-6 text-sm text-gray-500 font-inter tracking-wide"
                >
                    Join 12,847 people sharing their love
                </motion.p>
            </div>

            {/* Optional: Subtle Glassmorphic Preview (Very faint, bottom right or background layer) */}
            {/* Leaving it out for now to maximize "White Space" as requested, can add if user insists on "showing" something */}

        </section>
    );
};

export default Hero;
