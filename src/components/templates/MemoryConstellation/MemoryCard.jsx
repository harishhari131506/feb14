import React, { useRef, useEffect, useState } from 'react';

/**
 * MemoryCard — REDESIGNED
 * 
 * "Memory painted into the sky"
 * 
 * Adjusted for "The Sky That Knew Us":
 * - Pure text presentation.
 * - Supports auto-close flow (removed manual close largely, or kept as failsafe).
 * - Removed date display if empty.
 */

const MemoryCard = ({ memory, onClose, phase }) => {
    const [visibleLines, setVisibleLines] = useState([]);
    const timeoutsRef = useRef([]);

    // Split description into lines for line-by-line reveal
    const lines = memory ? memory.description.split('\n').filter(Boolean) : [];

    useEffect(() => {
        // Reset
        setVisibleLines([]);
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        if (!memory) return;

        // Stagger each line in: 1.4 s between lines (uncomfortable-if-rushed pace)
        lines.forEach((_, i) => {
            const t = setTimeout(() => {
                setVisibleLines(prev => [...prev, i]);
            }, 500 + i * 1400); // slightly faster start
            timeoutsRef.current.push(t);
        });

        return () => timeoutsRef.current.forEach(clearTimeout);
    }, [memory]);

    if (!memory) return null;

    // In this specific journey, we largely rely on auto-close for pacing, 
    // but we can keep the button for 'normal' phase if needed.
    // However, the script says "No 'Next' button". "The sky decides."
    // So we hide manual controls mostly.
    const showManualClose = false; // Enforce strict narrative control

    return (
        <>
            {/* Very subtle dark vignette */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 30,
                    background:
                        'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.55) 100%)',
                    transition: 'opacity 2s ease',
                }}
            />

            {/* Memory text */}
            <div
                className="fixed inset-0 flex flex-col items-center justify-center"
                style={{ zIndex: 31, pointerEvents: 'none' }}
            >
                {/* Title/Date (optional, often empty in this script) */}
                {memory.date && (
                    <p
                        className="text-white/35 text-xs tracking-[0.35em] uppercase mb-5"
                        style={{
                            fontFamily: "'Georgia', serif",
                            opacity: 1,
                            animation: 'fadeSlowIn 1.8s ease forwards',
                        }}
                    >
                        {memory.date}
                    </p>
                )}

                {/* Main memory text */}
                <div className="max-w-md text-center px-6" style={{ pointerEvents: 'none' }}>
                    {lines.map((line, i) => (
                        <p
                            key={i}
                            className="text-white/80 leading-relaxed mb-4"
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                                letterSpacing: '0.02em',
                                textShadow: '0 0 8px rgba(255,255,255,0.08)',
                                opacity: visibleLines.includes(i) ? 1 : 0,
                                transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(6px)',
                                transition: 'opacity 1.6s cubic-bezier(.4,0,.2,1), transform 1.6s cubic-bezier(.4,0,.2,1)',
                            }}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                {/* Grain overlay */}
                <svg
                    className="fixed inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 32, opacity: 0.04, mixBlendMode: 'overlay' }}
                    aria-hidden="true"
                >
                    <filter id="memory-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#memory-grain)" />
                </svg>
            </div>

            <style>{`
        @keyframes fadeSlowIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
};

export default MemoryCard;