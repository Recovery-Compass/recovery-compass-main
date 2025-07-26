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

  // Optimized animation sequence for faster load
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 800);
    const ctaTimer = setTimeout(() => {
      setCtaVisible(true);
    }, 1200);
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, 1600);
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Breathing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean to-midnight-foundation animate-breathe" />
      
      {/* Golden Pulsing Tree of Life */}
      <div className="relative z-10 mb-8">
        <CompassLogo 
          size="xl" 
          animated={true} 
          className="drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] animate-pulse-glow" 
          priority={true} 
        />
      </div>
      
      {/* Title - Pure White */}
      <h1 className={cn(
        'font-montserrat font-black text-white text-6xl md:text-7xl tracking-wide mb-8 relative z-10',
        'transition-opacity duration-300',
        titleVisible ? 'opacity-100' : 'opacity-0'
      )}>
        RECOVERY COMPASS
      </h1>
      
      {/* Single Powerful Tagline */}
      <h2 className={cn(
        'font-montserrat font-light text-white/90 text-2xl md:text-3xl mb-16 tracking-wider relative z-10',
        'transition-all duration-500',
        ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        Where Safe Space Creates Infinite Possibility
      </h2>
      
      {/* Single CTA - Floating */}
      <div className={cn(
        'relative z-10 transition-all duration-500',
        buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        <Button 
          onClick={handleBeginJourney} 
          className="px-12 py-6 text-lg font-montserrat tracking-wider bg-gradient-to-r from-compass-gold to-amber-600 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-500 hover:scale-105 cta-float"
        >
          DISCOVER YOUR SAFE SPACE
        </Button>
      </div>
    </div>
  );
};
export default HeroSection;