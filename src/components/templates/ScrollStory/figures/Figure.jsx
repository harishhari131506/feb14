import { motion } from 'framer-motion';

export const Figure = ({ 
  x = 50, 
  y = 50, 
  scale = 1, 
  opacity = 1,
  rotate = 0,
  posture = 'slumped' // 'slumped', 'standing', 'straight'
}) => {
  const getPostureOffset = () => {
    switch (posture) {
      case 'slumped':
        return { shoulderY: 10, headY: 5 };
      case 'standing':
        return { shoulderY: 5, headY: 0 };
      case 'straight':
        return { shoulderY: 0, headY: -3 };
      default:
        return { shoulderY: 0, headY: 0 };
    }
  };

  const offset = getPostureOffset();
  const headYPos = 15 + (offset.headY || 0);
  const bodyY1 = 25 + (offset.headY || 0);
  const bodyY2 = 70 + (offset.shoulderY || 0);
  const armY1 = 45 + (offset.shoulderY || 0);
  const armY2 = 35 + (offset.shoulderY || 0);
  const legY2 = 70 + (offset.shoulderY || 0);

  return (
    <motion.svg
      width="60"
      height="120"
      viewBox="0 0 60 120"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        opacity
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.8 }}
    >
      {/* Head */}
      <circle
        cx="30"
        cy={headYPos}
        r="10"
        fill="rgba(255, 255, 255, 0.3)"
      />
      
      {/* Body */}
      <line
        x1="30"
        y1={bodyY1}
        x2="30"
        y2={bodyY2}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Arms */}
      <line
        x1="15"
        y1={armY1}
        x2="30"
        y2={armY2}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="45"
        y1={armY1}
        x2="30"
        y2={armY2}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Legs */}
      <line
        x1="20"
        y1="110"
        x2="30"
        y2={legY2}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="110"
        x2="30"
        y2={legY2}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};
