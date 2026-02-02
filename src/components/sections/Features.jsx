import React, { useRef, useEffect } from 'react';
import Section from '../ui/Section';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Edit3, Heart, Share2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const features = [
    {
        id: 1,
        title: "Beautiful by Default",
        description: "Every design is crafted to be felt, not just seen. Typography, spacing, and color are perfectly balanced so your message shines.",
        icon: Heart,
        visualColor: "bg-[#F8E7E7]" // Placeholder for visual
    },
    {
        id: 2,
        title: "Your Words, Your Way",
        description: "Add messages, photos, and moments that matter. Our editor keeps the focus on your story while handling the design details.",
        icon: Edit3,
        visualColor: "bg-[#F5EBE0]"
    },
    {
        id: 3,
        title: "Perfect Everywhere",
        description: "Whether they open it on a phone, tablet, or desktop, your love letter adapts beautifully to their screen.",
        icon: Smartphone,
        visualColor: "bg-[#E8C4B8]"
    },
    {
        id: 4,
        title: "Share Privately",
        description: "A private link, just for them. No social feeds, no ads, just a quiet space for your connection.",
        icon: Share2,
        visualColor: "bg-[#FFF8F3]"
    }
];

const FeatureBlock = ({ feature, index }) => {
    const isEven = index % 2 === 0;
    const blockRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".feature-visual", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
                .from(".feature-content", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: "power2.out"
                }, "-=0.6");

        }, blockRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={blockRef}
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
                <div className={cn(
                    "feature-visual w-full md:w-1/2 aspect-[4/3] rounded-2xl shadow-xl overflow-hidden",
                    feature.visualColor,
                    "flex items-center justify-center relative group" // Placeholder styling
                )}>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="text-soft-black/20 font-playfair italic text-3xl opacity-50">
                        {feature.title} Visual
                    </div>
                </div>

                {/* Content Side */}
                <div className="feature-content w-full md:w-1/2 text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-soft-rose/30 text-muted-red mb-6">
                        <feature.icon size={24} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-playfair text-3xl md:text-4xl text-soft-black mb-6">
                        {feature.title}
                    </h3>

                    <p className="font-inter text-gray-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="bg-cream">
            {features.map((feature, index) => (
                <FeatureBlock key={feature.id} feature={feature} index={index} />
            ))}
        </section>
    );
};

export default Features;
