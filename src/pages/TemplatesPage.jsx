import React, { useRef, useEffect, useState } from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils/cn';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const templates = [
    {
        id: 1,
        title: "Eternal Romance",
        description: "A classic design with deep reds and elegant typography for timeless love.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop",
        tags: ["Classic", "Elegant", "Red"],
        color: "bg-red-500"
    },
    {
        id: 2,
        title: "Soft Whisper",
        description: "Gentle pastels and floating animations for a tender, quiet expression.",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop",
        tags: ["Pastel", "Soft", "Pink"],
        color: "bg-pink-400"
    },
    {
        id: 3,
        title: "Modern Passion",
        description: "Bold layouts and striking contrasts for a love that shouts.",
        image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=2071&auto=format&fit=crop",
        tags: ["Modern", "Bold", "Minimal"],
        color: "bg-rose-600"
    },
    {
        id: 4,
        title: "Golden Hour",
        description: "Warm tones and glowing effects to capture the warmth of your connection.",
        image: "https://images.unsplash.com/photo-1516961642222-110a3a43df36?q=80&w=2070&auto=format&fit=crop",
        tags: ["Warm", "Gold", "Glow"],
        color: "bg-amber-400"
    },
    {
        id: 5,
        title: "Starry Night",
        description: "Dark mode aesthetics with twinkling stars for a cosmic love.",
        image: "./templates/nightsky.jpg",
        tags: ["Dark", "Cosmic", "Mysterious"],
        color: "bg-slate-900"
    },
    {
        id: 6,
        title: "Polaroid Memories",
        description: "Retro vibes with scattered photos to celebrate your shared history.",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2003&auto=format&fit=crop",
        tags: ["Retro", "Photos", "Nostalgic"],
        color: "bg-stone-500"
    }
];

const TemplateCard = ({ title, description, image, tags, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                    once: true
                }
            }
        );
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="group relative h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "relative h-full bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 overflow-hidden transition-all duration-500",
                isHovered ? "shadow-[0_20px_60px_rgba(0,0,0,0.1)] -translate-y-2 border-rose-gold/30" : "shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            )}>
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                    <div className={cn(
                        "absolute inset-0 bg-soft-black/20 transition-opacity duration-500 z-10",
                        isHovered ? "opacity-0" : "opacity-30"
                    )} />
                    <img
                        src={image}
                        alt={title}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-1000",
                            isHovered ? "scale-110" : "scale-100"
                        )}
                    />

                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 justify-end">
                        {tags.slice(0, 1).map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-white/90 backdrop-blur text-soft-black rounded-full shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col h-[calc(100%-16rem)] justify-between">
                    <div>
                        <h3 className="font-playfair text-2xl text-soft-black mb-3 group-hover:text-rose-gold transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="font-inter text-gray-600 font-light text-sm leading-relaxed mb-6">
                            {description}
                        </p>
                    </div>

                    <div className="mt-auto">
                        <Button
                            className="w-full justify-between group-hover:bg-rose-gold group-hover:text-white transition-all duration-300"
                            onClick={() => {
                                // For demo purposes, we'll link the first template or just all to the demo
                                window.location.href = '/templates/memory-constellation';
                            }}
                            icon={Sparkles}
                        >
                            Use This Template
                        </Button>
                    </div>

                </div>

                {/* Hover Shine Effect */}
                <div className={cn(
                    "absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/20 to-white/0 skew-x-12 transition-transform duration-1000",
                    isHovered ? "translate-x-full" : "-translate-x-full"
                )} />
            </div>
        </div>
    );
};

const TemplatesPage = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headerRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }
        );
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            {/* Background Blobs (Similar to HowItWorks) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-gold/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blush-pink/[0.04] rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-white/60">
                        <Heart className="w-5 h-5 text-rose-gold mr-2 fill-rose-gold/20" />
                        <span className="text-sm font-medium text-gray-600 uppercase tracking-widest">Our Collection</span>
                    </div>

                    <h1 className="font-playfair text-5xl md:text-6xl text-soft-black mb-6 leading-tight">
                        Find Your Perfect <br className="hidden md:block" /> Expression
                    </h1>
                    <p className="font-inter text-gray-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        Each template is crafted to set the perfect mood for your message. Choose the one that speaks to your heart.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {templates.map((template, index) => (
                        <TemplateCard key={template.id} index={index} {...template} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplatesPage;
