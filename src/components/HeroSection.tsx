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
    }, 200);
    const ctaTimer = setTimeout(() => {
      setCtaVisible(true);
    }, 400);
    const buttonTimer = setTimeout(() => {
      setButtonVisible(true);
    }, 600);
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
  const handleTransformOrganization = () => {
    trackBusinessEvent('journey_started', {
      entry_point: 'hero_primary_cta',
      timestamp: new Date().toISOString()
    });
    navigate('/adventure');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 safe-area-top safe-area-bottom">
      {/* Breathing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332] to-[#0f1419] animate-breathe" />
      
      {/* Golden Pulsing Tree of Life - Mobile Optimized */}
      <div className="relative z-10 mb-8 sm:mb-12">
        <CompassLogo 
          size="xl" 
          animated={true} 
          className="drop-shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-pulse-glow w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" 
          priority={true} 
        />
      </div>
      
      {/* Title - Mobile Responsive */}
      <h1 className={cn(
        'font-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-normal mb-4 sm:mb-6 relative z-10 heading-welcoming',
        'w-full text-center px-4 block mx-auto',
        'transition-opacity duration-300',
        'whitespace-nowrap overflow-visible',
        titleVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        textAlign: 'center',
        display: 'block',
        width: '100%',
        margin: '0 auto',
        lineHeight: '1.1',
        letterSpacing: '-0.02em'
      }}>
        RECOVERY COMPASS
      </h1>
      
      {/* Environmental Response Architecture™ Statement */}
      <h2 className={cn(
        'font-body text-white/90 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 tracking-wide relative z-10 max-w-xs sm:max-w-lg md:max-w-2xl text-center px-4',
        'transition-all duration-500',
        ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        Environmental Response Architecture™: Where Your Environment Becomes Your Ally
      </h2>
      
      {/* Subtle Methodology Introduction */}
      <p className={cn(
        'font-body text-white/70 text-sm sm:text-base mb-12 sm:mb-16 relative z-10 max-w-md sm:max-w-lg text-center px-4',
        'transition-all duration-500 delay-300',
        ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        Environments Designed as Partners in Your Journey
      </p>
      
      {/* Mobile-First Button Layout */}
      <div className={cn(
        'relative z-10 flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-sm sm:max-w-md transition-all duration-500',
        buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}>
        {/* Primary CTA - iOS Style */}
        <Button 
          onClick={handleTransformOrganization}
          className="w-full touch-target px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-body font-bold tracking-wide bg-gradient-to-r from-compass-gold to-tree-copper text-midnight-foundation hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 rounded-xl uppercase min-h-[56px] active:scale-95"
        >
          TRANSFORM YOUR ORGANIZATION
        </Button>
        
        {/* Secondary CTA - iOS Style */}
        <Button 
          onClick={handleBeginJourney}
          variant="outline"
          className="w-full touch-target px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-body tracking-wide border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 rounded-xl min-h-[56px] active:scale-95"
        >
          Individual Journey
        </Button>
        
        {/* Privacy Policy Link - iOS Compliant */}
        <div className="mt-6 sm:mt-8 text-center">
          <a 
            href="/privacy-policy"
            className="text-moon-glow/60 hover:text-compass-gold font-body text-sm sm:text-base transition-colors underline touch-target inline-block"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;