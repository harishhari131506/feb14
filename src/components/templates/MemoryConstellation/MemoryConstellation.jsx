import React, { useState, useRef, useEffect, useCallback } from 'react';
import BackgroundLayers from './BackgroundLayers';
import ShootingStars from './ShootingStars';
import Star from './Star';
import ConstellationLines from './ConstellationLines';
import MemoryCard from './MemoryCard';
import EndingScreen from './EndingScreen';
import { ArrowLeft } from 'lucide-react';
// import { Link }         from 'react-router-dom';   // uncomment if using react-router

// ─────────────────────────────────────────────────────────────
//  MEMORY DATA   (replace with real content)
//  Each memory has a `phase` hint that the orchestrator uses:
//    'normal'   – standard reveal
//    'distance' – the paired-star "same sky, different places" beat
//    'climax'   – the heavy, longer, no-interaction memory
// ─────────────────────────────────────────────────────────────
const memories = [
    {
        id: 1, x: 18, y: 55, size: 'small',
        date: 'Oct 14, 2023',
        title: 'The First Hello',
        description: 'That night you laughed\nwithout knowing why.',
        phase: 'normal',
    },
    {
        id: 2, x: 30, y: 28, size: 'medium',
        date: 'Nov 02, 2023',
        title: 'Coffee Date',
        description: 'We didn\'t say much.\nBut neither of us wanted to go inside.',
        phase: 'normal',
    },
    {
        id: 3, x: 48, y: 68, size: 'small',
        date: 'Dec 24, 2023',
        title: 'Christmas Eve',
        description: 'The world was loud\nand we were the only quiet thing in it.',
        phase: 'normal',
    },
    // ── DISTANCE beat (paired stars) ──
    {
        id: 4, x: 22, y: 40, size: 'medium',
        date: 'Feb 03, 2024',
        title: 'Apart',
        description: 'You looked up from there.',
        phase: 'distance-a',   // first of the pair
    },
    {
        id: 5, x: 75, y: 35, size: 'medium',
        date: 'Feb 03, 2024',
        title: 'Apart',
        description: 'I looked up from here.',
        phase: 'distance-b',   // second of the pair
    },
    // ── CLIMAX ──
    {
        id: 6, x: 55, y: 58, size: 'large',
        date: 'May 20, 2024',
        title: 'The Night That Changed Everything',
        description: 'Some nights don\'t pass.\nThey stay.\n\nWe knew it then.\nWe still know it now.',
        phase: 'climax',
    },
];

// ─────────────────────────────────────────────────────────────
//  JOURNEY PHASES  (high-level orchestration states)
//    idle          – screen just loaded, nothing has happened yet
//    entry         – the opening line is showing
//    firstStar     – waiting for user to click (or auto-advance)
//                    the first interactable star
//    reveal        – a memory is being shown
//    distanceIntro – the "Even when we weren't together…" line
//    distanceA     – first paired star shown
//    distanceB     – second paired star shown
//    climax        – the heavy climax memory (no interaction)
//    ending        – dawn / final text
// ─────────────────────────────────────────────────────────────

