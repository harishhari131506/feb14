import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '../../../utils/cn';

const Star = ({ x, y, size = 'medium', active, onClick, delay = 0 }) => {
    const starContainerRef = useRef(null);
    const rotationTl = useRef(null);
    const pulseTl = useRef(null);

    // Size definitions matching prompt (20px, 28px, 38px)
    const sizeMap = {
        small: { w: 20, h: 20, class: 'w-5 h-5' },
        medium: { w: 28, h: 28, class: 'w-7 h-7' },
        large: { w: 38, h: 38, class: 'w-[38px] h-[38px]' }
    };

    useEffect(() => {
        if (!starContainerRef.current) return;

        // Breathing/Pulse Animation (3s cycle, cubic-bezier easing)
        pulseTl.current = gsap.timeline({
            repeat: -1,
            delay: delay,
            defaults: { ease: "power2.inOut" }
        });

        pulseTl.current
            .to(starContainerRef.current, {
                scale: 1.12,
                duration: 1.5,
            })
            .to(starContainerRef.current, {
                scale: 1,
                duration: 1.5,
            });

        // Subtle Shimmer Rotation (6s cycle, very gentle)
        const randomDelay = Math.random() * 5;
        rotationTl.current = gsap.timeline({
            repeat: -1,
            yoyo: true,
            delay: randomDelay,
            defaults: { ease: "sine.inOut" }
        });

        rotationTl.current.to(starContainerRef.current, {
            rotation: Math.random() > 0.5 ? 5 : -5,
            duration: 6,
        });

        return () => {
            pulseTl.current?.kill();
            rotationTl.current?.kill();
        };
    }, [delay]);

    // Active state handling
    useEffect(() => {
        if (!starContainerRef.current) return;

        if (active) {
            // Pause pulse animation when active
            pulseTl.current?.pause();

            // Burst animation
            gsap.to(starContainerRef.current, {
                scale: 1.3,
                duration: 0.6,
                ease: "power2.out"
            });
        } else {
            // Resume pulse
            gsap.to(starContainerRef.current, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    pulseTl.current?.play();
                }
            });
        }
    }, [active]);

    // Multi-layer glow effect via inline styles (matching prompt specifications)
    const glowStyle = {
        filter: `
            drop-shadow(0 0 4px rgba(255, 229, 180, 0.8))
            drop-shadow(0 0 8px rgba(255, 216, 155, 0.6))
            drop-shadow(0 0 16px rgba(255, 160, 122, 0.4))
            drop-shadow(0 0 24px rgba(255, 223, 186, 0.2))
        `
    };

    return (
        <div
            ref={starContainerRef}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-all duration-400"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                willChange: active ? 'transform' : 'auto'
            }}
            onClick={onClick}
        >
            {/* Extended Aura (Outermost glow - only visible on dark backgrounds) */}
            <div
                className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{
                    width: sizeMap[size].w * 3,
                    height: sizeMap[size].h * 3,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 223, 186, 0.15) 0%, transparent 70%)',
                    filter: 'blur(24px)'
                }}
            />

            {/* Outer Glow Halo */}
            <div
                className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
                style={{
                    width: sizeMap[size].w * 2,
                    height: sizeMap[size].h * 2,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 160, 122, 0.5) 0%, transparent 60%)',
                    filter: 'blur(16px)'
                }}
            />

            {/* Middle Glow */}
            <div
                className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-400 pointer-events-none"
                style={{
                    width: sizeMap[size].w * 1.4,
                    height: sizeMap[size].h * 1.4,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 216, 155, 0.8) 0%, transparent 50%)',
                    filter: 'blur(8px)'
                }}
            />

            {/* SVG Star Shape with Core */}
            <svg
                viewBox="0 0 24 24"
                className={cn(
                    "relative z-10 transition-all duration-400",
                    sizeMap[size].class,
                    "group-hover:brightness-125"
                )}
                style={glowStyle}
            >
                {/* Inner white core */}
                <defs>
                    <radialGradient id={`star-core-${x}-${y}`}>
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#FFE5B4" />
                        <stop offset="100%" stopColor="#FFD89B" />
                    </radialGradient>
                </defs>

                {/* 5-point star with slightly rounded tips */}
                <path
                    d="M12 2.5 L14.8 8.5 L21.5 9.3 C21.7 9.3 21.8 9.6 21.6 9.8 L16.6 14.5 L18 21.1 C18 21.3 17.8 21.5 17.6 21.4 L12 18.2 L6.4 21.4 C6.2 21.5 6 21.3 6 21.1 L7.4 14.5 L2.4 9.8 C2.2 9.6 2.3 9.3 2.5 9.3 L9.2 8.5 L12 2.5 Z"
                    fill={`url(#star-core-${x}-${y})`}
                    stroke="none"
                    strokeLinejoin="round"
                    className="transition-all duration-400"
                />
            </svg>

            {/* Hover interaction glow (appears on hover) */}
            <div
                className="absolute inset-0 bg-orange-100/0 group-hover:bg-orange-100/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                    width: sizeMap[size].w * 2.5,
                    height: sizeMap[size].h * 2.5,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) scale(1.5)',
                }}
            />
        </div>
    );
};

