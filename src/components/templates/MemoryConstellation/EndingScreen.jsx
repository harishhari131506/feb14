import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EndingScreen = ({ show }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        if (show) {
            // Fade in background gradient
            gsap.to(containerRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 3,
                ease: "power2.inOut"
            });

            // Stagger fade in content
            gsap.fromTo(contentRef.current.children,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.3,
                    ease: "power3.out",
                    delay: 1.5
                }
            );

            // Animate floating particles
            particlesRef.current.forEach((particle, i) => {
                if (!particle) return;

                gsap.fromTo(particle,
                    {
                        y: 0,
                        opacity: 0
                    },
                    {
                        y: -100 - Math.random() * 100,
                        opacity: Math.random() * 0.6 + 0.2,
                        duration: 3 + Math.random() * 2,
                        repeat: -1,
                        delay: Math.random() * 2,
                        ease: "power1.inOut",
                        yoyo: true
                    }
                );

                // Gentle horizontal drift
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    duration: 4 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2
                });
            });
        }
    }, [show]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 opacity-0 pointer-events-none flex items-center justify-center text-center px-6 py-12 overflow-hidden"
            style={{
                background: 'linear-gradient(to top, #2D1B4E 0%, #9C6FB5 30%, #E8A0BF 60%, #FFB69E 85%, #FFE5B4 100%)'
            }}
        >
            {/* Floating sparkle particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        ref={el => particlesRef.current[i] = el}
                        className="absolute w-1 h-1 rounded-full bg-white/60"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${50 + Math.random() * 50}%`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-10 max-w-2xl">
                {/* Main quote */}
                <div className="mb-10 font-playfair text-3xl md:text-5xl leading-relaxed text-[#2D1B4E] font-light tracking-wide">
                    <p className="mb-2">"Every star is a memory,</p>
                    <p className="mb-2">every memory is a star</p>
                    <p>in our constellation"</p>
                </div>

                {/* Decorative divider */}
                <div className="flex justify-center mb-8 opacity-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-px bg-[#2D1B4E]/30" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D1B4E]/40" />
                        <div className="w-12 h-px bg-[#2D1B4E]/30" />
                    </div>
                </div>

                {/* Sender signature */}
                <div className="font-playfair text-xl md:text-2xl text-[#4A3A5A] mb-3 opacity-0 italic">
                    Forever Yours,
                </div>

                {/* Sender name would go here if editable */}
                <div className="font-playfair text-2xl md:text-3xl text-[#2D1B4E] mb-6 opacity-0">
                    James
                </div>

                {/* Date */}
                <div className="font-inter text-sm md:text-base text-[#5A4A6A]/70 uppercase tracking-[0.3em] font-light opacity-0">
                    February 14, 2026
                </div>

                {/* Optional: Small heart decoration */}
                <div className="mt-10 flex justify-center opacity-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#2D1B4E]/30">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="currentColor"
                            fillOpacity="0.3"
                        />
                    </svg>
                </div>
            </div>

            {/* Subtle radial glow at center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%)'
                }}
            />
        </div>
    );
};

export default EndingScreen;
// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const EndingScreen = ({ show }) => {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         if (show) {
//             gsap.to(containerRef.current, {
//                 opacity: 1,
//                 pointerEvents: 'auto',
//                 duration: 2,
//                 ease: "power2.inOut"
//             });
//         }
//     }, [show]);

//     return (
//         <div
//             ref={containerRef}
//             className="fixed inset-0 z-40 bg-gradient-to-t from-orange-100 via-pink-100 to-indigo-900 opacity-0 pointer-events-none flex items-center justify-center text-center p-6"
//         >
//             <div className="max-w-xl text-soft-black">
//                 <div className="mb-8 font-playfair text-3xl md:text-4xl leading-relaxed text-indigo-950">
//                     "Every star is a memory,<br />
//                     every memory is a star<br />
//                     in our constellation"
//                 </div>

//                 <div className="font-playfair text-xl md:text-2xl text-indigo-900 mb-2">
//                     - Forever Yours
//                 </div>

//                 <div className="font-inter text-sm text-indigo-800/60 uppercase tracking-widest">
//                     February 14, 2026
//                 </div>
//             </div>

//             {/* Floating Particles could be added here */}
//         </div>
//     );
// };

// export default EndingScreen;
