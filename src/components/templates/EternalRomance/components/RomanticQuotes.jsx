import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const quotes = [
  {
    text: "You are my today and all of my tomorrows.",
    author: "Leo Christopher",
  },
  {
    text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
    author: "Angelita Lim",
  },
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou",
  },
  {
    text: "I love you not only for what you are, but for what I am when I am with you.",
    author: "Roy Croft",
  },
  {
    text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known—and even that is an understatement.",
    author: "F. Scott Fitzgerald",
  },
];

const RomanticQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold mb-4">
          Words of <span className="text-gradient-gold">Love</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Quote className="w-5 h-5 text-primary animate-gentle-pulse" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      <div className="relative">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className={`glass-effect rounded-2xl p-8 md:p-10 realistic-shadow realistic-texture border border-primary/20 text-center transition-all duration-700 ${index === currentQuote
                ? "opacity-100 translate-y-0"
                : "opacity-0 absolute inset-0 translate-y-4"
              }`}
          >
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="font-body text-xl md:text-2xl text-foreground italic leading-relaxed mb-6">
              "{quote.text}"
            </blockquote>
            <p className="font-body text-base text-muted-foreground">
              — {quote.author}
            </p>
          </div>
        ))}
      </div>

      {/* Quote indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentQuote
                ? "bg-primary w-8"
                : "bg-primary/30 hover:bg-primary/50"
              }`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RomanticQuotes;
