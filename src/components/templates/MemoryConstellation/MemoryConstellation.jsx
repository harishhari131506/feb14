import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import BackgroundLayers from './BackgroundLayers';
import ShootingStars from './ShootingStars';
import Star from './Star';
import ConstellationLines from './ConstellationLines';
import MemoryCard from './MemoryCard';
import EndingScreen from './EndingScreen';
import { Play, Pause, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockMemories = [
    { id: 1, x: 15, y: 60, size: 'small', date: 'Oct 14, 2023', title: "The First Hello", description: "The moment our eyes met across the room. I knew something changed forever.", emotion: "Surprise", photo: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop" },
    { id: 2, x: 25, y: 30, size: 'medium', date: 'Nov 02, 2023', title: "Coffee Date", description: "Three hours of talking about everything and nothing. The coffee got cold, but my heart was warm.", emotion: "Joy", photo: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" },
    { id: 3, x: 40, y: 70, size: 'large', date: 'Dec 24, 2023', title: "First Kiss", description: "Under the mistletoe, shy and sweet. The world stopped spinning for a second.", emotion: "Love", photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop" },
    { id: 4, x: 55, y: 40, size: 'medium', date: 'Feb 14, 2024', title: "Our First Valentine", description: "A simple dinner, a handwritten card. Perfect in its simplicity.", emotion: "Peaceful", photo: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop" },
    { id: 5, x: 70, y: 65, size: 'small', date: 'May 20, 2024', title: "Road Trip", description: "Singing at the top of our lungs, getting lost, and finding beautiful places.", emotion: "Adventure", photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" },
    { id: 6, x: 85, y: 25, size: 'large', date: 'Aug 10, 2024', title: "Moving In", description: "Boxes everywhere, pizza on the floor. The start of our shared home.", emotion: "Milestone", photo: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop" },
];

const MemoryConstellation = () => {
    const [activeMemory, setActiveMemory] = useState(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [showEnding, setShowEnding] = useState(false);

    const containerRef = useRef(null);
    const skyRef = useRef(null);
    const autoPlayRef = useRef(null);
    const headerRef = useRef(null);

    // Initial page load animation
    useEffect(() => {
        // Fade in header with stagger
        gsap.fromTo(headerRef.current?.children || [],
            { opacity: 0, y: -20 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            }
        );
    }, []);

    // Enhanced zoom/pan when clicking a star
    const handleStarClick = (memory) => {
        setActiveMemory(memory);

        const scale = 1.4;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Calculate offset to center the clicked star
        const targetX = (50 - memory.x) * (vw / 100) * scale;
        const targetY = (50 - memory.y) * (vh / 100) * scale;

        gsap.to(skyRef.current, {
            scale: scale,
            x: targetX,
            y: targetY,
            duration: 1.5,
            ease: "power2.inOut"
        });
    };

    const handleCloseCard = () => {
        setActiveMemory(null);
        gsap.to(skyRef.current, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    };

    // Auto-play journey through memories
    useEffect(() => {
        if (isAutoPlaying) {
            let currentIndex = 0;
            if (activeMemory) {
                currentIndex = mockMemories.findIndex(m => m.id === activeMemory.id) + 1;
            }

            const playNext = () => {
                if (currentIndex >= mockMemories.length) {
                    setIsAutoPlaying(false);
                    handleCloseCard();
                    setTimeout(() => setShowEnding(true), 1200);
                    return;
                }

                handleStarClick(mockMemories[currentIndex]);
                currentIndex++;
                autoPlayRef.current = setTimeout(playNext, 6000);
            };

            if (!activeMemory) {
                playNext();
            } else {
                autoPlayRef.current = setTimeout(playNext, 6000);
            }
        } else {
            clearTimeout(autoPlayRef.current);
        }

        return () => clearTimeout(autoPlayRef.current);
    }, [isAutoPlaying, activeMemory]);

    // Gentle mouse parallax (desktop only)
    useEffect(() => {
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e) => {
            if (activeMemory) return; // Disable during active memory

            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;

            gsap.to(skyRef.current, {
                x: x,
                y: y,
                duration: 1.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeMemory]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden selection:bg-purple-200/20 font-inter"
        >
            {/* Layer 0: Deep Space Background */}
            <BackgroundLayers />

            {/* Layer 1: Shooting Stars */}
            <ShootingStars />

            {/* Back Navigation */}
            <Link
                to="/templates"
                className="absolute top-6 left-6 z-50 text-white/40 hover:text-white transition-all duration-300 p-2.5 rounded-full hover:bg-white/5 backdrop-blur-sm border border-white/0 hover:border-white/10 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            </Link>

            {/* Header - Recipient Name */}
            <div
                ref={headerRef}
                className="absolute top-8 left-0 right-0 text-center z-30 pointer-events-none px-6"
            >
                <h1 className="font-great-vibes text-4xl md:text-6xl lg:text-7xl text-white/95 tracking-wide opacity-0"
                    style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(200, 184, 232, 0.2)',
                        filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3))'
                    }}
                >
                    Sarah's Memory Sky
                </h1>
                <p className="font-inter text-blue-100/50 text-xs md:text-sm mt-4 font-light tracking-[0.3em] uppercase opacity-0">
                    Touch the stars to relive our journey
                </p>
            </div>

            {/* Layer 2: Interactive Constellation (Zoomable/Pannable) */}
            <div
                ref={skyRef}
                className="absolute inset-0 w-full h-full origin-center will-change-transform"
                style={{ zIndex: 10 }}
            >
                {/* Constellation connecting lines */}
                <ConstellationLines stars={mockMemories} />

                {/* Memory stars */}
                {mockMemories.map((mem, i) => (
                    <Star
                        key={mem.id}
                        {...mem}
                        delay={i * 0.3}
                        active={activeMemory?.id === mem.id}
                        onClick={() => handleStarClick(mem)}
                    />
                ))}
            </div>

            {/* Layer 3: Memory Card Modal */}
            {activeMemory && (
                <MemoryCard
                    memory={activeMemory}
                    onClose={handleCloseCard}
                />
            )}

            {/* Journey Controls */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-40 pointer-events-none px-6">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`
                        pointer-events-auto flex items-center space-x-3 px-8 py-3.5 rounded-full
                        bg-white/5 backdrop-blur-xl border border-white/10 
                        text-white/90 hover:text-white
                        hover:bg-white/10 hover:border-white/20
                        transition-all duration-500 active:scale-95
                        shadow-[0_0_30px_rgba(255,255,255,0.05)]
                        group
                    `}
                >
                    {isAutoPlaying ? (
                        <Pause size={15} fill="white" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <Play size={15} fill="white" className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                    <span className="font-inter text-xs md:text-sm tracking-[0.2em] font-medium uppercase">
                        {isAutoPlaying ? "Pause Journey" : "Journey Through Time"}
                    </span>
                </button>
            </div>

            {/* Layer 4: Ending Screen */}
            <EndingScreen show={showEnding} />

            {/* Depth particles (foreground, very subtle) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 25 }}>
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`depth-${i}`}
                        className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/10 blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.1;
                    }
                    50% {
                        transform: translateY(-30px) translateX(10px);
                        opacity: 0.2;
                    }
                }

                /* Smooth scrolling for any nested content */
                * {
                    scroll-behavior: smooth;
                }

                /* Custom font loading (Great Vibes for script) */
                @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
            `}</style>
        </div>
    );
};

export default MemoryConstellation;