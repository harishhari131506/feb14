import React from 'react';

/**
 * ConstellationLines — REDESIGNED
 *
 * The design doc explicitly bans constellation lines, diagrams, and
 * "glowing dot" navigation.  This component now serves a single quiet
 * purpose: it lays a full-bleed SVG noise-grain texture over the sky
 * to add the tactile imperfection the brief demands
 * ("Imperfection matters. Slight jitter. Noise.").
 *
 * The *dimming* logic that replaces the old connecting-line role is
 * handled by the parent (MemoryConstellation) passing an `dimmed`
 * prop down to each <Star>.  Nothing is drawn here between stars.
 */

const ConstellationLines = () => {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
            aria-hidden="true"
        >
            <defs>
                {/* Fractal noise filter — gives the sky a faint grain */}
                <filter id="sky-grain" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="4"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feColorMatrix
                        type="saturate"
                        values="0"
                        in="noise"
                        result="mono"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="mono"
                        mode="overlay"
                        result="grainBlend"
                    />
                    <feComponentTransfer in="grainBlend">
                        <feFuncA type="linear" slope="0.035" />
                    </feComponentTransfer>
                </filter>
            </defs>

            {/* Single rect that receives the grain filter */}
            <rect
                width="100%"
                height="100%"
                filter="url(#sky-grain)"
                fill="transparent"
            />
        </svg>
    );
};

export default ConstellationLines;