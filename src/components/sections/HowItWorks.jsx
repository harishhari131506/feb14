import React, { useRef, useEffect, useState } from 'react';
import Section from '../ui/Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

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
    const imageRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        const img = imageRef.current;

        // Card reveal animation
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.0, // Speed up card slightly
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                    once: true
                }
            }
        );

        // Image subtle reveal
        gsap.fromTo(img,
            {
                opacity: 0,
                scale: 0.95
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8, // Much faster image reveal
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%",
                    once: true
                },
                delay: 0.1 // Minimal delay
            }
        );

        // Parallax Effect
        gsap.to(img, {
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }, []);

    return (
        <div
            ref={cardRef}
            className="step-card relative w-full max-w-2xl mx-auto mb-16 md:mb-24 opacity-0 z-10"
        >
            {/* Watermark Number */}
            {/* <div className="absolute -top-8 -left-4 md:-left-8 text-[140px] md:text-[180px] font-playfair font-light text-rose-gold/[0.03] leading-none pointer-events-none select-none z-0">
                {number}
            </div> */}

            {/* Glass Card Container */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:bg-white/80"
            >

                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-soft-rose/10 group">
                    {/* Low-res placeholder / Loading State */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cream to-blush-pink/20 animate-pulse z-10" />
                    )}

                    <img
                        ref={imageRef}
                        src={image}
                        alt={title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className={cn(
                            "w-full h-full object-cover transition-all duration-1000",
                            imageLoaded ? "opacity-100" : "opacity-0",
                            isHovered ? "scale-105" : "scale-100"
                        )}
                    />
                    {/* Soft overlay for consistency */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 text-center">
                    {/* Small number badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 border border-rose-gold/20 mb-6">
                        <span className="font-playfair text-muted-red font-light">{number}</span>
                    </div>

                    <h3 className="font-playfair text-2xl md:text-3xl text-soft-black mb-4 tracking-wide">
                        {title}
                    </h3>

                    <p className="font-inter text-[15px] md:text-base text-gray-500 leading-relaxed font-light max-w-lg mx-auto">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const headerRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Header animation
        gsap.fromTo(headerRef.current.children,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                    once: true
                }
            }
        );
    }, []);

    return (
        <Section
            ref={sectionRef}
            className="bg-gradient-to-b from-cream/30 via-cream/50 to-soft-white relative overflow-hidden"
            id="how-it-works"
        >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                {/* Top blob */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-rose-gold/[0.02] rounded-full blur-[120px]" />
                {/* Bottom blob */}
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blush-pink/[0.03] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 py-16 md:py-32">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 md:mb-24 max-w-3xl mx-auto px-4">
                    <span className="text-muted-red/80 uppercase tracking-[0.2em] text-xs font-light mb-4 block">
                        The Process
                    </span>
                    <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-soft-black mb-6 leading-tight">
                        Creating Your Love Letter
                    </h2>
                    <p className="font-inter text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                        Four simple steps to create something they'll treasure forever
                    </p>
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

                {/* Optional: Soft decorative line */}
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-rose-gold/10 to-transparent mx-auto mt-8" />

            </div>
        </Section>
    );
};

export default HowItWorks;
