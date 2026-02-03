import { Sparkles as SparkleIcon } from "lucide-react";

const Sparkles = () => {
  // Reduced from 30 to 12 for better performance
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    size: 8 + Math.random() * 12,
    opacity: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <SparkleIcon
          key={sparkle.id}
          className="absolute text-accent"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            opacity: sparkle.opacity,
            transform: "translate3d(0, 0, 0)",
            willChange: "opacity, transform",
            animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: sparkle.delay,
            // Removed expensive filters for performance
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
