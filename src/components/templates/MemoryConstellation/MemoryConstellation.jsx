import React, { useState, useRef, useEffect, useCallback } from 'react';
import BackgroundLayers from './BackgroundLayers';
import ShootingStars from './ShootingStars';
import Star from './Star';
import ConstellationLines from './ConstellationLines';
import MemoryCard from './MemoryCard';
import EndingScreen from './EndingScreen';
import { ArrowLeft } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  SCENE DATA
// ─────────────────────────────────────────────────────────────
// Scene 2: The First Star
const scene2Data = {
    id: 'scene2', x: 50, y: 50, size: 'medium',
    text: "So stood we once—\nunremarked by the world.", // Shown near star 
    reveal: "Yet infinite to one another." // Shown in card
};

// Scene 3: The Remembering
const scene3Data = {
    id: 'scene3', x: 25, y: 40, size: 'small',
    // Shown in card
    reveal: "We spoke of nothing.\n\nAnd in that nothing—\n\nfound all the world."
};

// Scene 4: The Passing of Time
const scene4Data = {
    id: 'scene4', x: 75, y: 65, size: 'medium',
    reveal: "Thus love proceeds:\nnot by return,\nbut by continuation."
};

// Scene 5: Of Distance (Pair)
const scene5Data = [
    { id: 'scene5a', x: 20, y: 30, size: 'small', reveal: "You looked up from there." },
    { id: 'scene5b', x: 80, y: 30, size: 'small', reveal: "I looked up from here." }
];

// Scene 6: The Night That Would Not Pass (Climax)
const scene6Data = {
    id: 'scene6', x: 50, y: 45, size: 'large',
    reveal: "Some moments are not lived.\n\nThey are kept."
};


