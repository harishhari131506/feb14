import React, { useEffect, useRef } from 'react';

const BackgroundLayers = () => {
    const starsCanvasRef = useRef(null);
    const dustCanvasRef = useRef(null);
    const twinkleCanvasRef = useRef(null);

    // Draw Static Background Stars with varied colors
    useEffect(() => {
        const canvas = starsCanvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawStars();
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const count = window.innerWidth < 768 ? 60 : 120;

            for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 2 + 0.5; // 0.5-2.5px
                const opacity = Math.random() * 0.4 + 0.2; // 0.2-0.6

                // Varied star colors
                const colors = [
                    `rgba(255, 255, 255, ${opacity})`,      // White
                    `rgba(232, 240, 255, ${opacity})`,      // Soft blue
                    `rgba(255, 245, 225, ${opacity})`       // Pale gold
                ];
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                // Add subtle glow to some stars
                if (Math.random() > 0.7) {
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        };

        window.addEventListener('resize', resize);
        resize();

        return () => window.removeEventListener('resize', resize);
    }, []);

    // Animate Stardust Particles with slower, more organic movement
    useEffect(() => {
        const canvas = dustCanvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let particles = [];

        const initParticles = () => {
            particles = [];
            const count = window.innerWidth < 768 ? 100 : 250;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    size: Math.random() * 1.2 + 0.3,
                    opacity: Math.random() * 0.15 + 0.05, // Very subtle
                    color: Math.random() > 0.7 ? '255, 240, 245' : '232, 240, 255'
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Twinkling Stars Animation (subset of background stars)
    useEffect(() => {
        const canvas = twinkleCanvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let twinklers = [];

        const initTwinklers = () => {
            twinklers = [];
            const count = window.innerWidth < 768 ? 8 : 15;

            for (let i = 0; i < count; i++) {
                twinklers.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    baseOpacity: Math.random() * 0.3 + 0.3,
                    targetOpacity: Math.random() * 0.7 + 0.3,
                    currentOpacity: 0.3,
                    speed: Math.random() * 0.01 + 0.005,
                    direction: 1,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            twinklers.forEach(t => {
                // Oscillate opacity
                t.currentOpacity += t.speed * t.direction;

                if (t.currentOpacity >= t.targetOpacity) {
                    t.direction = -1;
                } else if (t.currentOpacity <= t.baseOpacity) {
                    t.direction = 1;
                }

                ctx.beginPath();
                ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${t.currentOpacity})`;
                ctx.shadowBlur = 3;
                ctx.shadowColor = `rgba(255, 255, 255, ${t.currentOpacity})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationFrame = requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initTwinklers();
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* Layer 1: Deep Space Gradient with radial overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050B1F] via-[#1A1347] to-[#2D1B4E]">
                {/* Central depth radial gradient */}
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(88, 66, 124, 0.3) 0%, transparent 70%)'
                    }}
                />
            </div>

            {/* Layer 2: Atmospheric Nebula Glows (Multiple) */}
            <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-purple-600/8 blur-[120px] rounded-full" />
            <div className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-indigo-600/12 blur-[100px] rounded-full" />
            <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-violet-500/6 blur-[80px] rounded-full" />

            {/* Layer 3: Milky Way Diagonal Band */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23C8B8E8'/%3E%3C/svg%3E")`,
                    transform: 'rotate(25deg) scale(1.8)',
                    transformOrigin: 'center',
                    filter: 'blur(60px)',
                    width: '150%',
                    height: '150%',
                    left: '-25%',
                    top: '-25%'
                }}
            />

            {/* Layer 4: Distant Static Stars (Canvas) */}
            <canvas
                ref={starsCanvasRef}
                className="absolute inset-0 w-full h-full opacity-50"
            />

            {/* Layer 4.5: Twinkling Stars Subset */}
            <canvas
                ref={twinkleCanvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Layer 5: Stardust Particles (Canvas) */}
            <canvas
                ref={dustCanvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Layer 6: Nebula Cloud Overlays (Very Subtle) */}
            <div
                className="absolute top-[15%] left-[20%] w-[700px] h-[500px] opacity-[0.08] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, #4B3A6B 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    transform: 'rotate(-15deg)'
                }}
            />
            <div
                className="absolute bottom-[25%] right-[10%] w-[600px] h-[400px] opacity-[0.06] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, #3D2F5B 0%, transparent 65%)',
                    filter: 'blur(90px)',
                    transform: 'rotate(20deg)'
                }}
            />
        </div>
    );
};

