import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

const Section = ({
    children,
    className,
    id,
    fullWidth = false
}) => {
    return (
        <section
            id={id}
            className={cn(
                "relative w-full py-24 md:py-32", // Generous vertical spacing
                className
            )}
        >
            <div className={cn(
                "mx-auto px-6 md:px-12",
                fullWidth ? "w-full max-w-none" : "max-w-7xl"
            )}>
                {children}
            </div>
        </section>
    );
};

export default Section;
