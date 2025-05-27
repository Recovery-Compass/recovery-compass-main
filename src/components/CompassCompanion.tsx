
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import PresenceDetector, { type PresenceData } from './PresenceDetector';
import AmbientResponseLayer from './AmbientResponseLayer';
import AdaptiveConversation from './conversation/AdaptiveConversation';

const CompassCompanion = () => {
  const [presence, setPresence] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });

  const handlePresenceChange = useCallback((newPresence: PresenceData) => {
    setPresence(newPresence);
  }, []);

  const handleQuickExit = () => {
    // Trauma-informed quick exit - redirect to a safe page
    window.location.href = 'https://www.google.com';
  };

  return (
    <PresenceDetector onPresenceChange={handlePresenceChange}>
      <div className="min-h-screen bg-navy relative overflow-hidden">
        {/* Compass Tree Overlay */}
        <div 
          className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain" 
          style={{ backgroundImage: 'url(/lovable-uploads/68c39900-fe84-4eac-be73-765984df2867.png)' }}
        />

        {/* Quick Exit Button - Trauma Informed */}
        <Button
          onClick={handleQuickExit}
          className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white font-montserrat font-semibold px-4 py-2 text-sm"
        >
          Exit Safely
        </Button>

        {/* Ambient Response Layer */}
        <AmbientResponseLayer 
          presence={presence} 
          selectedEnvironment={undefined} 
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 
                className={cn(
                  'font-montserrat font-black text-3xl md:text-4xl lg:text-5xl text-bronze mb-6',
                  'transition-all duration-2000 animate-fade-in'
                )}
              >
                COMPASS COMPANION
              </h1>
              
              <p 
                className={cn(
                  'font-montserrat font-light text-lg md:text-xl text-moonlight/90 mb-8',
                  'transition-all duration-2000 delay-1000 animate-fade-in'
                )}
              >
                Let's explore the spaces that shape your world, one conversation at a time.
              </p>
            </div>

            {/* Conversation Interface */}
            <div className="bg-navy/40 backdrop-blur-sm border border-teal/20 rounded-lg p-6 md:p-8">
              <AdaptiveConversation />
            </div>

            {/* Footer Note */}
            <div className="text-center mt-8">
              <p className="text-moonlight/60 font-montserrat text-sm italic">
                This is a space for understanding, not assessment. 
                Share only what feels comfortable to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PresenceDetector>
  );
};

export default CompassCompanion;
