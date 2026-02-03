import { Heart, Camera } from "lucide-react";

const PhotoGallery = () => {
  // Realistic photo placeholders - replace with your actual photos
  const photoPlaceholders = [
    {
      id: 0,
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 1",
    },
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 2",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 3",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 4",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 5",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=800&fit=crop&q=80",
      alt: "Our beautiful memory 6",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera className="w-8 h-8 text-primary animate-gentle-pulse" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-bold">
            Our <span className="text-gradient-gold">Memories</span>
          </h2>
          <Camera className="w-8 h-8 text-primary animate-gentle-pulse" style={{ animationDelay: "0.3s" }} />
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
        </div>
        <p className="font-body text-lg text-muted-foreground italic">
          Capturing moments, creating forever
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photoPlaceholders.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative aspect-square rounded-2xl overflow-hidden realistic-shadow border border-primary/20 hover:border-primary/40 realistic-hover realistic-depth animate-elegant-fade-in"
            style={{
              animationDelay: `${0.2 + index * 0.1}s`,
              opacity: 0,
            }}
          >
            {/* Realistic image with proper loading */}
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
            >
              {/* Realistic image background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Realistic overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6 z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Heart className="w-10 h-10 text-white fill-white mb-3 animate-heartbeat mx-auto" />
                  <p className="font-body text-white text-sm italic text-center">
                    {photo.alt}
                  </p>
                </div>
              </div>

              {/* Realistic light reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-rose-deep/5 opacity-50" />

              {/* Fallback if image doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-rose-deep/20 to-accent/20 z-0">
                <Camera className="w-16 h-16 text-primary/40" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <p className="font-body text-base text-muted-foreground italic">
          Add your favorite photos together to make this gallery truly yours
        </p>
      </div>
    </div>
  );
};

export default PhotoGallery;
