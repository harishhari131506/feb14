import React, { useRef, useEffect } from 'react';
import Button from '../ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar } from 'lucide-react';
import { cn } from '../../utils/cn';

const Urgency = () => {
    // Simple logic to just show upcoming date
    const now = new Date();
    const currentYear = now.getFullYear();
    const isPastFeb14 = now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14);
    const targetYear = isPastFeb14 ? currentYear + 1 : currentYear;

    // Calculate roughly days left
    const feb14 = new Date(targetYear, 1, 14);
    const diffTime = Math.abs(feb14 - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reminder-content", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-20 flex flex-col items-center justify-center bg-white/50 relative overflow-hidden">
            {/* Clean Background - Removed Giant Heart */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-soft-rose/5 -z-10" />

            <div className="text-center z-10 px-6 max-w-2xl mx-auto">
                {/* Small, tasteful icon above text */}
                <div className="reminder-content flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-soft-rose/20 flex items-center justify-center text-muted-red shadow-sm">
                        <Calendar size={24} />
                    </div>
                </div>

                <h2 className="reminder-content font-playfair text-3xl md:text-4xl text-soft-black mb-4">
                    Valentine's Day is approaching
                </h2>

                <p className="reminder-content font-inter text-gray-500 mb-8 font-light text-lg leading-relaxed">
                    {diffDays < 365 ? (
                        <span className="font-medium text-muted-red block mb-2">February 14 is in {diffDays} days.</span>
                    ) : (
                        <span className="font-medium text-muted-red block mb-2">February 14.</span>
                    )}
                    Give yourself time to craft something meaningful.
                </p>

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
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".final-cta-content", {
                y: 20,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cream via-white to-soft-rose/10 overflow-hidden">

            {/* Subtle Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-rose-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="relative z-10 max-w-2xl px-6 text-center">
                <h2 className="final-cta-content font-playfair text-4xl md:text-5xl lg:text-6xl text-soft-black mb-6 leading-tight">
                    Make them feel loved.
                </h2>

                <p className="final-cta-content font-inter text-gray-500 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto">
                    Every word counts. Every moment matters.
                </p>

                <div className="final-cta-content">
                    <Button
                        onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-muted-red hover:bg-rose-gold text-white text-lg px-12 py-4 shadow-xl shadow-muted-red/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Begin Your Message
                    </Button>
                </div>

                <p className="final-cta-content mt-8 text-xs text-gray-400 font-inter tracking-wide opacity-60">
                    Free to create and share
                </p>
            </div>
        </section>
    );
};

export { Urgency, FinalCTA };
