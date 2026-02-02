import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const CarouselCard = ({ index, total, isHovered }) => {
    // Simple placeholders for card content
    const colors = ['#FF1744', '#FFD700', '#9C27B0', '#FF4081', '#1A1A1A'];

    return (
        <div
            className="absolute top-0 left-0 w-[200px] h-[300px] rounded-xl shadow-2xl overflow-hidden border-2 border-white/20"
            style={{
                background: `linear-gradient(145deg, ${colors[index % colors.length]}, #222)`,
                transform: `rotateY(${(index * 360) / total}deg) translateZ(300px)`,
                backfaceVisibility: 'hidden', // or visible depending on desired effect, visible usually better for carousel
            }}
        >
            <div className="w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-playfair font-bold text-xl">Theme {index + 1}</h3>
            </div>
        </div>
    );
};

// Simplified approach using rotation container
const ThreeDCarousel = () => {
    const [isHovered, setIsHovered] = useState(false);
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    useEffect(() => {
        // Continuous rotation loop
        controls.start({
            rotateY: 360,
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            }
        });
    }, [controls]);

    useEffect(() => {
        if (isHovered) {
            controls.stop();
        } else {
            // Resume from current rotation logic is tricky with framer motion simple controls
            // For simplicity in this iteration, we accept a reset or just pause via CSS/state control if possible
            // But re-starting smoothly needs a bit of logic. 
            // A better approach for continuous loop that pauses is utilizing a ref-based frame loop or CSS animation play-state.
            // Let's use CSS for the continuous rotation as it's easier to pause.
        }
    }, [isHovered, controls]);


    return (
        <div className="perspective-container relative w-[300px] h-[400px] flex items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
            <motion.div
                className="relative w-[200px] h-[300px] preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                onHoverStart={() => setIsHovered(true)} // Note: hover on parent might not work perfectly with 3d children pointer events
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* We need a pause mechanism. Framer motion's animation is hard to pause/resume in place without complex logic. 
            Let's switch to CSS animation for the rotation wrapper for easy pausing.
        */}
                <div
                    className={`w-full h-full relative preserve-3d pointer-events-auto transition-transform duration-500 ${isHovered ? 'paused' : ''}`}
                    style={{
                        transformStyle: 'preserve-3d',
                        animation: 'spin 20s linear infinite',
                        animationPlayState: isHovered ? 'paused' : 'running'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:scale-105"
                            style={{
                                background: `linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))`,
                                transform: `rotateY(${i * 72}deg) translateZ(250px)`,
                                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
                            }}
                        >
                            {/* Card Content */}
                            <div className="w-full h-full p-1 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundColor: ['#FF1744', '#9C27B0', '#FFD700', '#FF4081', '#1A1A1A'][i],
                                        backgroundImage: `url(https://source.unsplash.com/random/300x400?romance,${i})` // Fallback color if image fails
                                    }}
                                />
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white text-xs font-inter uppercase tracking-widest opacity-80">Template 0{i + 1}</p>
                                    <h4 className="text-white font-playfair font-bold text-lg">Romantic Vibes</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <style>{`
        @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
      `}</style>
        </div>
    );
};

export default ThreeDCarousel;
