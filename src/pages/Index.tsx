import { useState, useEffect, useRef } from 'react';
import CompassLogo from '@/components/CompassLogo';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import EnvironmentalDesign from '@/components/EnvironmentalDesign';
import CompassCompanion from '@/components/CompassCompanion';
import Stories from '@/components/StoriesOfTransformation';
import OptionsNotPrograms from '@/components/OptionsNotPrograms';
import Memorial from '@/components/Memorial';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('compass');
  const [logoAnimated, setLogoAnimated] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  
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
      
      // Only animate logo when in compass section
      setLogoAnimated(currentSectionId === 'compass');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animation sequence
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 2000);
    
    const ctaTimer = setTimeout(() => {
      setCtaVisible(true);
    }, 3000);
    
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, 4000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(ctaTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      
      {/* Compass/Home Section */}
      <Section id="compass" className="relative">
        <CompassLogo 
          size="xl" 
          animated={logoAnimated} 
          className="mb-10"
        />
        
        <h1 
          className={cn(
            'text-bronze text-shadow-lg',
            'transition-opacity duration-1000',
            titleVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          RECOVERY COMPASS
        </h1>
        
        <p 
          className={cn(
            'mt-6 max-w-lg text-center text-moonlight text-xl',
            'transition-all duration-1000 delay-300',
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          Navigate your environment. Transform your life.
        </p>
        
        <div 
          className={cn(
            'mt-10',
            'transition-all duration-1000 delay-700',
            buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Button 
            onClick={() => handleNavigate('environmental-design')}
            variant="cta"
            size="cta"
          >
            Begin Your Journey
          </Button>
        </div>
        
        <div 
          className={cn(
            'absolute bottom-12 left-1/2 transform -translate-x-1/2',
            'transition-all duration-1000 delay-1000',
            buttonVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          <button 
            onClick={() => handleNavigate('environmental-design')}
            className="text-moonlight/70 hover:text-moonlight transition-colors duration-300"
            aria-label="Scroll down to learn more"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="animate-bounce"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </Section>

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
      <footer className="bg-navy py-10 border-t border-bronze/30">
        <div className="content-container text-center">
          <CompassLogo size="sm" animated={false} className="mx-auto mb-6" />
          <p className="text-moonlight/60 text-sm">
            © {new Date().getFullYear()} Recovery Compass. All rights reserved.
          </p>
          <p className="text-moonlight/40 text-xs mt-2">
            Supporting transformation through environmental design and dignified remembrance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
