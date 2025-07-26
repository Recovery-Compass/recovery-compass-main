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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2332] to-[#0f1419] flex flex-col items-center justify-center px-8">
      <div 
        className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <h1 className="font-montserrat font-black text-white text-5xl text-center mb-16">
          Your Journey Begins Here
        </h1>
        
        <p className="font-montserrat text-white/70 text-xl text-center mb-20 max-w-2xl mx-auto">
          A personalized path to recovery, designed for you.
        </p>
        
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black font-semibold px-12 py-4"
            onClick={() => navigate('/environmental-design')}
          >
            Begin Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PathwaySelect;