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
  return <div className="hero-sanctuary flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 font-montserrat relative">
      <div className="tree-of-life-container mb-6 sm:mb-8 lg:mb-10">
        <CompassLogo size="xl" animated={true} className="golden-pulse-glow" priority={true} />
      </div>
      
      <h1 className={cn('font-montserrat text-white text-center max-w-4xl', 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl', 'font-black tracking-[0.15em] leading-[1.1] -mb-2', 'transition-opacity duration-300', titleVisible ? 'opacity-100' : 'opacity-0')}>
        RECOVERY COMPASS
      </h1>
      
      <div className={cn('mt-12 text-center', 'transition-all duration-500', buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        <Button onClick={handleBeginJourney} variant="cta" size="cta" className="sanctuary-cta font-black tracking-[0.1em]">DISCOVER YOUR SAFE SPACE</Button>
      </div>
    </div>;
};
export default HeroSection;