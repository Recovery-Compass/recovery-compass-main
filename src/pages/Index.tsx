
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import EnvironmentalDesign from '@/components/EnvironmentalDesign';
import CompassCompanion from '@/components/CompassCompanion';
import Stories from '@/components/StoriesOfTransformation';
import OptionsNotPrograms from '@/components/OptionsNotPrograms';
import Memorial from '@/components/Memorial';
import RitualQuote from '@/components/RitualQuote';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('compass');
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    compass: null,
    'environmental-design': null,
    'compass-companion': null,
    'stories': null,
    'options': null,
    'memorial': null,
  });

  // Handle navigation between sections
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Determine which section is currently in view
      let currentSectionId = 'compass';
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            currentSectionId = sectionId;
          }
        }
      });
      
      setCurrentSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      
      {/* Compass/Home Section */}
      <Section id="compass" className="relative">
        <HeroSection onNavigate={handleNavigate} />
      </Section>

      {/* Ritual Quote */}
      <div className="py-16 bg-navy">
        <RitualQuote>
          What if the most effective way to overcome substance use… doesn't involve substance use treatment?
        </RitualQuote>
      </div>

      {/* Environmental Design Section */}
      <Section id="environmental-design">
        <EnvironmentalDesign />
      </Section>
      
      {/* Compass Companion Section */}
      <Section id="compass-companion">
        <CompassCompanion />
      </Section>
      
      {/* Stories Section */}
      <Section id="stories">
        <Stories />
      </Section>
      
      {/* Options Not Programs Section */}
      <Section id="options">
        <OptionsNotPrograms />
      </Section>
      
      {/* Memorial Section */}
      <Section id="memorial">
        <Memorial />
      </Section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
