import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useMagneticPhysics } from '../../hooks/usePhysics';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Button = ({ children, onClick, variant = 'primary', className = '', magnetic = false }) => {
    const buttonRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const { springs, handleMouseMove, handleMouseLeave } = useMagneticPhysics(
        magnetic ? 0.3 : 0,
        100
    );

    const baseStyles = "relative px-10 py-4 rounded-full font-medium text-base transition-all duration-500 overflow-hidden cursor-pointer";

    const variants = {
        primary: "bg-muted-red text-white hover:bg-rose-gold hover:text-soft-black shadow-md hover:shadow-lg shadow-muted-red/20",
        secondary: "bg-white text-rose-600 border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50/50 shadow-md hover:shadow-lg",
        ghost: "bg-transparent text-neutral-600 hover:text-rose-600 hover:bg-rose-50/30 border border-transparent hover:border-rose-100"
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={(e) => magnetic && handleMouseMove(e, buttonRef.current)}
            onMouseLeave={handleMouseLeave}
            style={{
                ...springs,
                fontFamily: "'Inter', -apple-system, sans-serif",
                letterSpacing: "0.02em"
            }}
            whileHover={!prefersReducedMotion ? {
                scale: 1.05,
                transition: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                }
            } : {}}
            whileTap={!prefersReducedMotion ? {
                scale: 0.97,
                transition: { duration: 0.1 }
            } : {}}
            className={cn(baseStyles, variants[variant], className)}
            onClick={onClick}
        >
            {/* Shimmer effect on hover */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            )}

            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    );
};

export default Button;
// import React from 'react';
// import { motion } from 'framer-motion';
// import { cn } from '../../utils/cn';

// const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
//     const baseStyles = "relative px-8 py-3 rounded-full font-inter font-medium text-base transition-all duration-300 overflow-hidden";

//     const variants = {
//         primary: "bg-muted-red text-white hover:bg-rose-gold hover:text-soft-black shadow-md hover:shadow-lg shadow-muted-red/20",
//         secondary: "bg-white text-muted-red border border-rose-gold/30 hover:bg-soft-rose/20",
//         ghost: "bg-transparent text-gray-500 hover:text-muted-red hover:bg-soft-rose/10"
//     };

//     return (
//         <motion.button
//             whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
//             whileTap={{ scale: 0.98 }}
//             className={cn(baseStyles, variants[variant], className)}
//             onClick={onClick}
//         >
//             {children}
//         </motion.button>
//     );
// };

// export default Button;
