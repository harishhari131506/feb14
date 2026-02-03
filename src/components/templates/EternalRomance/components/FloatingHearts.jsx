import { Heart } from "lucide-react";

const FloatingHearts = () => {
  // Reduced from 20 to 8 for better performance
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${5 + Math.random() * 4}s`,
    size: 20 + Math.random() * 20,
    opacity: 0.3 + Math.random() * 0.4,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary fill-primary"
          style={{
            left: heart.left,
            top: `${15 + Math.random() * 70}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            transform: `translate3d(0, 0, 0) rotate(${heart.rotation}deg)`,
            willChange: "transform, opacity",
            animation: `realistic-float ${heart.duration} ease-in-out infinite`,
            animationDelay: heart.delay,
            // Removed expensive filters for performance
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
