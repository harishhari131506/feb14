const GlowingRing = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
        {/* Enhanced outer glow ring */}
        <div
          className="absolute inset-0 rounded-full animate-ring-pulse"
          style={{
            background: "radial-gradient(circle, transparent 35%, hsl(350 80% 55% / 0.15) 50%, hsl(38 70% 55% / 0.1) 65%, transparent 75%)",
          }}
        />

        {/* Enhanced middle decorative ring */}
        <div
          className="absolute inset-8 rounded-full border-2 border-primary/25 animate-ring-rotate"
          style={{
            borderStyle: "dashed",
            filter: "drop-shadow(0 0 8px hsl(350 80% 55% / 0.2))",
          }}
        />

        {/* Enhanced inner soft glow */}
        <div
          className="absolute inset-16 rounded-full animate-gentle-pulse"
          style={{
            background: "radial-gradient(circle, hsl(38 70% 55% / 0.15) 0%, hsl(350 80% 55% / 0.08) 50%, transparent 70%)",
          }}
        />

        {/* Additional subtle outer ring */}
        <div
          className="absolute -inset-4 rounded-full border border-primary/10 animate-ring-rotate"
          style={{
            borderStyle: "dotted",
            animationDirection: "reverse",
            animationDuration: "25s",
          }}
        />
      </div>
    </div>
  );
};

export default GlowingRing;
