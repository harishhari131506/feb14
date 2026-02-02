import React, { useEffect } from 'react';
import { smoothScroll } from './utils/lenis';
import './animations/gsapSetup';

import Hero from './components/sections/Hero';
import HowItWorks from './components/sections/HowItWorks';
import TemplateShowcase from './components/sections/TemplateShowcase';
import Features from './components/sections/Features';
import SocialProof from './components/sections/SocialProof';

import { Urgency, FinalCTA } from './components/sections/FinalSections';
import Navbar from './components/layout/Navbar';

function App() {
  useEffect(() => {
    const lenis = smoothScroll();
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-soft-white overflow-hidden selection:bg-rose-gold/20 selection:text-soft-black">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <TemplateShowcase />
        <Features />
        <SocialProof />
        <Urgency />
        <FinalCTA />
      </main>
    </div>
  );
}

export default App;
