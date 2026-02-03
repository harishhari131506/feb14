import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';
import HorizontalScroll from '../animations/HorizontalScroll';

const categories = ["All", "Valentine's Day", "Anniversary", "Just Because"];

const withBase = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;

const templates = [
    {
        id: 1,
        title: "Velvet Letter",
        category: "Valentine's Day",
        users: 243,
        color: "bg-[#F8E7E7]",
        imageSrc: withBase("write.jpg"),
        badge: "Handwritten feel",
        tagline: "Looks like a handwritten note on soft textured paper.",
    },
    {
        id: 2,
        title: "Golden Hour",
        category: "Anniversary",
        users: 189,
        color: "bg-[#F5EBE0]",
        imageSrc: withBase("preview.jpg"),
        badge: "Editor's pick",
        tagline: "Full-bleed photos wrapped in a warm, cinematic glow.",
    },
    {
        id: 3,
        title: "Polaroid Memories",
        category: "Just Because",
        users: 562,
        color: "bg-[#E8C4B8]",
        imageSrc: withBase("share.jpg"),
        badge: "Most loved",
        tagline: "Scattered polaroids that turn your moments into a keepsake wall.",
    },
    {
        id: 4,
        title: "Midnight Bloom",
        category: "Valentine's Day",
        users: 120,
        color: "bg-[#1A1A1A]",
        imageSrc: withBase("templates/nightsky.jpg"),
        badge: "Dark mode",
        tagline: "Moody florals and neon accents for late–night confessions.",
    },
    {
        id: 5,
        title: "Soft Whisper",
        category: "Anniversary",
        users: 89,
        color: "bg-[#FFF8F3]",
        imageSrc: withBase("choose.jpg"),
        badge: "Gentle & minimal",
        tagline: "Airy layout with plenty of white space for shy hearts.",
    },
    {
        id: 6,
        title: "Our Journey",
        category: "Just Because",
        users: 310,
        color: "bg-[#FFE5E5]",
        imageSrc: withBase("preview.jpg"),
        badge: "Storyline",
        tagline: "Timeline-style story that walks them through every chapter.",
    }
];

