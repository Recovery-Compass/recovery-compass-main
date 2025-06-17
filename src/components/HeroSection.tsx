
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CompassLogo from '@/components/CompassLogo';
import { Button } from '@/components/ui/button';
import { trackBusinessEvent } from '@/lib/analytics';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [titleVisible, setTitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  
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

  const handleBeginJourney = () => {
    // Track critical business event
    trackBusinessEvent('journey_started', {
      entry_point: 'hero_cta',
      timestamp: new Date().toISOString(),
    });
    
    navigate('/pathway-select');
  };

  const handleDashboardClick = () => {
    // Track demo request
    trackBusinessEvent('demo_request', {
      demo_type: 'dashboard_case_studies',
      entry_point: 'hero_section',
      timestamp: new Date().toISOString(),
    });
    
    onNavigate('/wfd-attachments');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <CompassLogo 
        size="xl" 
        animated={true} 
        className="mb-6 sm:mb-8 lg:mb-10"
        priority={true}
      />
      
      <h1 
        className={cn(
          'text-bronze text-shadow-lg text-center max-w-4xl',
          'transition-opacity duration-1000',
          titleVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        RECOVERY COMPASS
      </h1>
      
      <p 
        className={cn(
          'mt-4 sm:mt-6 max-w-lg text-center text-moonlight text-lg sm:text-xl px-4',
          'transition-all duration-1000 delay-300',
          ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        Navigate your environment. Transform your life.
      </p>
      
      <div 
        className={cn(
          'mt-8 sm:mt-10 text-center',
          'transition-all duration-1000 delay-700',
          buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <Button 
          onClick={handleBeginJourney}
          variant="cta"
          size="cta"
        >
          Begin Your Journey
        </Button>
      </div>
      
      {/* Strategic Dashboard Link - positioned subtly below the main pathways */}
      <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '1.8s' }}>
        <button
          onClick={handleDashboardClick}
          className="group relative inline-flex items-center gap-2 px-6 py-3 text-bronze/80 hover:text-bronze transition-all duration-500 hover:scale-105"
        >
          <span className="text-sm font-montserrat font-light tracking-wide">
            Recovery Compass Dashboard Case Studies
          </span>
          <div className="w-4 h-4 rounded-full bg-bronze/20 group-hover:bg-bronze/40 transition-all duration-300" />
        </button>
        <p className="text-moonlight/40 text-xs mt-2 italic font-montserrat">
          live metrics from the field
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
