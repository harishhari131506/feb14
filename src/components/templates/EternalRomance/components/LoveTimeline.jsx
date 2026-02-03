import { Heart, Calendar, Sparkles } from "lucide-react";

const LoveTimeline = () => {
  const events = [
    {
      date: "The Beginning",
      title: "When We First Met",
      description: "That moment when our eyes first met, and I knew something magical was about to begin.",
      icon: "sparkles",
    },
    {
      date: "Our First Date",
      title: "A Perfect Evening",
      description: "Every moment with you feels like the first time, filled with butterflies and endless smiles.",
      icon: "heart",
    },
    {
      date: "Growing Together",
      title: "Building Our Dreams",
      description: "Watching our love grow stronger each day, building beautiful memories together.",
      icon: "calendar",
    },
    {
      date: "Today",
      title: "Forever Starts Now",
      description: "This is just the beginning of our forever. I can't wait to spend every day with you.",
      icon: "heart",
    },
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case "heart":
        return <Heart className="w-6 h-6" />;
      case "calendar":
        return <Calendar className="w-6 h-6" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
          Our <span className="text-gradient-gold">Journey</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-5 h-5 text-primary fill-primary animate-gentle-pulse" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
        <p className="font-body text-lg text-muted-foreground italic">
          Every moment with you is a treasure
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 transform md:-translate-x-1/2" />

        <div className="space-y-12">
          {events.map((event, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } animate-elegant-fade-in`}
              style={{
                animationDelay: `${0.3 + index * 0.2}s`,
                opacity: 0,
              }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full glass-effect border-2 border-primary/30 flex items-center justify-center text-primary elegant-shadow">
                <div className="animate-gentle-pulse">
                  {getIcon(event.icon)}
                </div>
              </div>

              {/* Content card */}
              <div
                className={`flex-1 glass-effect rounded-2xl p-6 md:p-8 realistic-shadow realistic-texture border border-primary/20 realistic-hover ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-body text-sm md:text-base text-primary font-semibold tracking-wide">
                    {event.date}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                <h3 className="font-display text-xl md:text-2xl text-foreground font-bold mb-3">
                  {event.title}
                </h3>
                <p className="font-body text-base md:text-lg text-muted-foreground italic leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveTimeline;