export default Star;
// import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { cn } from '../../../utils/cn';

// const Star = ({ x, y, size = 'medium', active, onClick, delay = 0 }) => {
//     const starContainerRef = useRef(null);
//     const sizeClasses = {
//         small: 'w-5 h-5',
//         medium: 'w-7 h-7',
//         large: 'w-9 h-9'
//     };

//     useEffect(() => {
//         if (!starContainerRef.current) return;

//         const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: delay });

//         gsap.set(starContainerRef.current, { scale: 1, opacity: 1, filter: 'brightness(1)' });

//         tl.to(starContainerRef.current, {
//             scale: 1.12,
//             filter: 'brightness(1.2)',
//             duration: 3,
//             ease: "cubic-bezier(0.4, 0, 0.6, 1)"
//         });

//         gsap.to(starContainerRef.current, {
//             rotation: 5,
//             duration: 6,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             delay: Math.random() * 5
//         });

//         return () => {
//             tl.kill();
//         };
//     }, [delay]);

//     useEffect(() => {
//         if (!starContainerRef.current) return;

//         if (active) {
//             gsap.to(starContainerRef.current, {
//                 scale: 1.5,
//                 filter: 'brightness(1.5)',
//                 duration: 0.8,
//                 ease: "power2.out"
//             });
//         } else {

//             gsap.to(starContainerRef.current, {
//                 scale: 1,
//                 filter: 'brightness(1)',
//                 duration: 0.5
//             });
//         }
//     }, [active]);

//     const glowStyle = {
//         filter: `
//             drop-shadow(0 0 4px rgba(255, 229, 180, 0.8))
//             drop-shadow(0 0 8px rgba(255, 216, 155, 0.6))
//             drop-shadow(0 0 16px rgba(255, 160, 122, 0.4))
//             drop-shadow(0 0 24px rgba(255, 223, 186, 0.2))
//         `
//     };

//     return (
//         <div
//             ref={starContainerRef}
//             className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
//             style={{ left: `${x}%`, top: `${y}%` }}
//             onClick={onClick}
//         >
//             <svg
//                 viewBox="0 0 24 24"
//                 className={cn(
//                     "transition-all duration-300",
//                     sizeClasses[size],
//                     "text-white fill-white"
//                 )}
//                 style={glowStyle}
//             >
//                 <path d="M12 2.5 L14.8 8.5 L21.5 9.3 C21.7 9.3 21.8 9.6 21.6 9.8 L16.6 14.5 L18 21.1 C18 21.3 17.8 21.5 17.6 21.4 L12 18.2 L6.4 21.4 C6.2 21.5 6 21.3 6 21.1 L7.4 14.5 L2.4 9.8 C2.2 9.6 2.3 9.3 2.5 9.3 L9.2 8.5 L12 2.5 Z"
//                     stroke="none"
//                     strokeLinejoin="round" />
//             </svg>

//             <div className="absolute inset-0 bg-orange-200/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 pointer-events-none" />
//         </div>
//     );
// };

// export default Star;
