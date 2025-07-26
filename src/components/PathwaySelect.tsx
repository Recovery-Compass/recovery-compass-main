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
    <div className="min-h-screen bg-gradient-to-b from-deep-ocean to-midnight-foundation flex flex-col items-center justify-center px-8 py-20">
      <div 
        className={cn(
          'max-w-4xl w-full transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-black text-4xl md:text-5xl text-moonlight mb-6">
            Your Safe Space Journey Begins Here
          </h1>
          <p className="font-montserrat text-xl text-moonlight/80 max-w-2xl mx-auto">
            You deserve an environment that sees you, supports you, and adapts to your needs.
          </p>
        </div>

        {/* Memorial Quote */}
        <blockquote className="text-center mb-16 font-montserrat">
          <p className="text-2xl text-bronze italic">
            "The magic happens when someone feels safe enough to stop defending and start discovering."
          </p>
          <cite className="text-moonlight/60 text-sm mt-4 block">
            In loving memory of a mother who created infinite safe spaces • April 4, 2025
          </cite>
        </blockquote>

        {/* Safe Space Card */}
        <Card className="bg-navy/50 backdrop-blur border border-bronze/30 p-10 rounded-2xl max-w-2xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl text-bronze mb-6 text-center">
            What Happens Next?
          </h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✨</span>
              <p className="text-moonlight text-lg">We learn about your unique needs and challenges</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🌟</span>
              <p className="text-moonlight text-lg">We identify environmental factors affecting your recovery</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💫</span>
              <p className="text-moonlight text-lg">We create a personalized safe space blueprint</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🌱</span>
              <p className="text-moonlight text-lg">Your transformation begins in an environment designed for YOU</p>
            </div>
          </div>

          <p className="text-moonlight/70 text-sm text-center mb-8 italic">
            Using our proprietary Environmental Response Design™ methodology
          </p>

          <Button 
            className="w-full text-lg font-semibold border-2 border-bronze text-bronze hover:bg-bronze hover:text-navy py-6"
            onClick={() => navigate('/environmental-design')}
          >
            Start My Safe Space Assessment
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PathwaySelect;