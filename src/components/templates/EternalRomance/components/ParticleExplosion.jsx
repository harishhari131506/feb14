import { useEffect, useState } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

const ParticleExplosion = ({ trigger, originX, originY, onComplete }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!trigger) {
            setParticles([]);
            return;
        }

        // Use provided origin or default to center
        const centerX = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
        const centerY = originY ?? (typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
        const particleCount = 30; // Further reduced for better performance

        const newParticles = [];

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = 100 + Math.random() * 200;
            const distance = speed * (1.5 + Math.random() * 0.5);
            const type = i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "star";
            const size = 20 + Math.random() * 25;
            const rotation = Math.random() * 360;
            const rotationEnd = rotation + (Math.random() - 0.5) * 720;
            const delay = Math.random() * 0.2;
            const duration = 1.5 + Math.random() * 0.5;

            const color = type === "heart"
                ? "hsl(350, 80%, 55%)"
                : type === "sparkle"
                    ? "hsl(38, 70%, 55%)"
                    : "hsl(45, 80%, 70%)";

            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance + 200; // Add gravity effect

            const key = `particle-${i}-${Date.now()}`;

            let icon;
            switch (type) {
                case "heart":
                    icon = <Heart className="w-full h-full" style={{ color, fill: color }} />;
                    break;
                case "sparkle":
                    icon = <Sparkles className="w-full h-full" style={{ color }} />;
                    break;
                case "star":
                    icon = <Star className="w-full h-full" style={{ color, fill: color }} />;
                    break;
                default:
                    icon = <Heart className="w-full h-full" style={{ color, fill: color }} />;
            }

            newParticles.push(
                <div
                    key={key}
                    className="absolute particle-explosion"
                    style={{
                        left: centerX,
                        top: centerY,
                        width: size,
                        height: size,
                        '--end-x': `${endX}px`,
                        '--end-y': `${endY}px`,
                        '--rotation-start': `${rotation}deg`,
                        '--rotation-end': `${rotationEnd}deg`,
                        '--delay': `${delay}s`,
                        '--duration': `${duration}s`,
                    }}
                >
                    {icon}
                </div>
            );
        }

        setParticles(newParticles);

        // Call onComplete after animation
        const timer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
            setParticles([]);
        }, 2500);

        return () => clearTimeout(timer);
    }, [trigger, onComplete]);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden">
            {particles}
        </div>
    );
};

export default ParticleExplosion;
