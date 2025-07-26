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
      
      <h1 className={cn('font-montserrat font-black text-white text-shadow-lg text-center max-w-4xl', 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl', 'tracking-wider leading-none', 'transition-opacity duration-300', titleVisible ? 'opacity-100' : 'opacity-0')}>
        RECOVERY COMPASS
      </h1>
      
      <h2 className={cn('mt-8 max-w-4xl text-center text-white/90 font-montserrat font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4', 'transition-all duration-500', ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        Where Safe Space Creates Infinite Possibility
      </h2>
      
      <p className={cn('mt-6 max-w-2xl text-center text-white/80 font-montserrat font-medium text-lg sm:text-xl px-4', 'transition-all duration-500', ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        When you feel safe, you stop surviving and start becoming
      </p>
      
      <div className={cn('mt-12 text-center', 'transition-all duration-500', buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
        <Button onClick={handleBeginJourney} variant="cta" size="cta" className="sanctuary-cta">DISCOVER YOUR SAFE SPACE</Button>
      </div>
      
      {/* Safe Space Manifesto */}
      <section className="safe-space-manifesto mt-20 text-center animate-fade-in font-montserrat" style={{
        animationDelay: '0.8s'
      }}>
        <blockquote className="font-montserrat text-2xl sm:text-3xl text-center max-w-4xl mx-auto">
          <span className="gradient-text text-white/95">
            "The magic happens when someone feels safe enough to stop defending and start discovering."
          </span>
        </blockquote>
        <p className="text-center mt-6 text-white/70 font-montserrat text-sm">
          In loving memory of a mother who created infinite safe spaces • April 4, 2025
        </p>
      </section>
    </div>;
};
export default HeroSection;