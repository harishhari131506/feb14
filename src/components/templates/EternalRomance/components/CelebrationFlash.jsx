import { useEffect, useState } from "react";



const CelebrationFlash = ({ trigger }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      // Flash should be quick and smooth
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [trigger]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 animate-celebration-flash"
      style={{
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 182, 193, 0.8) 30%, transparent 70%)",
      }}
    />
  );
};

export default CelebrationFlash;
