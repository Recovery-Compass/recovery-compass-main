
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import PresenceDetector, { type PresenceData } from './PresenceDetector';
import CentralCompass from './CentralCompass';
import EnvironmentRituals from './EnvironmentRituals';
import AmbientResponseLayer from './AmbientResponseLayer';

const CompassCompanion = () => {
  const [presence, setPresence] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });
  
  const [compassActivated, setCompassActivated] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);

  const handlePresenceChange = useCallback((newPresence: PresenceData) => {
    setPresence(newPresence);
  }, []);

  const handleCompassActivate = () => {
    setCompassActivated(true);
  };

  const handleEnvironmentSelect = (environment: string) => {
    setSelectedEnvironment(environment);
  };

  return (
    <PresenceDetector onPresenceChange={handlePresenceChange}>
      <div className="min-h-screen bg-navy relative overflow-hidden flex flex-col items-center justify-center">
        {/* Compass Tree Overlay */}
        <div 
          className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain" 
          style={{ backgroundImage: 'url(/lovable-uploads/68c39900-fe84-4eac-be73-765984df2867.png)' }}
        />

        {/* Ambient Response Layer */}
        <AmbientResponseLayer 
          presence={presence} 
          selectedEnvironment={selectedEnvironment || undefined} 
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          {/* Title */}
          <h1 
            className={cn(
              'font-montserrat font-black text-4xl md:text-5xl lg:text-6xl text-bronze mb-8',
              'transition-all duration-2000 animate-fade-in'
            )}
          >
            COMPASS COMPANION
          </h1>
          
          {/* Subtitle */}
          <p 
            className={cn(
              'font-montserrat font-light text-xl md:text-2xl text-moonlight/90 mb-20',
              'transition-all duration-2000 delay-1000 animate-fade-in'
            )}
          >
            Let's begin with your space, not your symptoms.
          </p>

          {/* Central Compass */}
          <div className="relative mb-20">
            <CentralCompass
              presence={presence}
              onCompassActivate={handleCompassActivate}
              isActivated={compassActivated}
            />
          </div>

          {/* Environment Rituals */}
          <div className="relative w-full h-96">
            <EnvironmentRituals
              presence={presence}
              onEnvironmentSelect={handleEnvironmentSelect}
              isVisible={compassActivated}
            />
          </div>

          {/* Selected Environment Response */}
          {selectedEnvironment && (
            <div 
              className={cn(
                'max-w-3xl mx-auto mt-16 transition-all duration-2000 animate-fade-in',
                'bg-navy/30 rounded-lg p-8 border border-teal/20 backdrop-blur-sm'
              )}
            >
              <h3 className="text-bronze font-montserrat font-light text-2xl mb-4 text-center italic">
                Environmental field: {selectedEnvironment}
              </h3>
              
              <div className="text-moonlight/80 font-montserrat text-lg text-center">
                Space reconfiguring to your presence...
              </div>

              {/* Ambient response indicator */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal/30 rounded-full animate-gentle-pulse" />
            </div>
          )}
        </div>
      </div>
    </PresenceDetector>
  );
};

export default CompassCompanion;
