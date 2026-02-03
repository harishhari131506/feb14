import { Heart, Sparkles as SparkleIcon, ArrowDown } from "lucide-react";
import FloatingHearts from "./components/FloatingHearts";
import Sparkles from "./components/Sparkles";
import RosePetals from "./components/RosePetals";
import GlowingRing from "./components/GlowingRing";
import ProposalCard from "./components/ProposalCard";
import LoveLetter from "./components/LoveLetter";
import LoveTimeline from "./components/LoveTimeline";
import ReasonsToLove from "./components/ReasonsToLove";
import RomanticQuotes from "./components/RomanticQuotes";
import PhotoGallery from "./components/PhotoGallery";
import SmoothNav from "./components/SmoothNav";
import BackgroundMusic from "./components/BackgroundMusic";

const Index = () => {
    return (
        <div className="min-h-screen bg-romantic relative overflow-hidden">
            {/* Enhanced realistic ambient background gradient */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(350 60% 75% / 0.25) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsl(38 70% 55% / 0.2) 0%, transparent 55%),
            radial-gradient(ellipse 60% 40% at 20% 80%, hsl(350 80% 55% / 0.2) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 50%, hsl(38 50% 85% / 0.15) 0%, transparent 65%),
            linear-gradient(180deg, hsl(350 50% 98% / 0.6) 0%, hsl(38 40% 97% / 0.4) 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8b4b4' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
                }}
            />

            {/* Simplified background overlays for better performance */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 30% 20%, hsl(350 70% 60% / 0.06) 0%, transparent 50%)",
                    transform: "translate3d(0, 0, 0)",
                    willChange: "transform",
                }}
            />

            {/* Background decorations */}
            <FloatingHearts />
            <Sparkles />
            <RosePetals />
            <GlowingRing />

            {/* Background Music */}
            <BackgroundMusic />

            {/* Smooth Navigation */}
            <SmoothNav />

            {/* Main content - Hero Section */}
            <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12 px-4">
                {/* Header */}
                <div
                    className="text-center mb-10 space-y-5"
                    style={{
                        animation: "fade-in-up 1s ease-out forwards",
                    }}
                >
                    {/* Enhanced decorative header line */}
                    <div className="flex items-center justify-center gap-4 mb-8 animate-elegant-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
                        <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-primary/60 shadow-lg shadow-primary/20" />
                        <SparkleIcon className="w-6 h-6 text-accent animate-twinkle animate-gentle-pulse" />
                        <Heart className="w-12 h-12 text-primary fill-primary animate-heartbeat" />
                        <SparkleIcon className="w-6 h-6 text-accent animate-twinkle animate-gentle-pulse" style={{ animationDelay: "0.5s" }} />
                        <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-l from-transparent via-primary/40 to-primary/60 shadow-lg shadow-primary/20" />
                    </div>

                    <p className="font-body text-lg md:text-xl text-muted-foreground tracking-[0.4em] uppercase letter-spacing-wider animate-elegant-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
                        A Special Question
                    </p>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-7xl text-foreground font-bold tracking-tight leading-[1.1]">
                        My Dearest <span className="text-gradient-gold italic animate-text-glow">Love</span>
                    </h1>
                </div>

                {/* Proposal card */}
                <ProposalCard />

                {/* Scroll indicator */}
                <div className="mt-16 animate-elegant-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
                    <a
                        href="#letter"
                        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                        <span className="font-body text-sm italic">Scroll to explore</span>
                        <ArrowDown className="w-6 h-6 animate-elegant-float" />
                    </a>
                </div>
            </section>

            {/* Love Letter Section */}
            <section id="letter" className="relative z-10 py-20">
                <LoveLetter />
            </section>

            {/* Reasons to Love Section */}
            <section id="reasons" className="relative z-10 py-20">
                <ReasonsToLove />
            </section>

            {/* Timeline Section */}
            <section id="timeline" className="relative z-10 py-20">
                <LoveTimeline />
            </section>

            {/* Photo Gallery Section */}
            <section id="gallery" className="relative z-10 py-20">
                <PhotoGallery />
            </section>

            {/* Romantic Quotes Section */}
            <section id="quotes" className="relative z-10 py-20">
                <RomanticQuotes />
            </section>

            {/* Final Footer */}
            <section className="relative z-10 py-20">
                <div className="text-center animate-elegant-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full glass-effect border border-primary/20 realistic-shadow realistic-texture mb-6">
                        <Heart className="w-5 h-5 text-primary/70 fill-primary/70 animate-gentle-pulse" />
                        <p className="font-body text-sm md:text-base text-muted-foreground tracking-wide font-medium">
                            Valentine's Day 2025
                        </p>
                        <Heart className="w-5 h-5 text-primary/70 fill-primary/70 animate-gentle-pulse" style={{ animationDelay: "0.3s" }} />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="font-body text-xs md:text-sm text-muted-foreground/80 italic tracking-wider">
                            Made with love, just for you
                        </span>
                    </div>
                    <div className="flex justify-center gap-3">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Heart
                                key={i}
                                className="w-6 h-6 text-primary fill-primary animate-gentle-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;
