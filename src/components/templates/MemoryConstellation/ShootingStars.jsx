import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const ShootingStars = () => {
    const [stars, setStars] = useState([]);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const spawnStar = () => {
            const id = Date.now() + Math.random();

            // Random start position (favor top and right for natural feel)
            const startX = Math.random() * window.innerWidth * 0.7 + window.innerWidth * 0.3;
            const startY = Math.random() * (window.innerHeight * 0.4);

            // Angle typically diagonal (top-right to bottom-left)
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
            const dist = 400 + Math.random() * 600;
            const duration = 2 + Math.random() * 1;

            const newStar = {
                id,
                x: startX,
                y: startY,
                angle,
                dist,
                duration
            };

            setStars(prev => [...prev, newStar]);

            // Remove from state after animation completes
            setTimeout(() => {
                setStars(prev => prev.filter(s => s.id !== id));
            }, duration * 1000 + 200);

            // Schedule next shooting star (30-45 seconds)
            const nextDelay = Math.random() * 15000 + 30000;
            timeoutRef.current = setTimeout(spawnStar, nextDelay);
        };

        // First shooting star after 5 seconds
        timeoutRef.current = setTimeout(spawnStar, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {stars.map(star => (
                <ShootingStar key={star.id} {...star} />
            ))}
        </div>
    );
};

const ShootingStar = ({ x, y, angle, dist, duration }) => {
    const starRef = useRef(null);

    useEffect(() => {
        if (!starRef.current) return;

        const endX = x + Math.cos(angle) * dist;
        const endY = y + Math.sin(angle) * dist;

        // GSAP animation for smooth bezier path
        const tl = gsap.timeline();

        tl.fromTo(starRef.current,
            {
                x: 0,
                y: 0,
                opacity: 0,
                scaleX: 0.3
            },
            {
                x: endX - x,
                y: endY - y,
                opacity: 0,
                scaleX: 1,
                duration: duration,
                ease: "power2.out", // Fast start, slow end
                keyframes: {
                    "10%": { opacity: 0.8 },
                    "20%": { opacity: 1 },
                    "80%": { opacity: 0.4 }
                }
            }
        );

    }, [x, y, angle, dist, duration]);

    return (
        <div
            ref={starRef}
            className="absolute"
            style={{
                left: x,
                top: y,
                width: '100px',
                height: '3px',
                transformOrigin: 'right center',
                transform: `rotate(${angle}rad)`,
                pointerEvents: 'none'
            }}
        >
            {/* Gradient trail */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 1) 70%, rgba(176, 196, 222, 0.6) 100%)',
                    filter: 'blur(0.5px)',
                }}
            />

            {/* Bright head */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                style={{
                    boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8), 0 0 12px 3px rgba(176, 196, 222, 0.5)'
                }}
            />

            {/* Subtle sparkle particles in trail */}
            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/60" />
            <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-white/40" />
        </div>
    );
};

export default ShootingStars;
// import React, { useEffect, useState } from 'react';
// import gsap from 'gsap';

// const ShootingStars = () => {
//     const [stars, setStars] = useState([]);

//     useEffect(() => {
//         // Spawn a shooting star periodically
//         const spawnStar = () => {
//             const id = Date.now();
//             // Random start position (top/right quadrant usually better)
//             const startX = Math.random() * window.innerWidth;
//             const startY = Math.random() * (window.innerHeight / 2);

//             // Random angle and distance
//             const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5; // ~45 degrees
//             const dist = 500 + Math.random() * 500;
//             const duration = 1.5 + Math.random();

//             const newStar = { id, x: startX, y: startY, angle, dist, duration };

//             setStars(prev => [...prev, newStar]);

//             // Remove from state after animation
//             setTimeout(() => {
//                 setStars(prev => prev.filter(s => s.id !== id));
//             }, duration * 1000 + 100);

//             // Schedule next spawn
//             const nextDelay = Math.random() * 20000 + 10000; // 10-30s
//             timeoutId = setTimeout(spawnStar, nextDelay);
//         };

//         let timeoutId = setTimeout(spawnStar, 5000);

//         return () => clearTimeout(timeoutId);
//     }, []);

//     return (
//         <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
//             {stars.map(star => (
//                 <ShootingStar key={star.id} {...star} />
//             ))}
//         </div>
//     );
// };

// const ShootingStar = ({ x, y, angle, dist, duration }) => {
//     // We animate a small glowing line
//     // Use GSAP inside a useEffect or just CSS animation if simple.
//     // Let's use CSS keyframes injection or inline styles for simplicity given dynamic props.
//     // Actually GSAP is cleaner for FLIP-like logic or just firing refs.

//     // For React simplicity with dynamic values, simple CSS transition works if we mount it.
//     // But shooting stars need a trail. SVG is good for this.

//     // Let's implement a simple Tailwind CSS animation with dynamic style vars
//     return (
//         <div
//             className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 shooting-star-anim"
//             style={{
//                 left: x,
//                 top: y,
//                 transform: `rotate(${angle}rad)`,
//                 '--dist': `${dist}px`,
//                 '--dur': `${duration}s`
//             }}
//         >
//             {/* Head */}
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
//             <style>{`
//                 .shooting-star-anim {
//                     animation: shoot var(--dur) ease-out forwards;
//                 }
//                 @keyframes shoot {
//                     0% {
//                         transform: translateX(0) translateY(0) rotate(${angle}rad) scaleX(0.5);
//                         opacity: 0;
//                     }
//                     10% {
//                          opacity: 1;
//                     }
//                     100% {
//                         transform: translateX(${Math.cos(angle) * dist}px) translateY(${Math.sin(angle) * dist}px) rotate(${angle}rad) scaleX(1);
//                         opacity: 0;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ShootingStars;
