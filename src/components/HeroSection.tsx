
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CompassLogo from '@/components/CompassLogo';
import { Button } from '@/components/ui/button';

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
    navigate('/pathways');
  };

  return (
    <>
      <CompassLogo 
        size="xl" 
        animated={true} 
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
          onClick={handleBeginJourney}
          variant="cta"
          size="cta"
        >
          Begin Your Journey
        </Button>
      </div>
    </>
  );
};

export default HeroSection;
