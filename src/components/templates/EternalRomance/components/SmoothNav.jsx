import { Heart, Home, Mail, Star, Calendar, Image, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "reasons", label: "Reasons", icon: Star },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "quotes", label: "Quotes", icon: Quote },
];

const SmoothNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Hide nav when at top
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-elegant-fade-in">
      <div className="glass-effect rounded-full px-4 py-3 realistic-shadow border border-primary/20 flex items-center gap-2 realistic-texture">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                relative p-3 rounded-full realistic-hover
                ${isActive ? "text-primary bg-primary/15 shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-primary"}
                hover:bg-primary/10
              `}
              style={{
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <Heart className="absolute -top-1 -right-1 w-3 h-3 text-primary fill-primary animate-heartbeat" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SmoothNav;
