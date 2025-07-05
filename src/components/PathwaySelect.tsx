import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Configuration - easier to maintain and extend
const PATHWAY_CONFIG = [
  {
    id: 'compass-companion',
    title: 'Compass Companion',
    description: 'No diagnosis. No intake. Just space to begin, on your terms.',
    subtext: 'This isn\'t treatment. This is restoration.',
    ctaText: 'Enter Companion',
    colorScheme: 'teal' as const,
    route: '/compass-companion'
  },
  {
    id: 'impact-translator',
    title: 'Impact Translator',
    description: 'You keep caring. I\'ll make sure your story gets funded.',
    subtext: 'Built for people like Randall — who give shoes to foster kids, not spreadsheets to grant panels.',
    ctaText: 'Launch Translator',
    colorScheme: 'gold' as const,
    route: '/impact-translator'
  }
] as const;

// Color scheme styles - centralized for consistency
const COLOR_SCHEMES = {
  teal: {
    title: 'text-teal',
    button: 'border-teal text-teal hover:bg-teal hover:text-navy',
    shadow: 'hover:shadow-teal/20',
    buttonShadow: 'hover:shadow-teal/30'
  },
  gold: {
    title: 'text-bronze',
    button: 'border-bronze text-bronze hover:bg-bronze hover:text-navy',
    shadow: 'hover:shadow-bronze/20',
    buttonShadow: 'hover:shadow-bronze/30'
  }
} as const;

const PathwaySelect = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Single effect for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Memoized navigation handler with error handling
  const handlePathwaySelect = useCallback(async (route: string) => {
    if (isNavigating) return; // Prevent double-clicks
    
    setIsNavigating(true);
    try {
      navigate(route);
    } catch (error) {
      console.error('Navigation failed:', error);
      setIsNavigating(false);
    }
  }, [navigate, isNavigating]);
  
  // Memoized pathway panels to prevent unnecessary re-renders
  const pathwayPanels = useMemo(() => 
    PATHWAY_CONFIG.map((pathway, index) => (
      <RitualPanel 
        key={pathway.id}
        pathway={pathway}
        index={index}
        isVisible={isVisible}
        isNavigating={isNavigating}
        onSelect={() => handlePathwaySelect(pathway.route)}
      />
    )), 
    [isVisible, isNavigating, handlePathwaySelect]
  );
  
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16">
      <main 
        className={cn(
          'max-w-6xl w-full transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
        role="main"
        aria-label="Pathway selection"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {pathwayPanels}
        </div>
      </main>
    </div>
  );
};

interface RitualPanelProps {
  pathway: typeof PATHWAY_CONFIG[number];
  index: number;
  isVisible: boolean;
  isNavigating: boolean;
  onSelect: () => void;
}

const RitualPanel = ({ 
  pathway, 
  index,
  isVisible,
  isNavigating,
  onSelect 
}: RitualPanelProps) => {
  const styles = COLOR_SCHEMES[pathway.colorScheme];
  const animationDelay = index * 200; // Staggered animation
  
  // Single state for panel visibility with CSS animation delay
  const [panelVisible, setPanelVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setPanelVisible(true), animationDelay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, animationDelay]);
  
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  }, [onSelect]);
  
  return (
    <Card 
      className={cn(
        'bg-navy/50 border border-bronze/30 p-8 rounded-lg',
        'hover:border-bronze/60 hover:bg-navy/70',
        'transition-all duration-500 hover:shadow-lg',
        styles.shadow,
        'flex flex-col h-full cursor-pointer',
        'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-navy',
        pathway.colorScheme === 'teal' ? 'focus-within:ring-teal' : 'focus-within:ring-bronze',
        'transition-all duration-800 ease-out',
        panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      role="button"
      tabIndex={0}
      aria-label={`Select ${pathway.title} pathway`}
      onKeyDown={handleKeyDown}
      onClick={onSelect}
    >
      <h3 
        className={cn(
          'font-montserrat font-black text-2xl md:text-[24px] mb-4',
          styles.title
        )}
      >
        {pathway.title}
      </h3>
      
      <p className="text-moonlight text-lg mb-4 font-medium">
        {pathway.description}
      </p>
      
      <p className="text-moonlight/70 text-[16px] italic mb-8 mt-auto">
        {pathway.subtext}
      </p>
      
      <Button 
        className={cn(
          'mt-auto text-[16px] font-semibold border-2',
          'transition-all duration-300 hover:translate-y-[-3px]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          styles.button,
          styles.buttonShadow,
          'hover:shadow-lg'
        )}
        onClick={(e) => {
          e.stopPropagation(); // Prevent double trigger from card click
          onSelect();
        }}
        disabled={isNavigating}
        aria-label={`${pathway.ctaText} - ${pathway.title}`}
      >
        {isNavigating ? 'Loading...' : pathway.ctaText}
      </Button>
    </Card>
  );
};

export default PathwaySelect;