const TemplateCard = ({ template, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group cursor-pointer w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] mx-auto "

        >
            <motion.div
                className={cn(
                    "relative aspect-[4/5] rounded-xl overflow-hidden mb-5 border border-white/40 shadow-sm transition-shadow duration-300",
                    template.color
                )}
                whileHover={!prefersReducedMotion ? {
                    y: -8,
                    transition: { duration: 0.3 }
                } : {}}
            >
                {/* Preview image */}
                <motion.div className="absolute inset-0">
                    <motion.img
                        src={template.imageSrc}
                        alt={`${template.title} preview`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        animate={!prefersReducedMotion && isHovered ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />

                    {/* Soft readability overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

                    {/* Top badge */}
                    {template.badge && (
                        <div className="absolute top-4 left-4 z-20 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-inter uppercase tracking-[0.18em] text-soft-black/80">
                            {template.badge}
                        </div>
                    )}

                    {/* Title badge */}
                    <div className="absolute left-4 bottom-4 z-20 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-inter text-soft-black shadow-sm">
                        {template.title}
                    </div>
                </motion.div>

                {/* Hover overlay with CTA */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 flex items-end justify-center pb-6 px-5"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-xs text-left space-y-2"
                    >
                        <p className="text-[11px] font-inter uppercase tracking-[0.22em] text-rose-100/80">
                            Tap to preview
                        </p>
                        <p className="text-white font-playfair text-lg leading-snug">
                            {template.title}
                        </p>
                        {template.tagline && (
                            <p className="text-[11px] font-inter text-gray-200/90 leading-relaxed line-clamp-2">
                                {template.tagline}
                            </p>
                        )}
                        <div className="flex items-center justify-between pt-1 text-[11px] font-inter text-gray-200/80">
                            <span className="uppercase tracking-[0.18em]">
                                View details
                            </span>
                            <span className="opacity-80">
                                {template.users.toLocaleString()} used
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <div className="flex justify-between items-start">
                <div>
                    <span className="block text-xs font-inter uppercase tracking-widest text-muted-red mb-1">
                        {template.category === "Valentine's Day" ? "Valentine's" : template.category}
                    </span>
                    <h3 className="font-playfair text-xl text-soft-black">{template.title}</h3>
                    {template.tagline && (
                        <p className="mt-1 text-xs text-gray-500 font-inter max-w-xs">
                            {template.tagline}
                        </p>
                    )}
                </div>
                <span className="text-xs text-gray-400 font-inter mt-1 tabular-nums">
                    {template.users} used
                </span>
            </div>
        </motion.div>
    );
};

const TemplateShowcase = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const indicatorRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    // Animate tab indicator
    useEffect(() => {
        if (!indicatorRef.current || prefersReducedMotion) return;

        const activeTab = document.querySelector(`[data-category="${activeCategory}"]`);
        if (!activeTab) return;

        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement.getBoundingClientRect();

        gsap.to(indicatorRef.current, {
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [activeCategory, prefersReducedMotion]);

    return (
        <Section className="bg-soft-white" id="templates">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-16 space-y-8"
            >
                <div className="text-center max-w-2xl">
                    <h2 className="font-playfair text-4xl md:text-5xl text-soft-black mb-4">
                        Curated Collections
                    </h2>
                    <p className="font-inter text-gray-500">
                        Thoughtfully designed templates for every chapter of your story.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="relative flex flex-wrap justify-center gap-8 py-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            data-category={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "relative pb-2 text-sm font-inter tracking-wide transition-colors duration-300 z-10",
                                activeCategory === cat
                                    ? "text-soft-black font-medium"
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {cat}
                        </button>
                    ))}

                    {/* Animated indicator */}
                    {!prefersReducedMotion && (
                        <div
                            ref={indicatorRef}
                            className="absolute bottom-0 h-[2px] bg-rose-gold transition-all duration-400"
                            style={{ left: 0, width: 0 }}
                        />
                    )}
                </div>
            </motion.div>

            {/* Horizontal Scroll for "All" category */}
            {activeCategory === "All" && !prefersReducedMotion ? (
                <HorizontalScroll snap={true}>
                    {filteredTemplates.map((template, index) => (
                        <div key={template.id} className="w-full">
                            <TemplateCard template={template} index={index} />
                        </div>
                    ))}
                </HorizontalScroll>
            ) : (
                /* Grid for filtered categories */
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template, index) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Empty state */}
            {filteredTemplates.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="text-6xl mb-4">💔</div>
                    <p className="text-gray-500 font-inter">
                        No templates found in this category.
                    </p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 text-center"
            >
                <a
                    href="#"
                    className="inline-flex items-center text-muted-red font-inter text-sm tracking-wide border-b border-muted-red/30 pb-1 hover:border-muted-red transition-colors"
                >
                    See All Templates <ArrowRight className="ml-2 w-4 h-4" />
                </a>
            </motion.div>
        </Section>
    );
};

export default TemplateShowcase;
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
// import Section from '../ui/Section';
// import { ArrowRight } from 'lucide-react';
// import { cn } from '../../utils/cn';
// import { useReducedMotion } from '../../hooks/useReducedMotion';
// import { easings } from '../../utils/easings';
// import gsap from 'gsap';
// import HorizontalScroll from '../animations/HorizontalScroll';
// import ImageDistortion from '../webgl/ImageDistortion';
// import GyroscopeParallax from '../animations/GyroscopeParallax';

// const categories = ["All", "Valentine's Day", "Anniversary", "Just Because"];

// const withBase = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;

// const templates = [
//     {
//         id: 1,
//         title: "Velvet Letter",
//         category: "Valentine's Day",
//         users: 243,
//         color: "bg-[#F8E7E7]",
//         imageSrc: withBase("write.jpg"),
//         badge: "Handwritten feel",
//         tagline: "Looks like a handwritten note on soft textured paper.",
//     },
//     {
//         id: 2,
//         title: "Golden Hour",
//         category: "Anniversary",
//         users: 189,
//         color: "bg-[#F5EBE0]",
//         imageSrc: withBase("preview.jpg"),
//         badge: "Editor's pick",
//         tagline: "Full-bleed photos wrapped in a warm, cinematic glow.",
//     },
//     {
//         id: 3,
//         title: "Polaroid Memories",
//         category: "Just Because",
//         users: 562,
//         color: "bg-[#E8C4B8]",
//         imageSrc: withBase("share.jpg"),
//         badge: "Most loved",
//         tagline: "Scattered polaroids that turn your moments into a keepsake wall.",
//     },
//     {
//         id: 4,
//         title: "Midnight Bloom",
//         category: "Valentine's Day",
//         users: 120,
//         color: "bg-[#1A1A1A]",
//         imageSrc: withBase("templates/nightsky.jpg"),
//         badge: "Dark mode",
//         tagline: "Moody florals and neon accents for late–night confessions.",
//     },
//     {
//         id: 5,
//         title: "Soft Whisper",
//         category: "Anniversary",
//         users: 89,
//         color: "bg-[#FFF8F3]",
//         imageSrc: withBase("choose.jpg"),
//         badge: "Gentle & minimal",
//         tagline: "Airy layout with plenty of white space for shy hearts.",
//     },
//     {
//         id: 6,
//         title: "Our Journey",
//         category: "Just Because",
//         users: 310,
//         color: "bg-[#FFE5E5]",
//         imageSrc: withBase("preview.jpg"),
//         badge: "Storyline",
//         tagline: "Timeline-style story that walks them through every chapter.",
//     }
// ];

// const TemplateCard = ({ template, index }) => {
//     const cardRef = useRef(null);
//     const [isHovered, setIsHovered] = useState(false);
//     const prefersReducedMotion = useReducedMotion();
//     const [showDistortion, setShowDistortion] = useState(false);

//     // Floating animation with offset
//     const floatOffset = index * 0.5;
//     const rotationOffset = index % 2 === 0 ? -1 : 1;

//     // 3D tilt effect
//     const x = useSpring(0, { stiffness: 300, damping: 30 });
//     const y = useSpring(0, { stiffness: 300, damping: 30 });
//     const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
//     const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

//     useEffect(() => {
//         if (!cardRef.current || prefersReducedMotion) return;

//         const card = cardRef.current;

//         const handleMouseMove = (e) => {
//             if (!isHovered) return;

//             const rect = card.getBoundingClientRect();
//             const centerX = rect.left + rect.width / 2;
//             const centerY = rect.top + rect.height / 2;

//             const mouseX = e.clientX - centerX;
//             const mouseY = e.clientY - centerY;

//             const maxTilt = 8;
//             rotateX.set((mouseY / (rect.height / 2)) * -maxTilt);
//             rotateY.set((mouseX / (rect.width / 2)) * maxTilt);

//             // Subtle magnetic pull
//             x.set(mouseX * 0.1);
//             y.set(mouseY * 0.1);
//         };

//         const handleMouseLeave = () => {
//             rotateX.set(0);
//             rotateY.set(0);
//             x.set(0);
//             y.set(0);
//         };

//         if (isHovered) {
//             card.addEventListener('mousemove', handleMouseMove);
//             card.addEventListener('mouseleave', handleMouseLeave);
//         }

//         return () => {
//             card.removeEventListener('mousemove', handleMouseMove);
//             card.removeEventListener('mouseleave', handleMouseLeave);
//         };
//     }, [isHovered, prefersReducedMotion, rotateX, rotateY, x, y]);

//     return (
//         <motion.div
//             ref={cardRef}
//             layout
//             initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -3 }}
//             animate={{
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 rotate: 0,
//             }}
//             exit={{
//                 opacity: 0,
//                 scale: 0.9,
//                 blur: 8,
//                 transition: { duration: 0.4 }
//             }}
//             transition={{
//                 duration: 0.6,
//                 ease: easings.elegant,
//                 delay: index * 0.06,
//             }}
//             style={{
//                 x,
//                 y,
//                 rotateX: prefersReducedMotion ? 0 : rotateX,
//                 rotateY: prefersReducedMotion ? 0 : rotateY,
//                 transformStyle: 'preserve-3d',
//             }}
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//             className="group cursor-pointer w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] mx-auto"
//         >
//             <motion.div
//                 className={cn(
//                     "relative aspect-[4/5] rounded-xl overflow-hidden mb-5 border border-white/40 shadow-sm transition-all duration-400 ease-out",
//                     template.color
//                 )}
//                 animate={!prefersReducedMotion ? {
//                     y: [0, -5 - floatOffset, 0],
//                     rotate: [0, rotationOffset * 0.5, 0],
//                 } : {}}
//                 transition={{
//                     duration: 4 + floatOffset,
//                     repeat: Infinity,
//                     ease: 'easeInOut',
//                     delay: floatOffset,
//                 }}
//                 whileHover={!prefersReducedMotion ? {
//                     y: -12,
//                     scale: 1.02,
//                     transition: { duration: 0.3 }
//                 } : {}}
//             >
//                 {/* Animated gradient border */}
//                 {!prefersReducedMotion && isHovered && (
//                     <motion.div
//                         className="absolute inset-0 rounded-xl"
//                         style={{
//                             background: 'conic-gradient(from 0deg, #DC267F, #FFB6C1, #F5EBE0, #DC267F)',
//                             padding: '2px',
//                             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                             WebkitMaskComposite: 'xor',
//                             maskComposite: 'exclude',
//                         }}
//                         animate={{
//                             rotate: 360,
//                         }}
//                         transition={{
//                             duration: 2,
//                             repeat: Infinity,
//                             ease: 'linear',
//                         }}
//                     />
//                 )}

//                 {/* Glass overlay effect */}
//                 <motion.div
//                     className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
//                 />

//                 {/* Preview image */}
//                 <GyroscopeParallax intensity={3}>
//                     <motion.div className="absolute inset-0">
//                         <motion.img
//                             src={template.imageSrc}
//                             alt={`${template.title} preview`}
//                             className="absolute inset-0 h-full w-full object-cover"
//                             loading="lazy"
//                             decoding="async"
//                             animate={!prefersReducedMotion ? (isHovered ? { scale: 1.08 } : { scale: 1.02 }) : {}}
//                             transition={{ duration: 0.8, ease: 'easeOut' }}
//                             onHoverStart={() => setShowDistortion(true)}
//                             onHoverEnd={() => setShowDistortion(false)}
//                         />

//                         {/* Soft readability overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

//                         {/* Top badge / hook */}
//                         {template.badge && (
//                             <motion.div
//                                 className="absolute top-4 left-4 z-20 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-[11px] font-inter uppercase tracking-[0.18em] text-soft-black/80"
//                                 initial={false}
//                                 animate={!prefersReducedMotion && isHovered ? { y: -2, opacity: 1 } : { y: 0, opacity: 0.9 }}
//                                 transition={{ duration: 0.25 }}
//                             >
//                                 {template.badge}
//                             </motion.div>
//                         )}

//                         {/* Title badge */}
//                         <motion.div
//                             className="absolute left-4 bottom-4 z-20 rounded-full bg-white/75 backdrop-blur px-4 py-2 text-sm font-inter text-soft-black shadow-sm"
//                             initial={false}
//                             animate={!prefersReducedMotion && isHovered ? { y: -2, scale: 1.02 } : { y: 0, scale: 1 }}
//                             transition={{ duration: 0.25 }}
//                         >
//                             {template.title}
//                         </motion.div>
//                     </motion.div>
//                 </GyroscopeParallax>

//                 {/* Hover overlay with CTA */}
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end justify-center pb-6 px-5"
//                 >
//                     <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                         transition={{ duration: 0.25, ease: 'easeOut' }}
//                         className="w-full max-w-xs text-left space-y-2"
//                     >
//                         <p className="text-[11px] font-inter uppercase tracking-[0.22em] text-rose-100/80">
//                             Tap to preview
//                         </p>
//                         <p className="text-white font-playfair text-lg leading-snug">
//                             {template.title}
//                         </p>
//                         {template.tagline && (
//                             <p className="text-[11px] font-inter text-gray-200/90 leading-relaxed line-clamp-2">
//                                 {template.tagline}
//                             </p>
//                         )}
//                         <div className="flex items-center justify-between pt-1 text-[11px] font-inter text-gray-200/80">
//                             <span className="uppercase tracking-[0.18em]">
//                                 View details
//                             </span>
//                             <span className="opacity-80">
//                                 {template.users.toLocaleString()} used
//                             </span>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             </motion.div>

//             <div className="flex justify-between items-start">
//                 <div>
//                     <motion.span
//                         animate={isHovered ? { letterSpacing: '0.05em' } : { letterSpacing: '0em' }}
//                         transition={{ duration: 0.3 }}
//                         className="block text-xs font-inter uppercase tracking-widest text-muted-red mb-1"
//                     >
//                         {template.category === "Valentine's Day" ? "Valentine's" : template.category}
//                     </motion.span>
//                     <h3 className="font-playfair text-xl text-soft-black">{template.title}</h3>
//                     {template.tagline && (
//                         <p className="mt-1 text-xs text-gray-500 font-inter max-w-xs">
//                             {template.tagline}
//                         </p>
//                     )}
//                 </div>
//                 <span className="text-xs text-gray-400 font-inter mt-1 tabular-nums">
//                     {template.users} used
//                 </span>
//             </div>
//         </motion.div>
//     );
// };

// const TemplateShowcase = () => {
//     const [activeCategory, setActiveCategory] = useState("All");
//     const [isTransitioning, setIsTransitioning] = useState(false);
//     const indicatorRef = useRef(null);
//     const prefersReducedMotion = useReducedMotion();

//     const filteredTemplates = activeCategory === "All"
//         ? templates
//         : templates.filter(t => t.category === activeCategory);

//     // Animate tab indicator with liquid morph
//     useEffect(() => {
//         if (!indicatorRef.current || prefersReducedMotion) return;

//         const activeTab = document.querySelector(`[data-category="${activeCategory}"]`);
//         if (!activeTab) return;

//         const tabRect = activeTab.getBoundingClientRect();
//         const containerRect = activeTab.parentElement.getBoundingClientRect();

//         gsap.to(indicatorRef.current, {
//             left: tabRect.left - containerRect.left,
//             width: tabRect.width,
//             duration: 0.5,
//             ease: "elastic.out(1, 0.5)",
//         });
//     }, [activeCategory, prefersReducedMotion]);

//     const handleTabClick = (cat) => {
//         if (cat === activeCategory) return;

//         setIsTransitioning(true);
//         setActiveCategory(cat);

//         setTimeout(() => {
//             setIsTransitioning(false);
//         }, 600);
//     };

//     return (
//         <Section className="bg-soft-white" id="templates">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center mb-16 space-y-8"
//             >
//                 <div className="text-center max-w-2xl">
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         className="font-playfair text-4xl md:text-5xl text-soft-black mb-4"
//                     >
//                         Curated Collections
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: 0.2 }}
//                         className="font-inter text-gray-500"
//                     >
//                         Thoughtfully designed templates for every chapter of your story.
//                     </motion.p>
//                 </div>

