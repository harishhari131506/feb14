import React, { useState, useRef, useEffect } from 'react';

/**
 * ShootingStars — REDESIGNED (nearly silent)
 *
 * The design doc bans spectacle.  A shooting star is kept as a single,
 * very rare atmospheric whisper — one streak every 60-90 seconds.
 * No bright head, no sparkle particles, no glow.  Just a faint
 * diagonal smear that disappears before you're sure it was there.
 *
 * The parent can pass `disabled={true}` to silence it entirely
 * (e.g. during the climax or dawn phases).
 */

const ShootingStars = ({ disabled = false }) => {
    const [star, setStar] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (disabled) { clearTimeout(timeoutRef.current); setStar(null); return; }

        const spawnStar = () => {
            const id = Date.now();
            // Start near top-right quadrant, travel bottom-left
            const startX = window.innerWidth * (0.4 + Math.random() * 0.5);
            const startY = window.innerHeight * (0.05 + Math.random() * 0.25);

            setStar({ id, startX, startY });

            // Remove after animation duration
            setTimeout(() => setStar(null), 2200);

            // Next star in 60-90 seconds
            timeoutRef.current = setTimeout(spawnStar, 60000 + Math.random() * 30000);
        };

        // First star after a long pause (25-40 s) so it doesn't crowd entry
        timeoutRef.current = setTimeout(spawnStar, 25000 + Math.random() * 15000);

        return () => clearTimeout(timeoutRef.current);
    }, [disabled]);

    if (!star) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            <SingleStreak key={star.id} startX={star.startX} startY={star.startY} />
        </div>
    );
};

const SingleStreak = ({ startX, startY }) => {
    // Travel ~500 px at roughly 225° (down-left)
    const endX = startX - 380;
    const endY = startY + 260;
    const angle = Math.atan2(endY - startY, endX - startX);

    return (
        <div
            className="absolute"
            style={{
                left: startX,
                top: startY,
                width: 90,
                height: 1.5,
                transformOrigin: 'left center',
                transform: `rotate(${angle}rad)`,
                // The whole element slides from start to end over 1.8 s then fades
                animation: `streak-move 1.9s cubic-bezier(.2,0,.8,1) forwards`,
                '--dx': `${endX - startX}px`,
                '--dy': `${endY - startY}px`,
            }}
        >
            {/* Single gradient trail — no bright head, just a quiet fade */}
            <div
                className="w-full h-full"
                style={{
                    background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.15) 100%)',
                    borderRadius: 2,
                }}
            />

            <style>{`
        @keyframes streak-move {
          0%   { transform: rotate(${angle}rad) translateX(0);   opacity: 0;    }
          8%   { opacity: 0.7; }
          70%  { opacity: 0.35; }
          100% { transform: rotate(${angle}rad) translateX(520px); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default ShootingStars;