import { Heart, Star, Sparkles, Moon, Sun, Flower2 } from "lucide-react";


const ReasonsToLove = () => {
  const reasons = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Your Beautiful Heart",
      description: "The way you care for others and show kindness to everyone around you.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Your Bright Smile",
      description: "It lights up my world and makes every day brighter, no matter what.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Your Amazing Laugh",
      description: "The sound of your laughter is my favorite melody in the world.",
    },
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Your Gentle Soul",
      description: "Your calm presence brings peace to my heart and mind.",
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Your Positive Energy",
      description: "You inspire me to be better and see the beauty in everything.",
    },
    {
      icon: <Flower2 className="w-8 h-8" />,
      title: "Your Unique You",
      description: "Everything about you is perfect, just the way you are.",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold mb-4">
          Why I <span className="text-gradient-rose">Love</span> You
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-5 h-5 text-primary fill-primary animate-gentle-pulse" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
        <p className="font-body text-lg text-muted-foreground italic">
          Just a few of the countless reasons
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="glass-effect rounded-2xl p-6 realistic-shadow realistic-texture border border-primary/20 hover:border-primary/40 realistic-hover realistic-depth group animate-elegant-fade-in"
            style={{
              animationDelay: `${0.2 + index * 0.1}s`,
              opacity: 0,
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-rose-deep/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 elegant-glow">
                <div className="animate-gentle-pulse">
                  {reason.icon}
                </div>
              </div>
              <h3 className="font-display text-xl text-foreground font-bold">
                {reason.title}
              </h3>
              <p className="font-body text-base text-muted-foreground italic leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="font-body text-lg text-muted-foreground italic">
          And so many more reasons that words cannot express...
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className="w-5 h-5 text-primary fill-primary animate-gentle-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonsToLove;
