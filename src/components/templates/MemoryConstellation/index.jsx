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
    const skyRef = useRef(null); // The pannable/zoomable layer containing stars and lines
    const autoPlayRef = useRef(null);

    // Zoom/Pan State
    const handleStarClick = (memory) => {
        setActiveMemory(memory);

        // Zoom/Pan Effect logic...
        const scale = 1.3;
        const centerX = 50;
        const centerY = 50;

        // We need to move the sky such that memory.x/y ends up at center
        // Current approach is a bit simplistic for strict coordinate mapping but works for visual effect
        // xDist is percent offset
        const xDist = (centerX - memory.x) * scale;
        const yDist = (centerY - memory.y) * scale;

        gsap.to(skyRef.current, {
            scale: scale,
            xPercent: xDist, // Using xPercent for translation relative to element size is tricky if element is 100% width
            // Better to use x/y vw/vh units or stick to simple centering if possible.
            // Let's refine: moving the container's center to the viewport center.
            // If we scale origin center, we just need to translate.
            x: (centerX - memory.x) * (window.innerWidth / 100),
            y: (centerY - memory.y) * (window.innerHeight / 100),
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

    // Auto Play Logic
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
                    setTimeout(() => setShowEnding(true), 1000);
                    return;
                }

                handleStarClick(mockMemories[currentIndex]);
                currentIndex++;

                autoPlayRef.current = setTimeout(playNext, 6000); // Increased duration slightly
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
    }, [isAutoPlaying]);

    // Mouse Parallax Logic (Desktop Only)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (window.innerWidth < 768) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // +/- 10px range
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Subtle movement of background stars layer if we could access it, 
            // but here we can move the sky layer very slightly or use a distinct parallax layer.
            // Let's move the sky layer a tiny bit for depth feeling
            if (!activeMemory) {
                gsap.to(skyRef.current, { x: x, y: y, duration: 1, ease: "power2.out" });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeMemory]);


    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden selection:bg-amber-100/30 font-inter"
        >
            {/* 1. Deep Space Background Layers (Static/Ambient) */}
            <BackgroundLayers />

            {/* 2. Shooting Stars (Atmospheric) */}
            <ShootingStars />

            {/* Nav Back */}
            <Link to="/templates" className="absolute top-6 left-6 z-50 text-white/40 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 backdrop-blur-sm">
                <ArrowLeft size={20} />
            </Link>

            {/* Recipient Name */}
            <div className="absolute top-8 left-0 right-0 text-center z-30 pointer-events-none px-4">
                <h1 className="font-great-vibes text-4xl md:text-6xl text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fade-in-slow">
                    Sarah's Memory Sky
                </h1>
                <p className="font-inter text-blue-100/60 text-sm mt-3 font-light tracking-widest uppercase animate-fade-in-slower">
                    Touch the stars to relive our journey
                </p>
            </div>

            {/* 3. Interactive Constellation Layer (Zoomable) */}
            <div
                ref={skyRef}
                className="absolute inset-0 w-full h-full origin-center transition-transform will-change-transform z-10"
            >
                <ConstellationLines stars={mockMemories} />

                {mockMemories.map((mem, i) => (
                    <Star
                        key={mem.id}
                        {...mem}
                        delay={i * 0.3} // Staggered entry
                        active={activeMemory?.id === mem.id}
                        onClick={() => handleStarClick(mem)}
                    />
                ))}
            </div>

            {/* 4. Memory Card Overlay (Z-20) */}
            <MemoryCard
                memory={activeMemory}
                onClose={handleCloseCard}
            />

            {/* Controls */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-40 pointer-events-none">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="pointer-events-auto flex items-center space-x-2 px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/90 hover:bg-white/15 hover:border-white/30 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] group"
                >
                    {isAutoPlaying ? <Pause size={14} fill="white" className="group-hover:opacity-100 opacity-70" /> : <Play size={14} fill="white" className="group-hover:opacity-100 opacity-70" />}
                    <span className="font-inter text-xs tracking-[0.2em] font-medium uppercase group-hover:text-white transition-colors">
                        {isAutoPlaying ? "Pause Journey" : "Start Journey"}
                    </span>
                </button>
            </div>

            {/* 5. Ending Screen Overlay */}
            <EndingScreen show={showEnding} />

        </div>
    );
};

export default MemoryConstellation;
