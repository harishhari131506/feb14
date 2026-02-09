import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import * as THREE from 'three'
import './help.css'

// UNIFIED FOG PLANE - matching Scene1
function UnifiedFogPlane() {
    return (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial
                transparent
                depthWrite={false}
                color="#0f1f28"
                opacity={0.35}
            />
        </mesh>
    )
}

// SIMPLE FALLING SNOW PARTICLES - matching Scene1
function Particles() {
    const particlesRef = useRef()
    const count = 2000

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30
            pos[i * 3 + 1] = Math.random() * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15
        }
        return pos
    }, [])

    useFrame(() => {
        if (!particlesRef.current) return

        const posArray = particlesRef.current.geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
            // Simple falling motion
            posArray[i * 3 + 1] -= 0.01

            // Reset to top when reaching bottom
            if (posArray[i * 3 + 1] < 0) {
                posArray[i * 3 + 1] = 20
                posArray[i * 3] = (Math.random() - 0.5) * 30
                posArray[i * 3 + 2] = (Math.random() - 0.5) * 15
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation={true}
            />
        </points>
    )
}

// VOLUMETRIC BEAM - matching Scene1's ghost-like shaft of light
function VolumetricBeam() {
    const beamRef = useRef()

    useFrame(({ clock }) => {
        if (beamRef.current) {
            beamRef.current.material.uniforms.time.value = clock.getElapsedTime()
        }
    })

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('#CDE6F5') },
                maxOpacity: { value: 0.15 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vViewPosition = -mvPosition.xyz;
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color;
                uniform float maxOpacity;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vViewPosition;
                
                // Simple 2D noise function
                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
                }
                
                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    f = f * f * (3.0 - 2.0 * f);
                    
                    float a = hash(i);
                    float b = hash(i + vec2(1.0, 0.0));
                    float c = hash(i + vec2(0.0, 1.0));
                    float d = hash(i + vec2(1.0, 1.0));
                    
                    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
                }
                
                // Fractal Brownian Motion for smokey effect
                float fbm(vec2 p) {
                    float value = 0.0;
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    
                    for(int i = 0; i < 4; i++) {
                        value += amplitude * noise(p * frequency);
                        frequency *= 2.0;
                        amplitude *= 0.5;
                    }
                    
                    return value;
                }
                
                void main() {
                    // Fresnel effect - softer edges
                    vec3 viewDir = normalize(vViewPosition);
                    float fresnel = abs(dot(viewDir, vNormal));
                    fresnel = pow(1.0 - fresnel, 2.0);
                    
                    // Vertical fade - 0% at bottom, 100% at top
                    float verticalFade = smoothstep(0.0, 0.3, vUv.y);
                    
                    // Noise/smoke effect - animated
                    vec2 noiseCoord = vUv * 3.0 + vec2(0.0, time * 0.05);
                    float noiseValue = fbm(noiseCoord);
                    noiseValue = smoothstep(0.3, 0.7, noiseValue);
                    
                    // Combine all effects
                    float finalOpacity = fresnel * verticalFade * noiseValue * maxOpacity;
                    
                    gl_FragColor = vec4(color, finalOpacity);
                }
            `
        })
    }, [])

    return (
        <mesh ref={beamRef} position={[0, 10, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[5, 8, 20, 32, 1, true]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    )
}

// THREE.JS SCENE - matching Scene1 exactly
function ThreeJSScene() {
    return (
        <>
            {/* Narrower FOV, pulled back for more void feel */}
            <PerspectiveCamera makeDefault fov={28} position={[0, 2.5, 12]} />

            {/* Infinite void fog - matches floor color */}
            <fogExp2 attach="fog" args={['#0b1015', 0.06]} />

            {/* Minimal ambient only */}
            <ambientLight intensity={0.5} />

            {/* Spotlight from above for focused illumination */}
            <spotLight
                position={[0, 12, 0]}
                angle={0.65}
                penumbra={1}
                intensity={0.7}
                color="#dce7ee"
            />

            {/* Volumetric light beam with custom shader */}
            <VolumetricBeam />

            {/* Single unified fog plane */}
            <UnifiedFogPlane />

            {/* Ground plane - seamless void integration */}
            <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial
                    color="#0b1015"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Enhanced particles */}
            <Particles />

            {/* Cinematic Post-Processing */}
            <EffectComposer>
                {/* Bloom - soft glow on brightest elements */}
                <Bloom
                    luminanceThreshold={0.6}
                    intensity={1.2}
                    mipmapBlur={true}
                />

                {/* Vignette - darkened corners */}
                <Vignette darkness={0.6} offset={0.3} />
            </EffectComposer>
        </>
    )
}

const Scene2 = ({ scrollProgress }) => {
    const textRef = useRef(null)

    useEffect(() => {
        if (!textRef.current) return

        // Animate text on page load immediately
        const lines = textRef.current.querySelectorAll('.text-line')

        // Fade in each line with stagger
        lines.forEach((line, i) => {
            gsap.fromTo(line,
                {
                    opacity: 0,
                    y: 20,
                    x: -10
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1.2,
                    delay: i * 0.3,
                    ease: 'power2.out'
                }
            )
        })
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Updated background gradient - matching Scene1's cooler blue-gray tones */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#182a34] via-[#0d1920] to-[#04090e]" />

            {/* Three.js Canvas - matching Scene1's configuration */}
            <Canvas
                className="absolute inset-0"
                style={{ zIndex: 1 }}
                scene={{ background: new THREE.Color('#0b1015') }}
                gl={{
                    alpha: true,
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.55,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
                <ThreeJSScene />
            </Canvas>

            {/* Updated radial overlay - matching Scene1 exactly */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            circle at 50% 16%,
                            rgba(190,210,220,0.3) 0%,
                            rgba(150,175,190,0.22) 15%,
                            rgba(110,140,160,0.22) 30%,
                            rgba(60,90,110,0.25) 45%,
                            rgba(35,55,70,0.40) 60%,
                            rgba(15,25,35,0.90) 75%,
                            rgba(10,18,28,1.0) 90%
                        )
                    `,
                    zIndex: 2
                }}
            />

            {/* Contact shadow for main figure */}
            <div
                className="absolute left-[35%] top-[72%] -translate-x-1/2"
                style={{
                    width: '200px',
                    height: '50px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.50), transparent 70%)',
                    filter: 'blur(25px)',
                    opacity: 0.8,
                    zIndex: 2
                }}
            />

            {/* Contact shadow for distant figure */}
            <div
                className="absolute left-[82%] top-[74%] -translate-x-1/2"
                style={{
                    width: '150px',
                    height: '40px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.40), transparent 70%)',
                    filter: 'blur(20px)',
                    opacity: 0.7,
                    zIndex: 2
                }}
            />

            {/* Main figure - tired2_1 */}
            <div
                className="absolute left-[35%] top-[65%] -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 3 }}
            >
                <img
                    src="/templates/scrollstory/tired2_1.png"
                    alt="Main figure"
                    className="h-auto opacity-70"
                    style={{
                        filter: 'contrast(0.95) brightness(0.85)',
                        width: 'clamp(180px, 18vw, 280px)'
                    }}
                />
            </div>

            {/* Distant figure - tired2_2 with warm glow */}
            <div
                className="absolute left-[82%] top-[65%] -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: 3 }}
            >
                <img
                    src="/templates/scrollstory/tired2_2.png"
                    alt="Distant figure"
                    className="h-auto"
                    style={{
                        filter: 'brightness(0.8) saturate(1.5) contrast(1.2) drop-shadow(0 0 60px rgba(255, 200, 100, 1.0)) drop-shadow(0 0 120px rgba(255, 170, 68, 1.0)) drop-shadow(0 0 200px rgba(255, 140, 40, 0.9)) drop-shadow(0 0 350px rgba(255, 120, 20, 0.7)) drop-shadow(0 0 500px rgba(255, 100, 0, 0.5))',
                        width: 'clamp(120px, 12vw, 200px)'
                    }}
                />
            </div>

            {/* Text - matching Scene1's style */}
            <div
                ref={textRef}
                className="absolute bottom-[12%] left-[8%] max-w-[85%] md:max-w-md"
                style={{ willChange: 'transform, opacity', zIndex: 4 }}
            >
                <p className="text-white text-base md:text-lg leading-relaxed font-light tracking-wide">
                    <span className="text-line block opacity-0">And then—</span>
                    <span className="text-line block opacity-0">you hear their key</span>
                    <span className="text-line block opacity-0">in the door.</span>
                </p>
            </div>

            {/* Vignette - matching Scene1 */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.40) 70%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 5
                }}
            />
        </div>
    )
}

export default Scene2