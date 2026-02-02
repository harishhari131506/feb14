import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const ParticleSystem = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const count = 30; // Reduced count for minimalism
        const colors = ['#FFE5E5', '#FFB6C1', '#F5EBE0', '#FFF']; // Soft Rose, Blush Pink, Warm Beige, White
        const particles = [];

        // Create particles
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const size = Math.random() * 10 + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            el.innerHTML = `
                <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" style="opacity: ${Math.random() * 0.5 + 0.1}">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            `;
            el.style.position = 'absolute';
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `${Math.random() * 100}%`;
            el.style.pointerEvents = 'none';
            // Store original position for parallax
            el.dataset.x = Math.random() * 100;
            el.dataset.y = Math.random() * 100;
            el.dataset.speed = Math.random() * 0.5 + 0.1;

            containerRef.current.appendChild(el);
            particles.push(el);

            // Floating movement
            gsap.to(el, {
                y: `+=${Math.random() * 100 - 50}`,
                x: `+=${Math.random() * 100 - 50}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Mouse interaction
        const handleMouseMove = (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            particles.forEach(p => {
                const speed = parseFloat(p.dataset.speed);
                const xOffset = (mouseX - 0.5) * 100 * speed;
                const yOffset = (mouseY - 0.5) * 100 * speed;

                gsap.to(p, {
                    x: xOffset,
                    y: yOffset,
                    duration: 0.5,
                    overwrite: 'auto' // careful not to kill the floating anim completely, but this might conflict. 
                    // Actually, for parallax using GSAP along with floating yoyo is tricky.
                    // Better to animate a wrapper or use simple style transform for parallax 
                    // while GSAP handles the local float.
                    // Let's simplify: simple float is enough for now.
                });
            });
        };

        // window.addEventListener('mousemove', handleMouseMove);

        return () => {
            //window.removeEventListener('mousemove', handleMouseMove);
            // clean up particles
            if (containerRef.current) containerRef.current.innerHTML = '';
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />;
};

export default ParticleSystem;
