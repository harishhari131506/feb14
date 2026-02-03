import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import { Heart } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleNavigation = (id) => {
        if (!isHome) {
            navigate('/', { state: { scrollTo: id } });
            // In a real app we'd use a more robust hash scroll solution after nav
            // For now, simple timeouts or just navigating to home is okay.
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4 md:py-6",
                scrolled
                    ? "bg-white/60 backdrop-blur-xl shadow-sm border-b border-white/20"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center group">
                    <Heart className="w-5 h-5 text-rose-gold mr-2 opacity-80 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                    <span className="font-playfair font-bold text-xl md:text-2xl text-soft-black tracking-tight">
                        Valentine
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={() => handleNavigation('how-it-works')} className="font-inter text-sm text-gray-500 hover:text-soft-black transition-colors duration-300 relative group bg-transparent border-none cursor-pointer">
                        How it Works
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-rose-gold transition-all duration-300 group-hover:w-full" />
                    </button>

                    <Link
                        to="/templates"
                        className={cn(
                            "font-inter text-sm transition-colors duration-300 relative group",
                            location.pathname === '/templates' ? "text-soft-black font-medium" : "text-gray-500 hover:text-soft-black"
                        )}
                    >
                        Templates
                        <span className={cn(
                            "absolute -bottom-1 left-0 h-[1px] bg-rose-gold transition-all duration-300",
                            location.pathname === '/templates' ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                    </Link>

                    <button onClick={() => handleNavigation('stories')} className="font-inter text-sm text-gray-500 hover:text-soft-black transition-colors duration-300 relative group bg-transparent border-none cursor-pointer">
                        Stories
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-rose-gold transition-all duration-300 group-hover:w-full" />
                    </button>
                </div>

                {/* CTA */}
                <div className="flex items-center">
                    <Button
                        onClick={() => navigate('/templates')}
                        className={cn(
                            "text-xs md:text-sm px-5 py-2",
                            scrolled ? "bg-rose-gold text-white hover:bg-rose-gold/90" : "bg-white/50 backdrop-blur-sm text-soft-black hover:bg-white"
                        )}
                    >
                        Create Yours
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
