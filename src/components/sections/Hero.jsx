
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Hero = () => {
    const headlineText = "Your Love Story, Beautifully Told";

    // Kinetic typography variants
    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03, // Gentle ripple
                delayChildren: 0.3
            }
        }
    };

    const letterAnim = {
        hidden: { opacity: 0, letterSpacing: "-0.05em" },
        show: {
            opacity: 1,
            letterSpacing: "normal",
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative w-full h-[100dvh] bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-warm-beige/30 via-cream to-white opacity-80 pointer-events-none" />

            {/* Content Container - 60% whitespace feel */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">

                {/* Headline - Kinetic Typography */}
                <motion.h1
                    className="font-playfair text-4xl md:text-6xl lg:text-7xl text-soft-black leading-tight mb-6"
                    variants={letterContainer}
                    initial="hidden"
                    animate="show"
                >
                    {headlineText.split("").map((char, index) => (
                        <motion.span key={index} variants={letterAnim} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subheadline - Slow Fade */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="font-inter font-light text-gray-500 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
                >
                    Create a digital love letter they'll treasure forever.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    className="pt-4"
                >
                    <Button variant="primary" className="text-white" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>
                        Begin Your Message
                    </Button>
                </motion.div>

                {/* Social Proof - Understated */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
                    className="mt-6 text-sm text-gray-500 font-inter tracking-wide"
                >
                    Join 12,847 people sharing their love
                </motion.p>
            </div>

            {/* Optional: Subtle Glassmorphic Preview (Very faint, bottom right or background layer) */}
            {/* Leaving it out for now to maximize "White Space" as requested, can add if user insists on "showing" something */}

        </section>
    );
};

export default Hero;






// import React from 'react';
// import { motion } from 'framer-motion';
// import Button from '../ui/Button';

// const Hero = () => {
//     const headlineText = "Your Love Story, Beautifully Told";

//     // Kinetic typography variants with refined timing
//     const letterContainer = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.025,
//                 delayChildren: 0.2
//             }
//         }
//     };

//     const letterAnim = {
//         hidden: {
//             opacity: 0,
//             y: 20,
//             scale: 0.95,
//             filter: "blur(4px)"
//         },
//         show: {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             filter: "blur(0px)",
//             transition: {
//                 duration: 0.6,
//                 ease: [0.22, 1, 0.36, 1] // Custom easing curve for elegance
//             }
//         }
//     };

//     // Floating particles animation
//     const floatingParticle = {
//         initial: { y: 0, opacity: 0.4 },
//         animate: {
//             y: [-20, 20],
//             opacity: [0.2, 0.6, 0.2],
//             transition: {
//                 duration: 8,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//             }
//         }
//     };

//     return (
//         <section className="relative w-full h-[100dvh] bg-gradient-to-br from-[#FDFBF7] via-[#FFF8F0] to-[#FFF5EB] flex flex-col items-center justify-center overflow-hidden">

//             {/* Ambient Background Elements */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {/* Soft gradient orbs */}
//                 <motion.div
//                     className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-rose-200/20 to-amber-100/20 blur-3xl"
//                     animate={{
//                         scale: [1, 1.2, 1],
//                         opacity: [0.3, 0.5, 0.3],
//                     }}
//                     transition={{
//                         duration: 8,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />
//                 <motion.div
//                     className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-pink-200/15 to-orange-100/15 blur-3xl"
//                     animate={{
//                         scale: [1.2, 1, 1.2],
//                         opacity: [0.2, 0.4, 0.2],
//                     }}
//                     transition={{
//                         duration: 10,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                         delay: 1
//                     }}
//                 />

//                 {/* Decorative floating elements */}
//                 {[...Array(3)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-2 h-2 rounded-full bg-rose-300/30"
//                         style={{
//                             left: `${20 + i * 30}%`,
//                             top: `${30 + i * 20}%`,
//                         }}
//                         variants={floatingParticle}
//                         initial="initial"
//                         animate="animate"
//                         transition={{
//                             delay: i * 2,
//                         }}
//                     />
//                 ))}
//             </div>

//             {/* Subtle vignette overlay */}
//             <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#FDFBF7]/40 pointer-events-none" />

//             {/* Content Container */}
//             <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">

//                 {/* Decorative accent line above headline */}
//                 <motion.div
//                     initial={{ width: 0, opacity: 0 }}
//                     animate={{ width: 80, opacity: 1 }}
//                     transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
//                     className="h-[1px] bg-gradient-to-r from-transparent via-rose-300/60 to-transparent mb-8"
//                 />

//                 {/* Headline - Enhanced Kinetic Typography */}
//                 <motion.h1
//                     className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-neutral-900 leading-[1.1] mb-8 tracking-tight"
//                     style={{
//                         fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
//                         textShadow: "0 2px 30px rgba(0,0,0,0.03)"
//                     }}
//                     variants={letterContainer}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     {headlineText.split("").map((char, index) => (
//                         <motion.span
//                             key={index}
//                             variants={letterAnim}
//                             className="inline-block"
//                             style={{
//                                 display: char === " " ? "inline" : "inline-block",
//                             }}
//                         >
//                             {char === " " ? "\u00A0" : char}
//                         </motion.span>
//                     ))}
//                 </motion.h1>

//                 {/* Subheadline - Enhanced with better typography */}
//                 <motion.p
//                     initial={{ opacity: 0, y: 15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
//                     className="font-light text-neutral-600 text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12 tracking-wide"
//                     style={{
//                         fontFamily: "'Inter', -apple-system, sans-serif",
//                         letterSpacing: "0.01em"
//                     }}
//                 >
//                     Create a digital love letter they'll treasure forever.
//                 </motion.p>

//                 {/* CTA with enhanced presence */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                     className="relative"
//                 >
//                     {/* Glow effect behind button */}
//                     <div className="absolute inset-0 bg-rose-400/20 blur-2xl scale-110 rounded-full" />

//                     <Button
//                         variant='primary'
//                         className="relative text-white shadow-xl shadow-rose-500/20"
//                         onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
//                     >
//                         Begin Your Message
//                     </Button>
//                 </motion.div>

//                 {/* Social Proof - Refined styling */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
//                     className="mt-12 flex items-center gap-2"
//                 >
//                     {/* Small avatar stack */}
//                     <div className="flex -space-x-2">
//                         {[...Array(4)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-300 to-amber-200 border-2 border-white shadow-sm"
//                             />
//                         ))}
//                     </div>
//                     <p className="text-sm text-neutral-500 font-light tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
//                         Join <span className="font-medium text-neutral-700">12,847</span> people sharing their love
//                     </p>
//                 </motion.div>

//                 {/* Decorative accent line below */}
//                 <motion.div
//                     initial={{ width: 0, opacity: 0 }}
//                     animate={{ width: 60, opacity: 1 }}
//                     transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
//                     className="h-[1px] bg-gradient-to-r from-transparent via-rose-300/40 to-transparent mt-16"
//                 />
//             </div>

//             {/* Scroll indicator */}
//             <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 2, duration: 1, ease: "easeOut" }}
//                 className="absolute bottom-12 left-1/2 -translate-x-1/2"
//             >
//                 <motion.div
//                     animate={{ y: [0, 8, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     className="w-6 h-10 rounded-full border-2 border-neutral-300/50 flex items-start justify-center pt-2"
//                 >
//                     <div className="w-1 h-2 bg-neutral-400/60 rounded-full" />
//                 </motion.div>
//             </motion.div>

//         </section>
//     );
// };

// export default Hero;