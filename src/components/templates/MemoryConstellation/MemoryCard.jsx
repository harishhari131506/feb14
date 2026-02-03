import React, { useRef, useEffect, useState } from 'react';

/**
 * MemoryCard — REDESIGNED  ("memory painted into the sky")
 *
 * Design-doc rules enforced:
 *   • No glassmorphism. No panels. No borders.
 *   • Text appears *as if written into the sky*, slightly grainy,
 *     like breath fogging glass.
 *   • Text reveals line-by-line, slow enough to feel uncomfortable
 *     if rushed.
 *   • No emotion-color system.
 *   • No photos in the card.  Emotion is carried by spacing, pacing,
 *     and absence.
 *
 * Props
 *   memory   – { title, description, date } | null
 *   onClose  – callback
 *   phase    – 'climax' means longer, heavier, no close button
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
            }, 800 + i * 1400); // first line after 0.8 s, each next +1.4 s
            timeoutsRef.current.push(t);
        });

        return () => timeoutsRef.current.forEach(clearTimeout);
    }, [memory]);

    if (!memory) return null;

    const isClimax = phase === 'climax';

    return (
        <>
            {/* Very subtle dark vignette so text is legible — NOT a panel */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 30,
                    background:
                        'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.55) 100%)',
                    transition: 'opacity 2s ease',
                }}
            />

            {/* Memory text — centered, no container, no border */}
            <div
                className="fixed inset-0 flex flex-col items-center justify-center"
                style={{ zIndex: 31, pointerEvents: 'none' }}
            >
                {/* Title — small, uppercase, tracked, faint */}
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

                {/* Main memory text — line by line */}
                <div className="max-w-md text-center px-6" style={{ pointerEvents: 'none' }}>
                    {lines.map((line, i) => (
                        <p
                            key={i}
                            className="text-white/80 leading-relaxed mb-2"
                            style={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                                letterSpacing: '0.02em',
                                // Grainy / breath-on-glass feel via a very subtle text-shadow
                                // that slightly smears the letterforms
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

                {/* Grain overlay on the text area only — "breath fogging glass" */}
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

            {/* Close affordance — only shown outside climax, very quiet */}
            {!isClimax && (
                <button
                    onClick={onClose}
                    className="fixed bottom-12 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors"
                    style={{
                        zIndex: 40,
                        fontFamily: "'Georgia', serif",
                        fontSize: '0.7rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        pointerEvents: 'auto',
                        border: 'none',
                        background: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }}
                >
                    let it pass
                </button>
            )}

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