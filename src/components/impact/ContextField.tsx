
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ContextFieldProps {
  active: boolean;
  onZoneChange: () => void;
  onContextChange: (context: Record<string, string>) => void;
  presenceDepth: number;
  thresholdCrossed: boolean;
}

const ContextField = ({
  active,
  onZoneChange,
  onContextChange,
  presenceDepth,
  thresholdCrossed
}: ContextFieldProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [petalStage, setPetalStage] = useState(0);
  const [dwellTime, setDwellTime] = useState(0);
  const [context, setContext] = useState<Record<string, string>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Bloom phases for the petals
  const petalQuestions = [
    "what environment surrounds this work",
    "who does it serve but remains unseen",
    "what systems resist this transformation"
  ];

  // Reveal effect based on threshold crossing and presence
  useEffect(() => {
    if (thresholdCrossed && presenceDepth > 0.5 && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [thresholdCrossed, presenceDepth, isRevealed]);

  // Hover/dwell detection for activation
  useEffect(() => {
    const startDwellTimer = () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
      
      dwellTimerRef.current = setInterval(() => {
        setDwellTime(prev => prev + 100);
      }, 100);
    };
    
    const stopDwellTimer = () => {
      if (dwellTimerRef.current) {
        clearInterval(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', startDwellTimer);
      container.addEventListener('mouseleave', stopDwellTimer);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', startDwellTimer);
        container.removeEventListener('mouseleave', stopDwellTimer);
      }
      stopDwellTimer();
    };
  }, []);

  // Activate zone when dwelled long enough
  useEffect(() => {
    if (dwellTime > 2000 && !active) {
      onZoneChange();
    }
  }, [dwellTime, active, onZoneChange]);

  // Bloom petals progressively
  useEffect(() => {
    if (active && petalStage < petalQuestions.length) {
      const timer = setTimeout(() => {
        setPetalStage(prev => prev + 1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active, petalStage, petalQuestions.length]);

  // Notify parent when context changes
  useEffect(() => {
    onContextChange(context);
  }, [context, onContextChange]);

  // Update context field
  const updateContext = (index: number, value: string) => {
    setContext(prev => ({
      ...prev,
      [petalQuestions[index]]: value
    }));
  };

  if (!isRevealed) return null;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-2000",
        "opacity-100"
      )}
      onClick={() => onZoneChange()}
    >
      {/* Central bloom */}
      <div 
        className={cn(
          "p-8 rounded-full w-24 h-24 mx-auto",
          "flex items-center justify-center",
          "border transition-all duration-1000",
          active ? "border-bronze/40" : "border-teal/20",
          active && "shadow-[0_0_20px_rgba(20,141,141,0.15)]"
        )}
      >
        <div 
          className={cn(
            "w-12 h-12 rounded-full transition-all duration-700",
            "bg-gradient-to-br from-teal/20 to-bronze/10",
            active ? "opacity-80" : "opacity-30",
            active && "animate-gentle-pulse"
          )}
        />
      </div>
      
      {/* Context whisper */}
      <div 
        className={cn(
          "text-moonlight/60 font-montserrat font-light text-center mt-6",
          "transition-all duration-700",
          active ? "opacity-70" : "opacity-30"
        )}
      >
        {active ? "the field of your work" : "context will emerge"}
      </div>
      
      {/* Petal container */}
      <div className="relative mt-10 h-60">
        {petalQuestions.map((question, index) => {
          const isVisible = petalStage > index;
          const angle = (index * (360 / petalQuestions.length)) - 90; // Position around the circle
          const radians = angle * Math.PI / 180;
          const distance = 140; // Distance from center
          
          // Calculate position on the circle
          const left = `calc(50% + ${Math.cos(radians) * distance}px)`;
          const top = `calc(50% + ${Math.sin(radians) * distance}px)`;
          
          return (
            <div
              key={index}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2",
                "w-60 transition-all duration-2000",
                isVisible ? "opacity-100" : "opacity-0 scale-90"
              )}
              style={{
                left,
                top,
                transitionDelay: `${index * 300}ms`
              }}
            >
              {/* Petal */}
              <div 
                className={cn(
                  "p-4 rounded-lg border bg-navy/80 backdrop-blur-sm",
                  "transition-all duration-700",
                  active ? "border-teal/40" : "border-teal/10"
                )}
              >
                {/* Question */}
                <div className="text-moonlight/70 font-montserrat font-light text-sm italic mb-3">
                  {question}
                </div>
                
                {/* Input */}
                <input
                  type="text"
                  value={context[question] || ''}
                  onChange={e => updateContext(index, e.target.value)}
                  className={cn(
                    "w-full bg-transparent border-b border-teal/20",
                    "font-montserrat font-light text-moonlight/90 text-sm",
                    "py-2 px-1 focus:outline-none focus:border-bronze/30",
                    "transition-colors duration-500"
                  )}
                  placeholder="reflect here..."
                />
              </div>
            </div>
          );
        })}
        
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-teal/10" />
      </div>
      
      {/* Opening guidance */}
      <div 
        className={cn(
          "text-moonlight/40 font-montserrat font-light text-sm italic text-center mt-6",
          "transition-opacity duration-700",
          active && petalStage > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        each reflection opens new understanding
      </div>
    </div>
  );
};

export default ContextField;
