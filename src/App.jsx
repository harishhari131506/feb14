import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { smoothScroll } from './utils/lenis';
import './animations/gsapSetup';

import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import TemplatesPage from './pages/TemplatesPage';
import MemoryConstellation from './components/templates/MemoryConstellation';
import EternalRomance from './components/templates/EternalRomance/EternalRomance';
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

function App() {
  useEffect(() => {
    const lenis = smoothScroll();
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <Router>
      <ScrollHandler />
      <div className="w-full min-h-screen bg-soft-white overflow-hidden selection:bg-rose-gold/20 selection:text-soft-black">
        {/* Global Animation Enhancements */}
        <CustomCursor />
        <ScrollProgress />
        <AnimatedGrain />
        <SoundToggle />

        {/* Navbar needs to handle being hidden or styled differently on immersive pages like MemoryConstellation 
            For simplicity, we might conditionally render it or let the page cover it. 
            The MemoryConstellation page has z-index that covers everything, but Navbar is fixed z-50.
            Let's keep Navbar for standard pages, but maybe suppress it for full-screen templates if needed?
            Or we just let it be efficiently hidden by CSS if we want.
            For now, I'll direct render Routes. Landing and Templates will have Navbar. 
            MemoryConstellation might imply no standard navbar.
        */}
        <PageTransition>
          <Routes>
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/templates" element={<><Navbar /><TemplatesPage /></>} />
            <Route path="/templates/memory-constellation" element={<MemoryConstellation />} />
            <Route path="/templates/eternal-romance" element={<EternalRomance />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </PageTransition>
      </div>
    </Router>
  );
}

export default App;
