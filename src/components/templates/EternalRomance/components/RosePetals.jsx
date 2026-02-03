import { useEffect, useState } from "react";


const RosePetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Reduced from 25 to 10 for better performance
    const newPetals = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 6}s`,
      size: 18 + Math.random() * 18,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 40,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: petal.left,
            top: "-50px",
            width: petal.size,
            height: petal.size * 0.8,
            background: `linear-gradient(135deg, hsl(350 70% 65% / 0.9) 0%, hsl(350 80% 50% / 0.8) 50%, hsl(350 75% 55% / 0.7) 100%)`,
            borderRadius: "50% 0 50% 50%",
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `translate3d(0, 0, 0) rotate(${petal.rotation}deg)`,
            willChange: "transform, opacity",
            opacity: 0.75,
            // Simplified shadows for performance
            boxShadow: "0 2px 4px rgba(350 60% 40% / 0.2)",
            // Removed blur filter for performance
            ["--sway-amount"]: `${petal.swayAmount}px`,
          }}
        />
      ))}
    </div>
  );
};

export default RosePetals;
