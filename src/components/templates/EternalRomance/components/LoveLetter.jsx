import { Heart, Quote } from "lucide-react";

const LoveLetter = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="glass-effect rounded-3xl p-8 md:p-12 realistic-shadow realistic-texture border border-primary/20 relative overflow-hidden realistic-depth">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />

        {/* Realistic gradient overlay with paper texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at top, hsl(350 60% 50% / 0.05) 0%, transparent 50%),
              url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
            `,
          }}
        />

        <div className="relative z-10 animate-elegant-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <Quote className="w-12 h-12 text-primary/40 mx-auto mb-4 animate-gentle-pulse" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-2">
              A Letter to <span className="text-gradient-gold">You</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="font-body text-sm text-muted-foreground italic">My Dearest Love</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </div>
          </div>

          {/* Letter content */}
          <div className="space-y-6 font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p className="indent-8 italic">
              My darling,
            </p>

            <p className="indent-8">
              As I sit here thinking about you, my heart overflows with love and gratitude.
              You have brought so much light, joy, and meaning into my life. Every day with
              you feels like a gift, and I am constantly amazed by your kindness, your smile,
              and the way you make everything better just by being you.
            </p>

            <p className="indent-8">
              You are my best friend, my confidant, my partner in all things. You've seen me
              at my best and my worst, and you've loved me through it all. Your support,
              your laughter, and your love have shaped me into the person I am today.
            </p>

            <p className="indent-8">
              I want to spend the rest of my life making you happy, supporting your dreams,
              and building a beautiful future together. I want to wake up next to you every
              morning and fall asleep holding you every night. I want to grow old with you,
              creating countless more memories and adventures.
            </p>

            <p className="indent-8 italic font-semibold text-primary mt-8">
              With all my love, forever and always,
            </p>

            <p className="text-right mt-6 font-display text-xl text-foreground">
              Your <span className="text-gradient-gold">Forever</span>
            </p>
          </div>

          {/* Decorative footer */}
          <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-primary/10">
            <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
            <span className="font-body text-sm text-muted-foreground italic">Valentine's Day 2025</span>
            <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" style={{ animationDelay: "0.3s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
