import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import TemplateShowcase from '../components/sections/TemplateShowcase';
import Features from '../components/sections/Features';
import SocialProof from '../components/sections/SocialProof';
import { Urgency, FinalCTA } from '../components/sections/FinalSections';

const LandingPage = () => {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <TemplateShowcase />
            <Features />
            <SocialProof />
            <Urgency />
            <FinalCTA />
        </main>
    );
};

export default LandingPage;