const MemoryConstellation = () => {
    // ── state ─────────────────────────────────────────────────
    const [journeyPhase, setJourneyPhase] = useState('idle');
    const [activeIndex, setActiveIndex] = useState(null);  // index into memories[]
    const [showDistanceIntro, setShowDistanceIntro] = useState(false);
    const [showEnding, setShowEnding] = useState(false);

    // Timers we need to clear on unmount
    const timersRef = useRef([]);
    const addTimer = (fn, ms) => {
        const id = setTimeout(fn, ms);
        timersRef.current.push(id);
        return id;
    };

    // ── cleanup ───────────────────────────────────────────────
    useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

    // ── PHASE 1: ENTRY  (idle → entry) ────────────────────────
    // After 4.5 s the opening line fades in; after another 3.5 s
    // the first star becomes interactable.
    useEffect(() => {
        addTimer(() => setJourneyPhase('entry'), 4500);
        addTimer(() => setJourneyPhase('firstStar'), 8200);
    }, []);  // mount only

    // ── PHASE MACHINE: what happens when journeyPhase changes ─
    useEffect(() => {
        if (journeyPhase === 'firstStar') {
            // Auto-advance to first memory after 6 s of showing the star
            // (the star brightens on its own — "the sky decides")
            addTimer(() => advanceTo(0), 6000);
        }
    }, [journeyPhase]);

    // ── advanceTo: move to the next memory in sequence ────────
    const advanceTo = useCallback((idx) => {
        if (idx >= memories.length) {
            // journey is over → trigger ending
            setActiveIndex(null);
            setShowEnding(true);
            setJourneyPhase('ending');
            return;
        }

        const mem = memories[idx];

        if (mem.phase === 'distance-a') {
            // Show the "Even when…" interstitial first
            setActiveIndex(null);
            setShowDistanceIntro(true);
            setJourneyPhase('distanceIntro');

            // After the intro has breathed (5 s), show distance-a
            addTimer(() => {
                setShowDistanceIntro(false);
                setActiveIndex(idx);
                setJourneyPhase('distanceA');
            }, 5200);
            return;
        }

        setActiveIndex(idx);
        setJourneyPhase(mem.phase === 'climax' ? 'climax' : 'reveal');
    }, []);

    // ── handleMemoryDismiss: user tapped "let it pass" ────────
    const handleMemoryDismiss = useCallback(() => {
        if (activeIndex === null) return;
        const nextIdx = activeIndex + 1;

        // If we just finished distance-a, auto-show distance-b after a beat
        if (memories[activeIndex].phase === 'distance-a') {
            setActiveIndex(null);
            addTimer(() => advanceTo(nextIdx), 1800);
            return;
        }

        setActiveIndex(null);
        // Small pause before next star brightens (sky decides)
        addTimer(() => advanceTo(nextIdx), 2200);
    }, [activeIndex, advanceTo]);

    // ── climax auto-advance (no "let it pass" during climax) ──
    useEffect(() => {
        if (journeyPhase === 'climax' && activeIndex !== null) {
            // Climax memory stays up for 12 s, then advances on its own
            addTimer(() => {
                setActiveIndex(null);
                // pause before ending
                addTimer(() => {
                    setShowEnding(true);
                    setJourneyPhase('ending');
                }, 3000);
            }, 12000);
        }
    }, [journeyPhase, activeIndex]);

    // ── restart ───────────────────────────────────────────────
    const handleRestart = () => {
        setShowEnding(false);
        setActiveIndex(null);
        setShowDistanceIntro(false);
        setJourneyPhase('idle');
        // Re-kick the entry sequence
        addTimer(() => setJourneyPhase('entry'), 4500);
        addTimer(() => setJourneyPhase('firstStar'), 8200);
    };

    // ── derive sky phase for BackgroundLayers ─────────────────
    let skyPhase = 'night';
    if (journeyPhase === 'distanceIntro' || journeyPhase === 'distanceA' || journeyPhase === 'distanceB') skyPhase = 'distance';
    if (journeyPhase === 'climax') skyPhase = 'climax';
    if (journeyPhase === 'ending') skyPhase = 'dawn';

    // ── which star is interactable right now? ─────────────────
    // Only the *next* star in sequence when no memory is showing.
    let interactableIdx = null;
    if (journeyPhase === 'firstStar' && activeIndex === null) interactableIdx = 0;
    // After a memory is dismissed, briefly nothing is interactable
    // (the parent handles auto-advance via timer).

    // ── render helpers ────────────────────────────────────────
    const activeMemory = activeIndex !== null ? memories[activeIndex] : null;
    const isClimax = activeMemory?.phase === 'climax';

    return (
        <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Georgia', serif" }}>
            {/* ── background ── */}
            <BackgroundLayers skyPhase={skyPhase} />

            {/* ── shooting stars (disabled during climax / ending) ── */}
            <ShootingStars disabled={journeyPhase === 'climax' || journeyPhase === 'ending'} />

            {/* ── grain texture layer ── */}
            <ConstellationLines />

            {/* ── back nav (always present, quiet) ── */}
            {/* <Link to="/templates" … > */}
            <button
                className="absolute top-5 left-5 text-white/25 hover:text-white/55 transition-colors p-2"
                style={{ zIndex: 50, background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <ArrowLeft size={18} />
            </button>

            {/* ── ENTRY LINE ── "This is the same sky we once stood under." ── */}
            {(journeyPhase === 'entry' || journeyPhase === 'firstStar') && !showEnding && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ zIndex: 22 }}
                >
                    <p
                        className="text-white/50 text-center"
                        style={{
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
                            letterSpacing: '0.08em',
                            animation: 'gentleFadeIn 2.5s ease forwards',
                        }}
                    >
                        This is the same sky we once stood under.
                    </p>
                </div>
            )}

            {/* ── DISTANCE INTRO LINE ── */}
            {showDistanceIntro && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ zIndex: 22 }}
                >
                    <p
                        className="text-white/45 text-center max-w-sm px-6"
                        style={{
                            fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
                            letterSpacing: '0.06em',
                            lineHeight: 1.9,
                            animation: 'gentleFadeIn 2.2s ease forwards',
                        }}
                    >
                        Even when we weren't together,<br />this sky was.
                    </p>
                </div>
            )}

            {/* ── STARS ── */}
            <div className="absolute inset-0" style={{ zIndex: 20 }}>
                {memories.map((mem, i) => {
                    const isActive = activeIndex === i;
                    const isInteractable = interactableIdx === i;
                    // Dim rule: if any memory is active, everything else dims.
                    // During distance intro, all dim.
                    const isDimmed =
                        showDistanceIntro ||
                        (activeIndex !== null && activeIndex !== i) ||
                        showEnding;

                    return (
                        <Star
                            key={mem.id}
                            x={mem.x}
                            y={mem.y}
                            size={mem.size}
                            active={isActive}
                            dimmed={isDimmed && !isActive}
                            interactable={isInteractable}
                            delay={i * 0.25}
                            onClick={() => {
                                if (isInteractable) advanceTo(i);
                            }}
                        />
                    );
                })}
            </div>

            {/* ── MEMORY TEXT (painted into sky) ── */}
            {activeMemory && (
                <MemoryCard
                    memory={activeMemory}
                    onClose={handleMemoryDismiss}
                    phase={isClimax ? 'climax' : 'normal'}
                />
            )}

            {/* ── ENDING ── */}
            <EndingScreen show={showEnding} onRestart={handleRestart} />

            {/* ── shared keyframes ── */}
            <style>{`
        @keyframes gentleFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.15; transform: translate(-50%,-50%) scale(1);   }
          50%      { opacity: 0.35; transform: translate(-50%,-50%) scale(1.3);  }
        }
      `}</style>
        </div>
    );
};

export default MemoryConstellation;