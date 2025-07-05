
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const PathwaySelect = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePathwaySelect = (pathway: string) => {
    navigate(`/${pathway.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 py-16">
      <div 
        className={cn(
          'max-w-6xl w-full transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Compass Companion Panel */}
          <RitualPanel 
            title="Compass Companion"
            description="No diagnosis. No intake. Just space to begin, on your terms."
            subtext="This isn't treatment. This is restoration."
            ctaText="Enter Companion"
            colorScheme="teal"
            delay={300}
            onSelect={() => handlePathwaySelect('compass-companion')}
          />

          {/* Impact Translator Panel */}
          <RitualPanel 
            title="Impact Translator"
            description="You keep caring. I'll make sure your story gets funded."
            subtext="Built for people like Randall — who give shoes to foster kids, not spreadsheets to grant panels."
            ctaText="Launch Translator"
            colorScheme="gold"
            delay={500}
            onSelect={() => handlePathwaySelect('impact-translator')}
          />
        </div>
      </div>
    </div>
  );
};

interface RitualPanelProps {
  title: string;
  description: string;
  subtext: string;
  ctaText: string;
  colorScheme: 'teal' | 'gold';
  delay: number;
  onSelect: () => void;
}

const RitualPanel = ({ 
  title, 
  description, 
  subtext, 
  ctaText, 
  colorScheme,
  delay,
  onSelect 
}: RitualPanelProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <Card 
      className={cn(
        'bg-navy/50 border border-bronze/30 p-8 rounded-lg',
        'hover:border-bronze/60 hover:bg-navy/70',
        'transition-all duration-500 hover:shadow-lg',
        colorScheme === 'teal' ? 'hover:shadow-teal/20' : 'hover:shadow-bronze/20',
        'flex flex-col h-full',
        'transition-all duration-1200',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
    >
      <h3 className={cn(
        'font-montserrat font-black text-2xl md:text-[24px] mb-4',
        colorScheme === 'teal' ? 'text-teal' : 'text-bronze'
      )}>
        {title}
      </h3>
      
      <p className="text-moonlight text-lg mb-4 font-medium">
        {description}
      </p>
      
      <p className="text-moonlight/70 text-[16px] italic mb-8 mt-auto">
        {subtext}
      </p>
      
      <Button 
        className={cn(
          'mt-auto text-[16px] font-semibold border-2',
          'transition-all duration-300 hover:translate-y-[-3px]',
          colorScheme === 'teal' 
            ? 'border-teal text-teal hover:bg-teal hover:text-navy' 
            : 'border-bronze text-bronze hover:bg-bronze hover:text-navy',
          colorScheme === 'teal' ? 'hover:shadow-teal/30' : 'hover:shadow-bronze/30',
          'hover:shadow-lg'
        )}
        onClick={onSelect}
      >
        {ctaText}
      </Button>
    </Card>
  );
};

export default PathwaySelect;
