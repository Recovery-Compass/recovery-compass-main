
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import StoryCollector from '@/components/impact/StoryCollector';
import DataOffering from '@/components/impact/DataOffering';
import ContextField from '@/components/impact/ContextField';
import PresenceDetector from '@/components/PresenceDetector';
import type { PresenceData } from '@/components/PresenceDetector';
import AmbientParticles from '@/components/impact/AmbientParticles';

const ImpactTranslator = () => {
  // Presence and threshold states
  const [isVisible, setIsVisible] = useState(false);
  const [presenceData, setPresenceData] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [thresholdCrossed, setThresholdCrossed] = useState(false);
  
  // Refs for scroll position tracking
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Data states (invisible to user)
  const [storyInput, setStoryInput] = useState('');
  const [dataUpload, setDataUpload] = useState<File | null>(null);
  const [programContext, setProgramContext] = useState<Record<string, string>>({});
  
  // Ambient timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Presence threshold monitoring
  useEffect(() => {
    if (presenceData.presenceDepth > 0.6 && !thresholdCrossed) {
      setThresholdCrossed(true);
    }
  }, [presenceData.presenceDepth, thresholdCrossed]);

  // Handle presence changes
  const handlePresenceChange = (presence: PresenceData) => {
    setPresenceData(presence);
  };

  // Handle zone focus/activation
  const handleZoneChange = (zone: string | null) => {
    setActiveZone(zone);
  };

  return (
    <PresenceDetector onPresenceChange={handlePresenceChange}>
      <div 
        ref={containerRef}
        className="min-h-screen bg-navy overflow-hidden relative flex items-center justify-center"
      >
        {/* Ambient visual layer */}
        <AmbientParticles presenceDepth={presenceData.presenceDepth} />
        
        {/* Sacred overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-[radial-gradient(circle,rgba(20,141,141,0.05)_0%,rgba(26,31,46,0.8)_70%)]",
            "pointer-events-none"
          )} 
        />
        
        {/* Threshold content */}
        <div 
          className={cn(
            "relative z-10 max-w-4xl w-full px-8",
            "transition-all duration-2000 ease-in-out",
            isVisible ? "opacity-100" : "opacity-0",
            thresholdCrossed ? "scale-100" : "scale-98"
          )}
        >
          {/* Title as whisper */}
          <h1 
            className={cn(
              "text-bronze opacity-70 text-center mb-16 font-montserrat font-light tracking-widest",
              "transition-all duration-3000",
              thresholdCrossed ? "opacity-100" : "opacity-40"
            )}
          >
            impact translator
          </h1>
          
          {/* Sacred ritual spaces */}
          <div className="grid gap-24">
            {/* Story collection ritual space */}
            <StoryCollector 
              active={activeZone === 'story'} 
              onZoneChange={() => handleZoneChange('story')}
              onStoryChange={setStoryInput}
              presenceDepth={presenceData.presenceDepth}
              userEssence={presenceData.userEssence}
            />
            
            {/* Data offering ritual space */}
            <DataOffering
              active={activeZone === 'data'} 
              onZoneChange={() => handleZoneChange('data')}
              onDataChange={setDataUpload}
              presenceDepth={presenceData.presenceDepth}
            />
            
            {/* Context building ritual space */}
            <ContextField
              active={activeZone === 'context'} 
              onZoneChange={() => handleZoneChange('context')}
              onContextChange={setProgramContext}
              presenceDepth={presenceData.presenceDepth}
              thresholdCrossed={thresholdCrossed}
            />
          </div>
        </div>
      </div>
    </PresenceDetector>
  );
};

export default ImpactTranslator;
