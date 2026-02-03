import React, { useRef, useEffect, useState } from 'react';

/**
 * Star — REDESIGNED
 *
 * Rules enforced from the design doc:
 *   • Stars never pulse rhythmically.
 *   • Focus is *subtractive*: when one star is active the rest dim;
 *     the active star does NOT glow more — it simply stays visible.
 *   • Imperfection: each star gets a tiny random positional jitter
 *     on mount so the field never looks grid-snapped.
 *   • No emotion-color system.  Every star is the same cool white /
 *     very-pale-gold.  Differentiation comes from size only.
 *
 * Props
 *   x, y        – position in percent
 *   size        – 'small' | 'medium' | 'large'
 *   active      – boolean, this star is the current narrative focus
 *   dimmed      – boolean, another star is active so this one fades
 *   interactable– boolean, only the *next* star the user can click
 *   onClick     – handler (only fires when interactable)
 *   delay       – mount stagger delay in seconds
 */

const Star = ({ x, y, size = 'medium', active, dimmed, interactable, onClick, delay = 0 }) => {
    const ref = useRef(null);
    // One-time random jitter so stars don't sit on a perfect grid
    const [jitter] = useState(() => ({
        x: (Math.random() - 0.5) * 1.4, // ± 0.7 %
        y: (Math.random() - 0.5) * 1.4,
    }));

    const px = x + jitter.x;
    const py = y + jitter.y;

    // Pixel sizes – kept small and understated
    const sizeMap = { small: 5, medium: 7, large: 10 };
    const r = sizeMap[size] || 6;

    // ── opacity logic ──────────────────────────────────────────
    // neutral   → 0.45   (most of the time; quiet presence)
    // dimmed    → 0.08   (another star is the focus)
    // active    → 0.90   (this is the current memory star)
    // interactable (and not active) → 0.55  (subtle invitation)
    let opacity = 0.45;
    if (active) opacity = 0.92;
    else if (dimmed) opacity = 0.08;
    else if (interactable) opacity = 0.55;

    return (
        <>
            {/* Keyframes injected once per star with its own duration */}
            <style>{`
        @keyframes star-breathe-${Math.round(px * 100)}-${Math.round(py * 100)} {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>

            <div
                ref={ref}
                onClick={interactable ? onClick : undefined}
                className="absolute"
                style={{
                    left: `${px}%`,
                    top: `${py}%`,
                    width: r * 2,
                    height: r * 2,
                    transform: 'translate(-50%, -50%)',
                    cursor: interactable ? 'pointer' : 'default',
                    // Opacity transition is slow and eased — feels like the sky
                    // breathing, not a UI toggle.
                    opacity,
                    transition: 'opacity 2.8s cubic-bezier(.4,0,.2,1)',
                    // Mount delay so stars don't all appear simultaneously
                    animationDelay: `${delay}s`,
                    zIndex: 20,
                }}
            >
                {/* The star itself: a small circle with a very faint warm centre */}
                <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`}>
                    <defs>
                        <radialGradient id={`star-grad-${Math.round(px * 100)}-${Math.round(py * 100)}`}>
                            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                            <stop offset="55%" stopColor="#ffe8c8" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#ffe8c8" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle
                        cx={r}
                        cy={r}
                        r={r}
                        fill={`url(#star-grad-${Math.round(px * 100)}-${Math.round(py * 100)})`}
                    />
                </svg>

                {/* Hover hint — only when interactable, very subtle ring */}
                {interactable && !active && (
                    <div
                        className="absolute inset-0 rounded-full border border-white/20"
                        style={{
                            width: r * 3.5,
                            height: r * 3.5,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            opacity: 0.25,
                            animation: `pulse-ring 3s ease-in-out infinite`,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Star;