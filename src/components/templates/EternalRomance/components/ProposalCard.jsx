import { useState } from "react";
import { Heart, Sparkles, Stars } from "lucide-react";
import Button from "../../../ui/Button";
import Confetti from "./Confetti.jsx";
import ParticleExplosion from "./ParticleExplosion.jsx";
import CelebrationFlash from "./CelebrationFlash.jsx";
import { playCelebrationSequence, sounds } from "../utils/soundEffects";

const ProposalCard = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationStage, setCelebrationStage] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleYes = () => {
    // Prevent multiple clicks
    if (isButtonClicked) return;
    setIsButtonClicked(true);

    // Step 1: Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Step 2: Immediate button animation and effects
    sounds.buttonClick();
    setShowParticles(true);
    setShowConfetti(true); // Show confetti immediately

    // Step 3: Particle explosion (slight delay for better effect)
    setTimeout(() => {
      playCelebrationSequence();
    }, 100);

    // Step 4: Wait for scroll, then show celebration content
    setTimeout(() => {
      setHasAnswered(true);
      sounds.celebration();
    }, 800); // Wait for scroll to complete

    // Step 5: Celebration stages with proper timing
    setTimeout(() => {
      setCelebrationStage(1);
    }, 1300);
    setTimeout(() => {
      setCelebrationStage(2);
    }, 2100);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
      {showConfetti && <Confetti />}
      <CelebrationFlash trigger={showParticles} />
      <ParticleExplosion
        trigger={showParticles}
        originX={typeof window !== 'undefined' ? window.innerWidth / 2 : 0}
        originY={typeof window !== 'undefined' ? window.innerHeight / 2 : 0}
        onComplete={() => setShowParticles(false)}
      />

      {/* Decorative corner ornaments */}
      <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-xl" />
      <div className="absolute -top-4 -right-4 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-xl" />
      <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-xl" />

      <div
        className="relative glass-effect rounded-3xl p-8 md:p-12 overflow-hidden realistic-shadow realistic-texture animate-elegant-fade-in realistic-depth"
        style={{
          animationDelay: "0.5s",
          opacity: 0,
        }}
      >
        {/* Enhanced gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at top left, hsl(38 70% 55% / 0.12) 0%, transparent 40%),
              radial-gradient(ellipse at top right, hsl(350 80% 55% / 0.1) 0%, transparent 40%),
              radial-gradient(ellipse at bottom, hsl(350 60% 50% / 0.08) 0%, transparent 60%),
              linear-gradient(180deg, transparent 0%, hsl(38 50% 95% / 0.05) 100%)
            `,
          }}
        />

        {/* Subtle animated border glow */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none animate-border-glow"
          style={{
            border: "1px solid",
            borderColor: "hsl(350 80% 55% / 0.2)",
          }}
        />
        {!hasAnswered ? (
          <>
            {/* Pre-question content */}
            <div
              className="relative text-center space-y-6 transition-all duration-500"
              style={{
                opacity: isButtonClicked ? 0 : 1,
                transform: isButtonClicked ? "translateY(-20px) scale(0.95)" : "translateY(0) scale(1)",
              }}
            >
              {/* Decorative header */}
              <div className="flex justify-center items-center gap-3 mb-6">
                <Stars className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "0s" }} />
                <Heart className="w-7 h-7 text-primary fill-primary animate-heartbeat" />
                <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.5s" }} />
                <Heart className="w-7 h-7 text-primary fill-primary animate-heartbeat" style={{ animationDelay: "0.2s" }} />
                <Stars className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "1s" }} />
              </div>

              <div className="space-y-6">
                <p className="font-body text-lg md:text-xl text-muted-foreground italic leading-relaxed tracking-wide animate-elegant-fade-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
                  From the moment I met you, my life has been filled with
                  endless joy, laughter, and love. Every day with you feels
                  like a beautiful dream I never want to wake up from.
                </p>

                <p className="font-body text-lg md:text-xl text-muted-foreground italic leading-relaxed tracking-wide animate-elegant-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
                  You are my best friend, my soulmate, and the love of my life.
                  I cannot imagine spending my life with anyone but you.
                </p>
              </div>

              {/* Decorative divider */}
              <div className="py-6 flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/40" />
                <Heart className="w-4 h-4 text-primary/50 fill-primary/50" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold leading-tight tracking-tight animate-elegant-fade-in" style={{ animationDelay: "1.1s", opacity: 0 }}>
                Will You <span className="text-gradient-gold animate-shimmer animate-text-glow">Marry</span> Me?
              </h2>

              <div className="pt-10 animate-elegant-fade-in" style={{ animationDelay: "1.3s", opacity: 0 }}>
                <div className="relative inline-block group realistic-light">
                  {/* Enhanced button glow effect */}
                  <div
                    className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${isButtonClicked
                      ? 'opacity-100 scale-200 animate-pulse'
                      : isHovering
                        ? 'opacity-100 scale-125'
                        : 'opacity-60 scale-100'
                      }`}
                    style={{
                      background: "radial-gradient(circle, hsl(350 80% 55% / 0.6) 0%, hsl(38 70% 55% / 0.4) 100%)",
                      filter: "blur(30px)",
                    }}
                  />

                  {/* Ripple effect on click */}
                  {isButtonClicked && (
                    <div
                      className="absolute inset-0 rounded-full animate-celebration-ripple"
                      style={{
                        background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)",
                        transform: "scale(0)",
                        animation: "celebration-ripple 0.6s ease-out",
                      }}
                    />
                  )}
                  <Button
                    onClick={handleYes}
                    disabled={isButtonClicked}
                    onMouseEnter={() => {
                      if (!isButtonClicked) {
                        setIsHovering(true);
                        sounds.sparkle();
                      }
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`
                      relative px-14 py-8 text-xl md:text-2xl font-display font-semibold
                      bg-gradient-to-r from-primary via-rose-deep to-primary text-primary-foreground
                      rounded-full realistic-hover border-2 border-primary-foreground/30
                      hover:border-primary-foreground/50
                      ${isHovering && !isButtonClicked ? 'animate-pulse-glow elegant-glow' : ''}
                      ${isButtonClicked ? 'scale-110' : ''}
                      light-sweep
                      transition-all duration-300
                    `}
                    style={{
                      backgroundSize: isHovering ? "200% auto" : "100% auto",
                      backgroundPosition: isHovering ? "right center" : "left center",
                      boxShadow: isButtonClicked
                        ? "0 40px 80px -15px rgba(0, 0, 0, 0.5), 0 0 120px hsl(350 80% 55% / 0.7), 0 0 180px hsl(38 70% 55% / 0.5), inset 0 3px 6px rgba(255, 255, 255, 0.4)"
                        : isHovering
                          ? "0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 0 100px hsl(350 80% 55% / 0.5), 0 0 150px hsl(38 70% 55% / 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.3)"
                          : "0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 50px hsl(350 80% 55% / 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                      transform: isButtonClicked ? "scale(1.1)" : isHovering ? "scale(1.05)" : "scale(1)",
                      pointerEvents: isButtonClicked ? "none" : "auto",
                    }}
                  >
                    <Heart
                      className={`w-6 h-6 mr-3 transition-all duration-500 ${isButtonClicked
                        ? 'fill-current scale-150 rotate-180 animate-heartbeat'
                        : isHovering
                          ? 'fill-current scale-125 rotate-12 animate-heartbeat'
                          : ''
                        }`}
                    />
                    <span className="tracking-wide">Yes, Forever!</span>
                    <Heart
                      className={`w-6 h-6 ml-3 transition-all duration-500 ${isButtonClicked
                        ? 'fill-current scale-150 -rotate-180 animate-heartbeat'
                        : isHovering
                          ? 'fill-current scale-125 -rotate-12 animate-heartbeat'
                          : ''
                        }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Post-yes celebration */}
            <div
              className="relative text-center space-y-6 animate-elegant-fade-in"
              style={{
                opacity: 0,
                animation: "elegant-fade-in 0.8s ease-out 0.3s forwards",
              }}
            >
              {/* Enhanced animated hearts row with realistic bounce */}
              <div className="flex justify-center gap-3 mb-6">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="text-primary fill-primary"
                    style={{
                      animation: `celebration-bounce 0.6s ease-out ${i * 0.08}s both, gentle-pulse 2s ease-in-out ${1 + i * 0.1}s infinite`,
                      width: i === 3 ? 50 : 32,
                      height: i === 3 ? 50 : 32,
                      filter: "drop-shadow(0 4px 8px hsl(350 80% 55% / 0.4))",
                      transform: celebrationStage >= 1 ? `scale(1.1) rotate(${(i - 3) * 5}deg)` : "scale(1)",
                      transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    }}
                  />
                ))}
              </div>

              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-bold"
                style={{
                  animation: `scale-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both, text-glow 3s ease-in-out 1s infinite`,
                  transform: celebrationStage >= 2 ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                }}
              >
                She Said <span className="text-gradient-gold animate-shimmer animate-text-glow">Yes!</span>
              </h2>

              <div
                className="animate-fade-in-up"
                style={{
                  animationDelay: "0.5s",
                  transform: celebrationStage >= 1 ? "translateY(-10px)" : "translateY(0)",
                  transition: "transform 0.5s ease-out",
                }}
              >
                <p className="font-body text-xl md:text-2xl text-primary italic flex items-center justify-center gap-3">
                  <Sparkles
                    className="w-6 h-6 text-accent animate-twinkle"
                    style={{ animationDelay: "0s" }}
                  />
                  <span className="animate-text-glow">Forever & Always</span>
                  <Sparkles
                    className="w-6 h-6 text-accent animate-twinkle"
                    style={{ animationDelay: "0.5s" }}
                  />
                </p>
              </div>

              <p
                className="font-body text-lg text-muted-foreground leading-relaxed max-w-md mx-auto animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                This is the beginning of our beautiful forever.
                I promise to love you, cherish you, and make you
                smile every single day for the rest of our lives.
              </p>

              <div
                className="pt-8 animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <div className="inline-flex items-center gap-5 px-10 py-5 rounded-full glass-effect border border-accent/40 elegant-shadow">
                  <span className="text-4xl animate-gentle-pulse">💍</span>
                  <p className="font-display text-xl md:text-2xl text-accent font-semibold tracking-wide">
                    Happy Valentine's Day
                  </p>
                  <span className="text-4xl animate-gentle-pulse" style={{ animationDelay: "0.3s" }}>💍</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalCard;
