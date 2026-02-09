import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Scene2 = ({ scrollProgress }) => {
    const figure1Ref = useRef(null)
    const figure2Ref = useRef(null)
    const text1Ref = useRef(null)
    const text2Ref = useRef(null)
    const text3Ref = useRef(null)
    const lightRef = useRef(null)

    useEffect(() => {
        if (!figure1Ref.current || !figure2Ref.current) return

        // Map scroll 8-18% to local progress 0-1
        const localProgress = Math.min(Math.max((scrollProgress - 0.08) / 0.10, 0), 1)

        // First figure's head turns right
        gsap.to(figure1Ref.current, {
            rotate: localProgress * 15,
            duration: 0.1,
            ease: 'none'
        })

        // Second figure materializes at edge
        gsap.to(figure2Ref.current, {
            opacity: Math.min(localProgress * 1.5, 1),
            scale: 0.8 + localProgress * 0.2,
            duration: 0.1,
            ease: 'none'
        })

        // Light grows from right
        gsap.to(lightRef.current, {
            opacity: localProgress * 0.4,
            scale: 1 + localProgress * 0.5,
            duration: 0.1,
            ease: 'none'
        })

        // Text is visible immediately with subtle fade-in
        const baseOpacity = 0.8 + localProgress * 0.2

        gsap.to(text1Ref.current, {
            opacity: baseOpacity,
            y: -localProgress * 3,
            duration: 0.1,
            ease: 'none'
        })

        gsap.to(text2Ref.current, {
            opacity: baseOpacity,
            y: -localProgress * 3,
            duration: 0.1,
            ease: 'none'
        })

        gsap.to(text3Ref.current, {
            opacity: baseOpacity,
            y: -localProgress * 3,
            duration: 0.1,
            ease: 'none'
        })
    }, [scrollProgress])

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Background - Grey space warming */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a4a54] via-[#2a4550] to-[#3a4a44]" />

            {/* Light seeping from right */}
            <div
                ref={lightRef}
                className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-400/20 to-transparent opacity-0"
                style={{ willChange: 'transform, opacity' }}
            />

            {/* First figure - head turning */}
            <div
                ref={figure1Ref}
                className="absolute left-[25vw] top-1/2 -translate-y-1/2 origin-center"
                style={{ willChange: 'transform' }}
            >
                <svg
                    width="80"
                    height="120"
                    viewBox="0 0 80 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                >
                    {/* Figure with turning head */}
                    <ellipse cx="45" cy="20" rx="12" ry="15" fill="#1a2a34" opacity="0.9" />
                    <path
                        d="M 40 35 Q 35 50 35 70 L 30 100 L 25 115 M 40 35 Q 45 50 45 70 L 50 100 L 55 115 M 35 70 Q 30 75 20 75 M 45 70 Q 50 75 60 75"
                        stroke="#1a2a34"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.9"
                    />
                </svg>
            </div>

            {/* Second figure - appearing at edge */}
            <div
                ref={figure2Ref}
                className="absolute right-[15vw] top-1/2 -translate-y-1/2 opacity-0"
                style={{ willChange: 'transform, opacity' }}
            >
                <svg
                    width="60"
                    height="100"
                    viewBox="0 0 60 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                >
                    {/* Standing figure silhouette */}
                    <ellipse cx="30" cy="15" rx="10" ry="12" fill="#2a3a44" opacity="0.95" />
                    <path
                        d="M 30 27 L 30 55 M 30 55 L 25 85 L 20 95 M 30 55 L 35 85 L 40 95 M 30 35 L 20 50 M 30 35 L 40 50"
                        stroke="#2a3a44"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.95"
                    />
                    {/* Subtle glow */}
                    <circle cx="30" cy="15" r="20" fill="url(#glow)" opacity="0.3" />
                    <defs>
                        <radialGradient id="glow">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Text - left side - VISIBLE IMMEDIATELY */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 max-w-[85%] md:max-w-sm space-y-3">
                <p
                    ref={text1Ref}
                    className="text-white/90 text-sm md:text-base font-light tracking-wide opacity-80"
                    style={{ willChange: 'transform, opacity' }}
                >
                    And then—
                </p>
                <p
                    ref={text2Ref}
                    className="text-white/90 text-sm md:text-base font-light tracking-wide opacity-80"
                    style={{ willChange: 'transform, opacity' }}
                >
                    you hear their key
                </p>
                <p
                    ref={text3Ref}
                    className="text-white/90 text-sm md:text-base font-light tracking-wide opacity-80"
                    style={{ willChange: 'transform, opacity' }}
                >
                    in the door.
                </p>
            </div>
        </div>
    )
}

export default Scene2
