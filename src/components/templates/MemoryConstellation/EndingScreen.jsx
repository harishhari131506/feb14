import React, { useEffect, useRef, useState } from 'react';

/**
 * EndingScreen — REDESIGNED  ("dawn is not a reward, it is inevitable")
 *
 * Design-doc rules enforced:
 *   • Stars fade one by one, naturally.
 *   • Background lightens *imperceptibly* — no gradients screaming
 *     "sunrise".  Just the suggestion of morning.
 *   • Final text is centered, small.
 *   • "Begin again under the same sky." appears quietly after the
 *     main text, as the only interactive element.
 *   • No floating particles.  No sparkles.  No dramatic transforms.
 */

const EndingScreen = ({ show, onRestart }) => {
    const [phase, setPhase] = useState('hidden');
    // phases: hidden → fadeStars → mainText → restartPrompt

    useEffect(() => {
        if (!show) { setPhase('hidden'); return; }

        // 1. Stars have already been faded by the parent before show=true.
        //    We just begin the subtle dawn-light shift.
        setPhase('fadeStars');

        const t1 = setTimeout(() => setPhase('mainText'), 3200); // after dawn settles
        const t2 = setTimeout(() => setPhase('restartPrompt'), 7200); // 4 s after main text

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [show]);

    if (phase === 'hidden') return null;

    return (
        <>
            {/* ── dawn wash: a very subtle warm overlay that grows ── */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 28,
                    // Deep indigo at edges, a whisper of pale blue-grey at centre
                    background: 'radial-gradient(ellipse at center, rgba(42, 45, 62, 0.55) 0%, rgba(18, 16, 30, 0.85) 100%)',
                    opacity: phase === 'fadeStars' ? 0.6 : 0.78,
                    transition: 'opacity 5s ease',
                }}
            />

            {/* ── the suggestion of morning: a very faint horizon glow ── */}
            <div
                className="fixed bottom-0 left-0 right-0 pointer-events-none"
                style={{
                    zIndex: 29,
                    height: '35%',
                    background: 'linear-gradient(to top, rgba(55,50,72,0.35) 0%, transparent 100%)',
                    opacity: phase !== 'fadeStars' ? 1 : 0,
                    transition: 'opacity 6s ease',
                }}
            />

            {/* ── main text ── */}
            {(phase === 'mainText' || phase === 'restartPrompt') && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{ zIndex: 35, pointerEvents: 'none' }}
                >
                    <p
                        className="text-white/55 text-center"
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            lineHeight: 2,
                            letterSpacing: '0.06em',
                            animation: 'dawnTextIn 2.8s ease forwards',
                        }}
                    >
                        The sky keeps moving.<br />So do we.
                    </p>
                </div>
            )}

            {/* ── restart affordance — appears quietly after a pause ── */}
            {phase === 'restartPrompt' && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{ zIndex: 36, pointerEvents: 'none', paddingTop: '120px' }}
                >
                    <button
                        onClick={onRestart}
                        className="text-white/30 hover:text-white/60 transition-colors"
                        style={{
                            pointerEvents: 'auto',
                            fontFamily: "'Georgia', serif",
                            fontSize: '0.72rem',
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            animation: 'dawnTextIn 2.5s ease forwards',
                        }}
                    >
                        Begin again under the same sky
                    </button>
                </div>
            )}

            <style>{`
        @keyframes dawnTextIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
        </>
    );
};

export default EndingScreen;