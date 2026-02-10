import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Scene3 = ({ scrollProgress }) => {
    const figure1Ref = useRef(null)
    const figure2Ref = useRef(null)
    const bgRef = useRef(null)
    const textRef = useRef(null)
    const youRef = useRef(null)

    useEffect(() => {
        if (!figure1Ref.current || !figure2Ref.current) return

        // Map scroll 18-30% to local progress 0-1
        const localProgress = Math.min(Math.max((scrollProgress - 0.18) / 0.12, 0), 1)

        // First figure straightens posture (shoulders lift)
        gsap.to(figure1Ref.current, {
            y: -localProgress * 15,
            scaleY: 1 + localProgress * 0.1,
            duration: 0.1,
            ease: 'none'
        })

        // Second figure walks inward from right
        gsap.to(figure2Ref.current, {
            x: -localProgress * 25 + 'vw',
            duration: 0.1,
            ease: 'none'
        })

        // Colors saturate (grey → amber → gold)
        if (bgRef.current) {
            bgRef.current.style.filter = `hue-rotate(${localProgress * 60}deg) saturate(${1 + localProgress * 1.5}) brightness(${1 + localProgress * 0.5})`
        }

        // Text is visible immediately with subtle fade-in
        gsap.to(textRef.current, {
            opacity: Math.min(0.8 + localProgress * 0.2, 1),
            y: -localProgress * 5,
            duration: 0.1,
            ease: 'none'
        })

        // "YOU" pulses continuously
        if (youRef.current) {
            const pulseIntensity = Math.sin(localProgress * Math.PI * 6) * 0.08
            gsap.to(youRef.current, {
                scale: 1 + pulseIntensity,
                duration: 0.1,
                ease: 'none'
            })
        }
    }, [scrollProgress])

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Background - Warming gold atmosphere - REMOVED for global bg */}
            {/* <div
                ref={bgRef}
                className="absolute inset-0 bg-gradient-to-br from-[#4a5a54] via-[#5a5a44] to-[#6a5a34] transition-all duration-300"
                style={{ willChange: 'filter' }}
            /> */}

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-transparent to-transparent" />

            {/* First figure - standing straighter */}
            <div
                ref={figure1Ref}
                className="absolute left-[30vw] top-1/2 -translate-y-1/2"
                style={{ willChange: 'transform' }}
            >
                <svg
                    width="80"
                    height="130"
                    viewBox="0 0 80 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                >
                    {/* Upright figure */}
                    <ellipse cx="40" cy="18" rx="12" ry="15" fill="#1a2a34" opacity="0.95" />
                    <path
                        d="M 40 33 L 40 65 M 40 65 L 35 100 L 30 120 M 40 65 L 45 100 L 50 120 M 40 40 L 25 55 M 40 40 L 55 55"
                        stroke="#1a2a34"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.95"
                    />
                </svg>
            </div>

            {/* Light between figures */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <div className="absolute inset-0 bg-gradient-radial from-amber-300/40 to-transparent blur-2xl" />
            </div>

            {/* Second figure - entering */}
            <div
                ref={figure2Ref}
                className="absolute right-[15vw] top-1/2 -translate-y-1/2"
                style={{ willChange: 'transform' }}
            >
                <svg
                    width="80"
                    height="130"
                    viewBox="0 0 80 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                >
                    {/* Walking figure */}
                    <ellipse cx="40" cy="18" rx="12" ry="15" fill="#2a3a44" opacity="0.95" />
                    <path
                        d="M 40 33 L 40 65 M 40 65 L 32 100 L 28 120 M 40 65 L 48 100 L 52 120 M 40 40 L 28 50 M 40 40 L 52 58"
                        stroke="#2a3a44"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.95"
                    />
                    {/* Warm glow */}
                    <circle cx="40" cy="18" r="25" fill="url(#warmGlow)" opacity="0.4" />
                    <defs>
                        <radialGradient id="warmGlow">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Text - center bottom - VISIBLE IMMEDIATELY */}
            <div
                ref={textRef}
                className="absolute bottom-[15%] left-1/2 -translate-x-1/2 text-center max-w-[90%] md:max-w-xl opacity-80"
                style={{ willChange: 'transform, opacity' }}
            >
                <p className="text-white/95 text-base md:text-lg leading-relaxed font-light tracking-wide">
                    The room doesn't change.
                </p>
                <p className="text-amber-100 text-lg md:text-xl font-normal tracking-wide mt-2">
                    <span ref={youRef} className="inline-block font-semibold text-amber-200" style={{ willChange: 'transform' }}>
                        YOU
                    </span>{' '}
                    change.
                </p>
            </div>
        </div>
    )
}

export default Scene3
