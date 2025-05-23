
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ImpactTranslator = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6">
      <div 
        className={cn(
          'max-w-2xl w-full transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <h1 className="text-bronze text-center mb-8">IMPACT TRANSLATOR</h1>
        <p className="text-moonlight text-xl text-center">
          Transform your story into data that funders understand.
        </p>
        
        <div className="mt-16 text-center text-moonlight/70">
          <p>Impact Translator coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactTranslator;
