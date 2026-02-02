import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyles = "relative px-8 py-3 rounded-full font-inter font-medium text-base transition-all duration-300 overflow-hidden";

    const variants = {
        primary: "bg-muted-red text-white hover:bg-rose-gold hover:text-soft-black shadow-md hover:shadow-lg shadow-muted-red/20",
        secondary: "bg-white text-muted-red border border-rose-gold/30 hover:bg-soft-rose/20",
        ghost: "bg-transparent text-gray-500 hover:text-muted-red hover:bg-soft-rose/10"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], className)}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

export default Button;