export default BackgroundLayers;
// import React, { useEffect, useRef } from 'react';

// const BackgroundLayers = () => {
//     const starsCanvasRef = useRef(null);
//     const dustCanvasRef = useRef(null);

//     // Draw Static Background Stars
//     useEffect(() => {
//         const canvas = starsCanvasRef.current;
//         const ctx = canvas.getContext('2d');

//         const resize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             drawStars();
//         };

//         const drawStars = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             const count = window.innerWidth < 768 ? 50 : 120; // Reduced on mobile

//             for (let i = 0; i < count; i++) {
//                 const x = Math.random() * canvas.width;
//                 const y = Math.random() * canvas.height;
//                 const radius = Math.random() * 1.5;
//                 const opacity = Math.random() * 0.5 + 0.1;

//                 ctx.beginPath();
//                 ctx.arc(x, y, radius, 0, Math.PI * 2);
//                 ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
//                 ctx.fill();
//             }
//         };

//         window.addEventListener('resize', resize);
//         resize();

//         return () => window.removeEventListener('resize', resize);
//     }, []);

//     // Animate Stardust
//     useEffect(() => {
//         const canvas = dustCanvasRef.current;
//         const ctx = canvas.getContext('2d');
//         let animationFrame;
//         let particles = [];

//         const initParticles = () => {
//             particles = [];
//             const count = window.innerWidth < 768 ? 80 : 250; // Responsive count
//             for (let i = 0; i < count; i++) {
//                 particles.push({
//                     x: Math.random() * canvas.width,
//                     y: Math.random() * canvas.height,
//                     vx: (Math.random() - 0.5) * 0.2, // Very slow drift
//                     vy: (Math.random() - 0.5) * 0.2,
//                     size: Math.random() * 1.2,
//                     color: Math.random() > 0.8 ? '255, 240, 245' : '232, 240, 255' // Pale pink or blue
//                 });
//             }
//         };

//         const render = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particles.forEach(p => {
//                 p.x += p.vx;
//                 p.y += p.vy;

//                 // Wrap around
//                 if (p.x < 0) p.x = canvas.width;
//                 if (p.x > canvas.width) p.x = 0;
//                 if (p.y < 0) p.y = canvas.height;
//                 if (p.y > canvas.height) p.y = 0;

//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                 ctx.fillStyle = `rgba(${p.color}, 0.2)`; // Low opacity
//                 ctx.fill();
//             });

//             animationFrame = requestAnimationFrame(render);
//         };

//         const resize = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             initParticles();
//         };

//         window.addEventListener('resize', resize);
//         resize();
//         render();

//         return () => {
//             window.removeEventListener('resize', resize);
//             cancelAnimationFrame(animationFrame);
//         };
//     }, []);

//     return (
//         <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
//             {/* Layer 1: Deep Space Gradient (CSS) */}
//             <div className="absolute inset-0 bg-gradient-to-b from-[#050B1F] via-[#1A1347] to-[#2D1B4E]" />

//             {/* Layer 2: Atmospheric Glow (Nebulae) */}
//             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
//             <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen" />

//             {/* Layer 3: Milky Way Texture */}
//             <div
//                 className="absolute inset-0 opacity-5"
//                 style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//                     transform: 'rotate(25deg) scale(1.5)',
//                 }}
//             />

//             {/* Layer 4: Distant Stars (Canvas) */}
//             <canvas ref={starsCanvasRef} className="absolute inset-0 w-full h-full opacity-60" />

//             {/* Layer 5: Stardust Particles (Canvas) */}
//             <canvas ref={dustCanvasRef} className="absolute inset-0 w-full h-full" />
//         </div>
//     );
// };

// export default BackgroundLayers;
