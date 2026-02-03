import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ConstellationLines = ({ stars }) => {
    const linesRef = useRef([]);
    const svgRef = useRef(null);

    useEffect(() => {
        // Animated draw effect on load
        const lines = linesRef.current.filter(Boolean);

        lines.forEach((line, i) => {
            if (!line) return;

            // Calculate actual path length for accurate draw animation
            const length = line.getTotalLength();

            // Set up for draw animation
            gsap.set(line, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });
        });

        // Staggered draw animation
        gsap.to(lines, {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.4,
            ease: "power2.inOut",
            delay: 1.5 // After stars appear
        });

    }, [stars]);

    // Helper to generate unique gradient IDs
    const getGradientId = (i) => `line-gradient-${i}`;

    return (
        <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: 5 }}
        >
            <defs>
                {stars.map((star, i) => {
                    if (i === stars.length - 1) return null;
                    const nextStar = stars[i + 1];

                    return (
                        <linearGradient
                            key={getGradientId(i)}
                            id={getGradientId(i)}
                            x1={`${star.x}%`}
                            y1={`${star.y}%`}
                            x2={`${nextStar.x}%`}
                            y2={`${nextStar.y}%`}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="#FFD89B" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#C8B8E8" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#FFD89B" stopOpacity="0.5" />
                        </linearGradient>
                    );
                })}

                {/* Glow filter for lines */}
                <filter id="line-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {stars.map((star, i) => {
                if (i === stars.length - 1) return null;
                const nextStar = stars[i + 1];

                return (
                    <line
                        ref={el => linesRef.current[i] = el}
                        key={`line-${i}`}
                        x1={`${star.x}%`}
                        y1={`${star.y}%`}
                        x2={`${nextStar.x}%`}
                        y2={`${nextStar.y}%`}
                        stroke={`url(#${getGradientId(i)})`}
                        strokeWidth="1"
                        strokeLinecap="round"
                        fill="none"
                        style={{
                            strokeDasharray: '3 6', // 3px dash, 6px gap (more delicate)
                            filter: 'url(#line-glow) drop-shadow(0 0 3px rgba(200, 184, 232, 0.4))'
                        }}
                        className="transition-all duration-500"
                    />
                );
            })}
        </svg>
    );
};

export default ConstellationLines;
// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const ConstellationLines = ({ stars }) => {
//     const linesRef = useRef([]);

//     useEffect(() => {
//         // Draw animation on load
//         // Staggered draw of lines from left to right roughly
//         gsap.fromTo(linesRef.current,
//             { strokeDashoffset: 1000 },
//             {
//                 strokeDashoffset: 0,
//                 duration: 2,
//                 stagger: 0.3,
//                 ease: "power2.inOut",
//                 delay: 1 // Delay after stars appear
//             }
//         );
//     }, []);

//     // Helper to generate a unique ID for gradients
//     const getGradientId = (i) => `line-gradient-${i}`;

//     return (
//         <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
//             <defs>
//                 {stars.map((star, i) => {
//                     if (i === stars.length - 1) return null;
//                     const nextStar = stars[i + 1];
//                     return (
//                         <linearGradient key={getGradientId(i)} id={getGradientId(i)} x1={`${star.x}%`} y1={`${star.y}%`} x2={`${nextStar.x}%`} y2={`${nextStar.y}%`} gradientUnits="userSpaceOnUse">
//                             <stop offset="0%" stopColor="#FFD89B" /> {/* Start Gold */}
//                             <stop offset="50%" stopColor="#C8B8E8" /> {/* Mid Purple */}
//                             <stop offset="100%" stopColor="#FFD89B" /> {/* End Gold */}
//                         </linearGradient>
//                     );
//                 })}
//             </defs>

//             {stars.map((star, i) => {
//                 if (i === stars.length - 1) return null;
//                 const nextStar = stars[i + 1];

//                 // Calculate approximate length for strokeDasharray logic if needed,
//                 // but simple large value usually works well for draw effect.

//                 return (
//                     <line
//                         ref={el => linesRef.current[i] = el}
//                         key={i}
//                         x1={`${star.x}%`}
//                         y1={`${star.y}%`}
//                         x2={`${nextStar.x}%`}
//                         y2={`${nextStar.y}%`}
//                         stroke={`url(#${getGradientId(i)})`}
//                         strokeWidth="1"
//                         style={{
//                             strokeDasharray: '4 4', // 3px dash, 4px gap roughly
//                             filter: 'drop-shadow(0 0 2px rgba(200, 184, 232, 0.4))'
//                         }}
//                     />
//                 );
//             })}
//         </svg>
//     );
// };

// export default ConstellationLines;
