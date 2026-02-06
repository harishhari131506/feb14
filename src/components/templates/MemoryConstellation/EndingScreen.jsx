import React, { useEffect, useRef, useState } from 'react';

/**
 * EndingScreen — SCENE 8: EPILOGUE
 *
 * "The Sky Remains"
 *
 * Design:
 *   • Stars have already faded.
 *   • Text appears centered, small.
 *   • "Begin again" is the only interactive element.
 */

const EndingScreen = ({ show, onRestart }) => {
    const [phase, setPhase] = useState('hidden');
    // phases: hidden → mainText → restartPrompt

    useEffect(() => {
        if (!show) { setPhase('hidden'); return; }

        // Short initial pause before text
        const t1 = setTimeout(() => setPhase('mainText'), 1500);
        // Pause before button
        const t2 = setTimeout(() => setPhase('restartPrompt'), 6000);

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [show]);

    if (phase === 'hidden') return null;

    return (
        <>
            {/* ── dawn wash: very subtle lightening ── */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    zIndex: 28,
                    background: 'radial-gradient(ellipse at center, rgba(42, 45, 62, 0.4) 0%, rgba(18, 16, 30, 0.7) 100%)', // slightly lighter than night
                    opacity: 0,
                    animation: 'dawnVerify 4s ease forwards'
                }}
            />

            {/* ── main text ── */}
            {(phase === 'mainText' || phase === 'restartPrompt') && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{ zIndex: 35, pointerEvents: 'none' }}
                >
                    <p
                        className="text-white/60 text-center px-6"
                        style={{
                            fontFamily: "'Georgia', serif",
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            lineHeight: 2,
                            letterSpacing: '0.06em',
                            animation: 'dawnTextIn 3s ease forwards',
                        }}
                    >
                        Wherever thou standest,<br />
                        the same heavens remember us still.
                    </p>
                </div>
            )}

            {/* ── restart affordance ── */}
            {phase === 'restartPrompt' && (
                <div
                    className="fixed inset-0 flex flex-col items-center justify-center"
                    style={{ zIndex: 36, pointerEvents: 'none', paddingTop: '140px' }}
                >
                    <button
                        onClick={onRestart}
                        className="text-white/30 hover:text-white/60 transition-colors"
                        style={{
                            pointerEvents: 'auto',
                            fontFamily: "'Georgia', serif",
                            fontSize: '0.75rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            animation: 'dawnTextIn 2.5s ease forwards',
                        }}
                    >
                        Begin again
                    </button>
                </div>
            )}

            <style>{`
        @keyframes dawnTextIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes dawnVerify {
            to { opacity: 1; }
        }
      `}</style>
        </>
    );
};

export default EndingScreen;