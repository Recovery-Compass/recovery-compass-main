
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '@/components/Section';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('compass');
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    compass: null,
  });

  // Handle navigation between sections and external routes
  const handleNavigate = (sectionId: string) => {
    // Check if it's an external route (starts with /)
    if (sectionId.startsWith('/')) {
      navigate(sectionId);
      return;
    }
    
    // Handle internal section navigation
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
    <div className="min-h-screen bg-gradient-to-b from-deep-ocean to-midnight-foundation">
      {/* Compass/Home Section */}
      <Section id="compass" className="relative">
        <HeroSection onNavigate={handleNavigate} />
      </Section>
    </div>
  );
};

export default Index;
