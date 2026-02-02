import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const categories = ["All", "Valentine's Day", "Anniversary", "Just Because"];

const templates = [
    {
        id: 1,
        title: "Velvet Letter",
        category: "Valentine's Day",
        users: 243,
        color: "bg-[#F8E7E7]" // Placeholder color
    },
    {
        id: 2,
        title: "Golden Hour",
        category: "Anniversary",
        users: 189,
        color: "bg-[#F5EBE0]"
    },
    {
        id: 3,
        title: "Polaroid Memories",
        category: "Just Because",
        users: 562,
        color: "bg-[#E8C4B8]"
    },
    {
        id: 4,
        title: "Midnight Bloom",
        category: "Valentine's Day",
        users: 120,
        color: "bg-[#1A1A1A]"
    },
    {
        id: 5,
        title: "Soft Whisper",
        category: "Anniversary",
        users: 89,
        color: "bg-[#FFF8F3]"
    },
    {
        id: 6,
        title: "Our Journey",
        category: "Just Because",
        users: 310,
        color: "bg-[#FFE5E5]"
    }
];

const TemplateCard = ({ template }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group cursor-pointer"
        >
            <div className={cn(
                "relative aspect-[4/5] rounded-xl overflow-hidden mb-5 border border-white/40 shadow-sm transition-all duration-400 ease-out",
                "hover:shadow-md hover:scale-[1.02]",
                template.color
            )}>
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 font-playfair italic text-2xl text-soft-black/50">
                    {template.title}
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <span className="block text-xs font-inter uppercase tracking-widest text-muted-red mb-1">
                        {template.category === "Valentine's Day" ? "Valentine's" : template.category}
                    </span>
                    <h3 className="font-playfair text-xl text-soft-black">{template.title}</h3>
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

    const filteredTemplates = activeCategory === "All"
        ? templates
        : templates.filter(t => t.category === activeCategory);

    return (
        <Section className="bg-soft-white" id="templates">
            <div className="flex flex-col items-center mb-16 space-y-8">
                <div className="text-center max-w-2xl">
                    <h2 className="font-playfair text-4xl md:text-5xl text-soft-black mb-4">
                        Curated Collections
                    </h2>
                    <p className="font-inter text-gray-500">
                        Thoughtfully designed templates for every chapter of your story.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-8 py-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "relative pb-2 text-sm font-inter tracking-wide transition-colors duration-300",
                                activeCategory === cat ? "text-soft-black font-medium" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose-gold"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredTemplates.map((template) => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </AnimatePresence>
            </motion.div>

            <div className="mt-20 text-center">
                <a href="#" className="inline-flex items-center text-muted-red font-inter text-sm tracking-wide border-b border-muted-red/30 pb-1 hover:border-muted-red transition-colors">
                    See All Templates <ArrowRight className="ml-2 w-4 h-4" />
                </a>
            </div>
        </Section>
    );
};

export default TemplateShowcase;
