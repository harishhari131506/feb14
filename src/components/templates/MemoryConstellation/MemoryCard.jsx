import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Calendar } from 'lucide-react';
import { cn } from '../../../utils/cn';

const MemoryCard = ({ memory, onClose }) => {
    const cardRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!memory) return;

        // Card entrance animation
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        gsap.fromTo(cardRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.1
            }
        );
    }, [memory]);

    const handleClose = () => {
        gsap.to(cardRef.current, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.4,
            ease: "power2.in",
            onComplete: onClose
        });

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
    };

    if (!memory) return null;

    // Emotion-based color accents
    const emotionColors = {
        Joy: 'from-amber-400/20 to-yellow-300/10',
        Love: 'from-rose-400/20 to-pink-300/10',
        Adventure: 'from-emerald-400/20 to-teal-300/10',
        Surprise: 'from-purple-400/20 to-violet-300/10',
        Peaceful: 'from-blue-400/20 to-cyan-300/10',
        Milestone: 'from-orange-400/20 to-amber-300/10'
    };

    const emotionBadgeColors = {
        Joy: 'bg-amber-400/30 text-amber-100',
        Love: 'bg-rose-400/30 text-rose-100',
        Adventure: 'bg-emerald-400/30 text-emerald-100',
        Surprise: 'bg-purple-400/30 text-purple-100',
        Peaceful: 'bg-blue-400/30 text-blue-100',
        Milestone: 'bg-orange-400/30 text-orange-100'
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 opacity-0"
                onClick={handleClose}
            />

            {/* Card container - centered */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
                <div
                    ref={cardRef}
                    className="relative w-full max-w-sm md:max-w-md pointer-events-auto opacity-0"
                >
                    {/* Main card with enhanced glassmorphism */}
                    <div className={cn(
                        "relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden",
                        "shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.2)_inset]"
                    )}>
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/10 text-white/90 hover:text-white transition-all duration-300 group"
                        >
                            <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Photo section */}
                        {memory.photo && (
                            <div className="relative h-48 md:h-64 w-full overflow-hidden">
                                <img
                                    src={memory.photo}
                                    alt={memory.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Gradient overlay for smooth transition to content */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-black/40 to-transparent",
                                    `bg-gradient-to-t ${emotionColors[memory.emotion] || 'from-black/60 to-transparent'}`
                                )} />
                            </div>
                        )}

                        {/* Content section */}
                        <div className="relative p-6 md:p-8">
                            {/* Subtle glow effect at top */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {/* Metadata row */}
                            <div className="flex items-center flex-wrap gap-2 mb-4">
                                {/* Emotion badge */}
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium backdrop-blur-sm",
                                    emotionBadgeColors[memory.emotion] || 'bg-white/20 text-white/90'
                                )}>
                                    {memory.emotion}
                                </span>

                                {/* Date */}
                                <div className="flex items-center text-white/60 text-xs font-light">
                                    <Calendar size={12} className="mr-1.5 opacity-70" />
                                    <span className="tracking-wide">{memory.date}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-playfair text-2xl md:text-3xl mb-4 leading-tight text-white/95 tracking-wide">
                                {memory.title}
                            </h3>

                            {/* Description */}
                            <p className="font-inter text-sm md:text-base text-white/75 font-light leading-relaxed tracking-wide">
                                {memory.description}
                            </p>

                            {/* Decorative element */}
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <div className="flex justify-center">
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Soft outer glow */}
                    <div
                        className="absolute inset-0 -z-10 opacity-30 blur-2xl"
                        style={{
                            background: 'radial-gradient(circle, rgba(200, 184, 232, 0.3) 0%, transparent 70%)'
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default MemoryCard;
// import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import { X, Calendar } from 'lucide-react';
// import { cn } from '../../../utils/cn';

// const MemoryCard = ({ memory, onClose }) => {
//     const cardRef = useRef(null);

//     useEffect(() => {
//         gsap.fromTo(cardRef.current,
//             { opacity: 0, y: 20, scale: 0.95 },
//             { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
//         );
//     }, [memory]);

//     if (!memory) return null;

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 md:pointer-events-none"
//         >
//             {/* Backdrop for mobile focus */}
//             <div
//                 className="absolute inset-0 bg-black/20 backdrop-blur-[1px] md:hidden pointer-events-auto"
//                 onClick={onClose}
//             />

//             {/* Card */}
//             <div
//                 ref={cardRef}
//                 className={cn(
//                     "relative w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto md:absolute md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:translate-x-12",
//                     // Dynamic positioning logic could go here, for now using fixed relative to center for simplicity
//                 )}
//             >
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors z-20"
//                 >
//                     <X size={18} />
//                 </button>

//                 {/* Photo */}
//                 {memory.photo && (
//                     <div className="h-48 md:h-56 w-full overflow-hidden relative">
//                         <img
//                             src={memory.photo}
//                             alt={memory.title}
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                     </div>
//                 )}

//                 {/* Content */}
//                 <div className="p-6 text-white bg-gradient-to-b from-transparent to-[#0A1128]/40">
//                     <div className="flex items-center space-x-2 mb-3">
//                         <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase tracking-wider font-medium">
//                             {memory.emotion}
//                         </span>
//                         <div className="flex items-center text-white/60 text-xs">
//                             <Calendar size={12} className="mr-1" />
//                             {memory.date}
//                         </div>
//                     </div>

//                     <h3 className="font-playfair text-2xl mb-3 leading-tight">{memory.title}</h3>

//                     <p className="font-inter text-sm md:text-base text-white/80 font-light leading-relaxed">
//                         {memory.description}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MemoryCard;
