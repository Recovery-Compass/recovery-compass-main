
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
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-8 py-20">
      <div 
        className={cn(
          'max-w-4xl w-full transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <RitualPanel 
              title="Environmental Response Design™"
              description="An environmental design optimized for thriving"
              subtext=""
              ctaText="Begin Design"
              colorScheme="gold"
              delay={300}
              onSelect={() => handlePathwaySelect('environmental-design')}
            />
          </div>
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
        'bg-navy/50 border border-bronze/30 p-10 rounded-lg',
        'hover:border-bronze/60 hover:bg-navy/70',
        'transition-all duration-500 hover:shadow-lg',
        colorScheme === 'teal' ? 'hover:shadow-teal/20' : 'hover:shadow-bronze/20',
        'flex flex-col h-full min-h-[280px]',
        'transition-all duration-1200',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
    >
      <h3 className={cn(
        'font-montserrat font-black text-3xl md:text-4xl mb-6 tracking-tight text-center',
        colorScheme === 'teal' ? 'text-teal' : 'text-bronze'
      )}>
        {title}
      </h3>
      
      <p className="text-moonlight text-xl mb-8 font-medium leading-relaxed text-center">
        {description}
      </p>
      
      {subtext && (
        <p className="text-moonlight/70 text-lg italic mb-8 mt-auto leading-relaxed">
          {subtext}
        </p>
      )}
      
      <Button 
        className={cn(
          'mt-auto text-lg font-semibold border-2 py-4 px-8',
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
