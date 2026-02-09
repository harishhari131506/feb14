import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { smoothScroll } from './utils/lenis';
import './animations/gsapSetup';

import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import TemplatesPage from './pages/TemplatesPage';
import MemoryConstellation from './components/templates/MemoryConstellation';
import EternalRomance from './components/templates/EternalRomance/EternalRomance';
import ScrollStory from './components/templates/ScrollStory/ScrollStory';
import TestPage from './pages/TestPage';
import ScrollToTop from './components/utils/ScrollToTop';
import CustomCursor from './components/animations/CustomCursor';
import ScrollProgress from './components/animations/ScrollProgress';
import AnimatedGrain from './components/animations/AnimatedGrain';
import PageTransition from './components/animations/PageTransition';
import SoundToggle from './components/ui/SoundToggle';
import soundManager from './utils/soundEffects';

// Simple ScrollToTop component to ensure pages start at top on navigation
const ScrollHandler = () => {
  return <ScrollToTop />;
};

// AppContent component that uses useLocation (must be inside Router)
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const isScrollStory = location.pathname === '/templates/scroll-story';
    if (isScrollStory) return;
    const lenis = smoothScroll();
    return () => {
      lenis.destroy();
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollHandler />
      <div className="w-full min-h-screen bg-soft-white overflow-hidden selection:bg-rose-gold/20 selection:text-soft-black">
        {/* Global Animation Enhancements */}
        <CustomCursor />
        <ScrollProgress />
        <AnimatedGrain />
        <SoundToggle />

        <PageTransition>
          <Routes>
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/templates" element={<><Navbar /><TemplatesPage /></>} />
            <Route path="/templates/memory-constellation" element={<MemoryConstellation />} />
            <Route path="/templates/eternal-romance" element={<EternalRomance />} />
            <Route path="/templates/scroll-story" element={<ScrollStory />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </PageTransition>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