const MemoryConstellation = () => {
    // ── state ─────────────────────────────────────────────────
    // 'prologue-1' | 'prologue-2' | 'waiting-first' | 'first-revealed'
    // 'scene3-waiting' | 'scene3-revealed'
    // 'scene4-waiting' | 'scene4-revealed'
    // 'scene5-waiting' | 'scene5a-revealed' | 'scene5b-revealed' | 'scene5-both-revealed' | 'scene5-final'
    // 'scene6-waiting' | 'scene6-revealed'
    // 'fading' | 'epilogue'
    const [phase, setPhase] = useState('prologue-1');

    const [activeCard, setActiveCard] = useState(null); // { reveal: string, ... }
    const [introText, setIntroText] = useState(null); // Center screen text for prologue

    // Timers
    const timersRef = useRef([]);
    const addTimer = (fn, ms) => {
        const id = setTimeout(fn, ms);
        timersRef.current.push(id);
        return id;
    };
    useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

    // ── SCENE 1: PROLOGUE ─────────────────────────────────────
    useEffect(() => {
        // "Soft night attends thee."
        addTimer(() => setIntroText("Soft night attends thee."), 2000);
        addTimer(() => setIntroText(null), 6000);

        // "Above thee spreads the ancient vault."
        addTimer(() => setIntroText("Above thee spreads the ancient vault."), 7500);
        addTimer(() => setIntroText(null), 12500);

        // Transition to Scene 2
        addTimer(() => setPhase('waiting-first'), 14000);
    }, []);

    // ── ACTION HANDLERS ───────────────────────────────────────

    // Scene 2 Click
    const handleScene2Click = () => {
        setPhase('first-revealed');
        setActiveCard({
            description: scene2Data.reveal,
            date: '' // No date in this design
        });

        // Auto-close after reading (6s)
        addTimer(() => {
            setActiveCard(null);
            // Move to Scene 3
            addTimer(() => setPhase('scene3-waiting'), 2000);
        }, 6000);
    };

    // Scene 3 Click
    const handleScene3Click = () => {
        setPhase('scene3-revealed');
        setActiveCard({ description: scene3Data.reveal, date: '' });

        // Auto-close (8s - longer text)
        addTimer(() => {
            setActiveCard(null);
            // Move to Scene 4
            addTimer(() => setPhase('scene4-waiting'), 2000);
        }, 8000);
    };

    // Scene 4 Click
    const handleScene4Click = () => {
        setPhase('scene4-revealed');
        setActiveCard({ description: scene4Data.reveal, date: '' });

        // Auto-close (6s)
        addTimer(() => {
            setActiveCard(null);
            // Move to Scene 5
            addTimer(() => setPhase('scene5-waiting'), 2000);
        }, 6500);
    };

    // Scene 5 Clicks
    const [scene5State, setScene5State] = useState({ a: false, b: false });

    const handleScene5Click = (part) => {
        if (part === 'a') {
            setActiveCard({ description: scene5Data[0].reveal, date: '' });
            setScene5State(prev => ({ ...prev, a: true }));
        } else {
            setActiveCard({ description: scene5Data[1].reveal, date: '' });
            setScene5State(prev => ({ ...prev, b: true }));
        }

        // Close individual card quickly
        addTimer(() => setActiveCard(null), 3500);
    };

    useEffect(() => {
        if (scene5State.a && scene5State.b && phase === 'scene5-waiting') {
            // Both clicked
            setPhase('scene5-both-done');
            addTimer(() => {
                setIntroText("Yet the sky held us both."); // Center text for unification
                addTimer(() => {
                    setIntroText(null);
                    setPhase('scene6-waiting');
                }, 5000);
            }, 4000);
        }
    }, [scene5State, phase]);


    // Scene 6 Click (Climax)
    const handleScene6Click = () => {
        setPhase('scene6-revealed');
        setActiveCard({ description: scene6Data.reveal, date: '' });

        // Long hold (10s)
        addTimer(() => {
            setActiveCard(null);
            setPhase('fading'); // Scene 7

            // Scene 7: Fading Stars -> Scene 8: Epilogue
            // "Not as deserters..." text handled by introText or EndingScreen? 
            // Let's use introText for the transition line, then EndingScreen.
            addTimer(() => {
                setIntroText("Not as deserters,\nbut as guardians relieved of duty.");
                addTimer(() => {
                    setIntroText(null);
                    setPhase('epilogue');
                }, 6000);
            }, 2000);

        }, 10000);
    };

    // ── RESTART ──────────────────────────────────────────────
    const handleRestart = () => {
        window.location.reload(); // Simplest full reset to "Prologue"
    };

    // ── RENDER HELPERS ───────────────────────────────────────
    let skyPhase = 'night';
    if (phase.includes('scene5')) skyPhase = 'distance';
    if (phase.includes('scene6')) skyPhase = 'climax';
    if (phase === 'fading' || phase === 'epilogue') skyPhase = 'dawn';

    return (
        <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Georgia', serif" }}>
            <BackgroundLayers skyPhase={skyPhase} />
            <ShootingStars disabled={phase === 'scene6-revealed' || phase === 'epilogue'} />
            <ConstellationLines />

            {/* Back Nav */}
            <button className="absolute top-5 left-5 text-white/20 hover:text-white/50 transition-colors p-2 z-50">
                <ArrowLeft size={18} />
            </button>

            {/* ── CENTER TEXT OVERLAY (Prologue, Distance Unification, Fading) ── */}
            {introText && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                    <p className="text-white/60 text-center px-6 leading-loose"
                        style={{ fontSize: '1.1rem', letterSpacing: '0.08em', animation: 'gentleFadeIn 2s ease forwards' }}>
                        {introText}
                    </p>
                </div>
            )}

            {/* ── SCENE 2 STAR ── */}
            {(phase === 'waiting-first') && (
                <>
                    <Star x={scene2Data.x} y={scene2Data.y} size={scene2Data.size}
                        interactable={true}
                        onClick={handleScene2Click} delay={0} />
                    {/* Text next to star */}
                    <div className="absolute text-white/40 text-xs tracking-widest pointer-events-none"
                        style={{ left: `${scene2Data.x + 2}%`, top: `${scene2Data.y}%`, animation: 'gentleFadeIn 3s ease forwards' }}>
                        {scene2Data.text}
                    </div>
                </>
            )}

            {/* ── SCENE 3 STAR ── */}
            {(phase === 'scene3-waiting') && (
                <Star x={scene3Data.x} y={scene3Data.y} size={scene3Data.size}
                    interactable={true} onClick={handleScene3Click} />
            )}

            {/* ── SCENE 4 STAR ── */}
            {(phase === 'scene4-waiting') && (
                <Star x={scene4Data.x} y={scene4Data.y} size={scene4Data.size}
                    interactable={true} onClick={handleScene4Click} />
            )}

            {/* ── SCENE 5 STARS ── */}
            {(phase === 'scene5-waiting') && (
                <>
                    <Star x={scene5Data[0].x} y={scene5Data[0].y} size='small'
                        interactable={!scene5State.a} onClick={() => handleScene5Click('a')} />
                    <Star x={scene5Data[1].x} y={scene5Data[1].y} size='small'
                        interactable={!scene5State.b} onClick={() => handleScene5Click('b')} />
                </>
            )}

            {/* ── SCENE 6 STAR (Climax) ── */}
            {(phase === 'scene6-waiting') && (
                <Star x={scene6Data.x} y={scene6Data.y} size={scene6Data.size}
                    interactable={true} onClick={handleScene6Click} />
            )}

            {/* ── MEMORY CARD ── */}
            {activeCard && (
                <MemoryCard
                    memory={activeCard}
                    phase={phase === 'scene6-revealed' ? 'climax' : 'normal'}
                    // No onClose needed because orchestrator auto-closes for this journey
                    onClose={() => { }}
                />
            )}

            {/* ── ENDING ── */}
            <EndingScreen show={phase === 'epilogue'} onRestart={handleRestart} />

            <style>{`
                @keyframes gentleFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default MemoryConstellation;