//                 {/* Filter Tabs with animated indicator */}
//                 <div className="relative flex flex-wrap justify-center gap-8 py-4">
//                     {categories.map((cat) => (
//                         <button
//                             key={cat}
//                             data-category={cat}
//                             onClick={() => handleTabClick(cat)}
//                             className={cn(
//                                 "relative pb-2 text-sm font-inter tracking-wide transition-colors duration-300 z-10",
//                                 activeCategory === cat
//                                     ? "text-soft-black font-medium"
//                                     : "text-gray-400 hover:text-gray-600"
//                             )}
//                         >
//                             {cat}
//                         </button>
//                     ))}

//                     {/* Animated indicator */}
//                     {!prefersReducedMotion && (
//                         <motion.div
//                             ref={indicatorRef}
//                             layoutId="activeTab"
//                             className="absolute bottom-0 h-[1px] bg-rose-gold"
//                             initial={false}
//                             transition={{
//                                 type: "spring",
//                                 stiffness: 200,
//                                 damping: 20,
//                             }}
//                         />
//                     )}
//                 </div>
//             </motion.div>

//             {/* Horizontal Scroll Gallery (Awwwards-style) */}
//             {activeCategory === "All" && !prefersReducedMotion ? (
//                 <HorizontalScroll snap={true}>
//                     {filteredTemplates.map((template, index) => (
//                         <div key={template.id} className="w-full">
//                             <TemplateCard
//                                 template={template}
//                                 index={index}
//                             />
//                         </div>
//                     ))}
//                 </HorizontalScroll>
//             ) : (
//                 /* Fallback Grid for filtered/categories */
//                 <motion.div
//                     layout
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
//                 >
//                     <AnimatePresence mode="popLayout">
//                         {filteredTemplates.map((template, index) => (
//                             <TemplateCard
//                                 key={template.id}
//                                 template={template}
//                                 index={index}
//                             />
//                         ))}
//                     </AnimatePresence>
//                 </motion.div>
//             )}

//             {/* Empty state */}
//             {filteredTemplates.length === 0 && (
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-20"
//                 >
//                     <motion.div
//                         animate={{ rotate: [0, 10, -10, 0] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                         className="text-6xl mb-4"
//                     >
//                         💔
//                     </motion.div>
//                     <p className="text-gray-500 font-inter">
//                         No templates found in this category.
//                     </p>
//                 </motion.div>
//             )}

//             <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="mt-20 text-center"
//             >
//                 <a
//                     href="#"
//                     className="inline-flex items-center text-muted-red font-inter text-sm tracking-wide border-b border-muted-red/30 pb-1 hover:border-muted-red transition-colors"
//                 >
//                     See All Templates <ArrowRight className="ml-2 w-4 h-4" />
//                 </a>
//             </motion.div>
//         </Section>
//     );
// };

// export default TemplateShowcase;
