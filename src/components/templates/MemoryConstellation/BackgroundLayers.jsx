import React, { useEffect, useRef } from 'react';

/**
 * BackgroundLayers — REDESIGNED
 *
 * Design-doc rules enforced:
 *   • Sky drifts slowly on its own (vertical auto-scroll).  The mouse
 *     does NOT move it — "the sky ignores the user slightly."
 *   • Stars are subtle, uneven, imperfect.  Many barely visible.
 *   • Stars never pulse rhythmically.  Each one has its own very slow,
 *     slightly-random opacity drift (not a shared keyframe).
 *   • Noise / grain texture added for tactile imperfection.
 *   • A `skyPhase` prop lets the parent shift atmosphere over the
 *     journey:  'night' (default cool dark), 'distance' (slightly
 *     warmer mid-tones), 'climax' (more stars, brighter bg),
 *     'dawn' (subtle lightening).
 */

const BackgroundLayers = ({ skyPhase = 'night' }) => {
    const starsCanvasRef = useRef(null);
    const dustCanvasRef = useRef(null);
    const animFrameRef = useRef(null);
    // Store star data so we can animate their individual opacities
    const starsDataRef = useRef([]);
    const timeRef = useRef(0);

    // ── phase-driven colours ──────────────────────────────────
    const phaseStyles = {
        night: { from: '#030916', mid: '#0f0e23', to: '#1a1535' },
        distance: { from: '#050b1a', mid: '#151230', to: '#221e3d' },
        climax: { from: '#080d1e', mid: '#151332', to: '#201b3a' },
        dawn: { from: '#0e1224', mid: '#1e1d38', to: '#3a2f4e' },
    };
    const colors = phaseStyles[skyPhase] || phaseStyles.night;

    // ── static + animated star layer ──────────────────────────
    useEffect(() => {
        const canvas = starsCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateStars();
        };

        const generateStars = () => {
            // More stars during climax
            const count = skyPhase === 'climax'
                ? (window.innerWidth < 768 ? 100 : 220)
                : (window.innerWidth < 768 ? 55 : 130);

            starsDataRef.current = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                // Imperfect radii — many are sub-pixel (barely visible)
                r: Math.random() * 1.8 + 0.3,
                baseOpacity: Math.random() * 0.35 + 0.1,   // 0.1–0.45
                // Each star drifts on its own timeline
                driftSpeed: Math.random() * 0.18 + 0.04,  // slow
                driftOffset: Math.random() * Math.PI * 2,
                // Very slight colour tint (white / pale gold)
                warm: Math.random() > 0.65,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            timeRef.current += 0.008; // advances ~once per frame at 60 fps

            starsDataRef.current.forEach(s => {
                // Slow sinusoidal drift — each star on its own phase & speed
                const osc = Math.sin(timeRef.current * s.driftSpeed + s.driftOffset);
                const opacity = s.baseOpacity + osc * 0.12; // very narrow swing

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.warm
                    ? `rgba(255, 242, 215, ${Math.max(0, opacity)})`
                    : `rgba(225, 232, 250, ${Math.max(0, opacity)})`;
                ctx.fill();
            });

            animFrameRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [skyPhase]);

    // ── dust / stardust particles ─────────────────────────────
    useEffect(() => {
        const canvas = dustCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let frame;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const count = window.innerWidth < 768 ? 80 : 180;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.10,
                vy: (Math.random() - 0.5) * 0.10,
                r: Math.random() * 0.9 + 0.2,
                o: Math.random() * 0.10 + 0.03,
            }));
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 228, 245, ${p.o})`;
                ctx.fill();
            });
            frame = requestAnimationFrame(render);
        };

        window.addEventListener('resize', init);
        init();
        render();
        return () => { window.removeEventListener('resize', init); cancelAnimationFrame(frame); };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            {/* ── base gradient (phase-aware) ── */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to bottom, ${colors.from} 0%, ${colors.mid} 50%, ${colors.to} 100%)`,
                    transition: 'background 4s ease',  // smooth phase transitions
                }}
            />

            {/* Subtle nebula glow – intentionally understated */}
            <div className="absolute top-[12%] right-[8%]  w-[320px] h-[320px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(80,60,120,0.07) 0%, transparent 70%)', filter: 'blur(90px)' }} />
            <div className="absolute top-[45%] left-[3%]  w-[400px] h-[400px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(60,55,100,0.09) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className="absolute bottom-[15%] right-[20%] w-[280px] h-[280px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(70,50,105,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />

            {/* ── star canvas (animated opacity drift) ── */}
            <canvas
                ref={starsCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: skyPhase === 'dawn' ? 0.55 : 0.7, transition: 'opacity 5s ease' }}
            />

            {/* ── dust canvas ── */}
            <canvas
                ref={dustCanvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* ── SVG noise grain over everything ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06, mixBlendMode: 'overlay' }} aria-hidden="true">
                <filter id="bg-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#bg-grain)" />
            </svg>

            {/* ── slow vertical drift wrapper ──
           The sky scrolls upward on its own at ~40 px / 60 s.
           This is a pure CSS animation — no JS, no mouse.          */}
            <style>{`
        /* Not applied to canvases (they re-draw each frame already)
           but applied to the nebula glows via .drift-layer */
        @keyframes sky-drift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-60px); }
        }
      `}</style>
            {/* Invisible drift nudger — the nebula divs above sit inside
          the normal flow and already animate via the canvas loop.
          For the CSS glows we use a wrapper: */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ animation: 'sky-drift 90s linear infinite' }}
            >
                {/* duplicate nebula glows that drift */}
                <div className="absolute top-[25%] left-[15%] w-[350px] h-[350px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(65,55,95,0.06) 0%, transparent 70%)', filter: 'blur(85px)' }} />
                <div className="absolute top-[60%] right-[12%] w-[300px] h-[300px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(75,60,110,0.05) 0%, transparent 70%)', filter: 'blur(75px)' }} />
            </div>
        </div>
    );
};

export default BackgroundLayers;