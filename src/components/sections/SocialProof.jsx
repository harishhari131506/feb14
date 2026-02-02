import React, { useState, useEffect } from 'react';
import Section from '../ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../../utils/cn';

const testimonials = [
    {
        id: 1,
        name: "Sarah & Michael",
        role: "Long Distance",
        text: "He cried when he opened it. It felt closer than a call—like opening a letter I wrote just for him."
    },
    {
        id: 2,
        name: "James R.",
        role: "Anniversary",
        text: "I'm not good at expressing feelings, but this made it easy. She saved it and looks at it every day."
    },
    {
        id: 3,
        name: "Emily & Kay",
        role: "Just Because",
        text: "We captured our favorite memories in a way that feels timeless. The music choice was the perfect touch."
    }
];

const SocialProof = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Section className="bg-cream" id="love-notes">
            <div className="flex flex-col items-center justify-center py-12 md:py-24">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-dancing text-5xl md:text-6xl text-muted-red mb-6">Love Notes</h2>
                </div>

                {/* Testimonial Card */}
                <div className="relative w-full max-w-3xl min-h-[400px] flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white/85 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-2xl p-10 md:p-16 text-center w-full mx-4"
                        >
                            <Heart className="w-8 h-8 text-rose-gold/80 mx-auto mb-8" fill="currentColor" />

                            <blockquote className="font-playfair text-2xl md:text-3xl text-soft-black leading-relaxed mb-10">
                                "{testimonials[currentIndex].text}"
                            </blockquote>

                            <div className="font-inter">
                                <cite className="not-italic font-medium text-lg text-soft-black block mb-1">
                                    {testimonials[currentIndex].name}
                                </cite>
                                <span className="text-sm text-gray-500 uppercase tracking-widest">
                                    {testimonials[currentIndex].role}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="flex gap-4 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    index === currentIndex
                                        ? "bg-rose-gold w-3 scale-110"
                                        : "bg-gray-300 hover:bg-gray-400"
                                )}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Subtle Stats */}
                <div className="mt-20 text-center opacity-60">
                    <p className="font-inter text-sm text-gray-500 tracking-wide">
                        12,847 messages sent with love
                    </p>
                </div>

            </div>
        </Section>
    );
};

export default SocialProof;
