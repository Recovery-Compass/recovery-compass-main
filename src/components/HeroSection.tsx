import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CompassLogo from '@/components/CompassLogo';
import { Button } from '@/components/ui/button';
import { trackBusinessEvent } from '@/lib/analytics';
interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}
const HeroSection = ({
  onNavigate
}: HeroSectionProps) => {
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
      timestamp: new Date().toISOString()
    });
    navigate('/pathway-select');
  };
  const handleDashboardClick = () => {
    // Track demo request
    trackBusinessEvent('demo_request', {
      demo_type: 'dashboard_case_studies',
      entry_point: 'hero_section',
      timestamp: new Date().toISOString()
    });
    onNavigate('/wfd-attachments');
  };
  return <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 font-montserrat">
      <CompassLogo size="xl" animated={true} className="mb-6 sm:mb-8 lg:mb-10" priority={true} />
      
      <h1 className={cn('font-montserrat font-black text-moonlight text-shadow-lg text-center max-w-4xl', 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl', 'tracking-tight leading-none', 'transition-opacity duration-1000', titleVisible ? 'opacity-100' : 'opacity-0')} style={{
      letterSpacing: '-0.02em'
    }}>
        RECOVERY COMPASS
      </h1>
      
      <p className={cn('mt-4 sm:mt-6 max-w-lg text-center text-moonlight font-montserrat font-medium text-lg sm:text-xl px-4', 'transition-all duration-1000 delay-300', ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>Can you honestly say you've experienced the best best version of yourself yet?</p>
      
      <div className={cn('mt-8 sm:mt-10 text-center', 'transition-all duration-1000 delay-700', buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        <Button onClick={handleBeginJourney} variant="cta" size="cta">BEGIN YOUR JOURNEY</Button>
      </div>
      
      {/* Strategic Dashboard Link - positioned subtly below the main pathways */}
      <div className="mt-16 text-center animate-fade-in font-montserrat" style={{
      animationDelay: '1.8s'
    }}>
        
        <p className="text-moonlight/40 text-xs mt-2 italic font-montserrat font-light">
      </p>
      </div>
    </div>;
};
export default HeroSection;