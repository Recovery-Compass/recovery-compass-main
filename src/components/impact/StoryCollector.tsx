
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface StoryCollectorProps {
  active: boolean;
  onZoneChange: () => void;
  onStoryChange: (story: string) => void;
  presenceDepth: number;
  userEssence: string;
}

const StoryCollector = ({ 
  active,
  onZoneChange,
  onStoryChange,
  presenceDepth,
  userEssence
}: StoryCollectorProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [story, setStory] = useState('');
  const [dwellTime, setDwellTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reveal effect based on presence
  useEffect(() => {
    if (presenceDepth > 0.3 && !isRevealed) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [presenceDepth, isRevealed]);

  // Hover/dwell detection
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

  // Notify parent when story changes
  useEffect(() => {
    onStoryChange(story);
  }, [story, onStoryChange]);

  // Activate zone when dwelled long enough
  useEffect(() => {
    if (dwellTime > 1500 && !active) {
      onZoneChange();
    }
  }, [dwellTime, active, onZoneChange]);

  // Handle textarea changes
  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  // Get placeholder based on user essence
  const getPlaceholderText = () => {
    switch(userEssence) {
      case 'seeker': 
        return "what story needs to be honored...";
      case 'explorer':
        return "share what unfolds in your field...";
      default:
        return "allow the story to emerge here...";
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-1000",
        "p-8 rounded-lg border",
        active ? "border-bronze/40" : "border-teal/10",
        isRevealed ? "opacity-100" : "opacity-0 translate-y-4",
      )}
      onClick={() => {
        onZoneChange();
        textareaRef.current?.focus();
      }}
    >
      {/* Ambient glow */}
      <div 
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-1000 -z-10",
          "bg-gradient-to-b from-bronze/5 to-transparent",
          active ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Pulse indicator */}
      <div 
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6",
          "rounded-full bg-bronze/30 transition-all duration-700",
          active ? "opacity-100 animate-gentle-pulse" : "opacity-0"
        )}
      />
      
      {/* Whisper text */}
      <div 
        className={cn(
          "text-moonlight/60 font-montserrat font-light text-center mb-6",
          "transition-all duration-700",
          active ? "opacity-70" : "opacity-30"
        )}
      >
        {active ? "your offering is received" : "a space for your voice"}
      </div>
      
      {/* Journal-like textarea */}
      <div 
        className={cn(
          "relative bg-navy rounded-md border transition-all duration-500",
          hasFocus ? "border-bronze/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-teal/20"
        )}
      >
        <Textarea
          ref={textareaRef}
          value={story}
          onChange={handleStoryChange}
          onFocus={() => {
            setHasFocus(true);
            onZoneChange();
          }}
          onBlur={() => setHasFocus(false)}
          placeholder={getPlaceholderText()}
          className={cn(
            "min-h-[160px] bg-transparent text-lg resize-none p-4",
            "font-montserrat font-light text-moonlight/90",
            "placeholder:text-moonlight/30 placeholder:font-light placeholder:italic",
            "transition-all duration-700 ease-in-out",
            "focus:outline-none focus:ring-0 border-none",
            active ? "opacity-100" : "opacity-60"
          )}
        />
      </div>
      
      {/* Ambient guidance text */}
      <div 
        className={cn(
          "text-moonlight/40 font-montserrat font-light text-sm italic mt-4 text-right",
          "transition-all duration-700",
          active && story.length > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        the story holds what numbers cannot
      </div>
    </div>
  );
};

export default StoryCollector;
