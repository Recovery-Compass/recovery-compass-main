
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('compass');
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    compass: null,
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
      setCurrentSection('compass');
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
    </div>
  );
};

export default Index;
