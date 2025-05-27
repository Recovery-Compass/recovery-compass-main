
import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useConversationStore } from '@/stores/conversationStore';
import PresenceDetector, { type PresenceData } from './PresenceDetector';
import AmbientResponseLayer from './AmbientResponseLayer';
import ConversationInterface from './conversation/ConversationInterface';
import CompassReveal from './conversation/CompassReveal';
import TraumaInformedHeader from './conversation/TraumaInformedHeader';

const CompassCompanion = () => {
  const [presence, setPresence] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });
  const [showCompass, setShowCompass] = useState(false);

  const { environmentalInsights, responses, isComplete } = useConversationStore();

  const handlePresenceChange = useCallback((newPresence: PresenceData) => {
    setPresence(newPresence);
  }, []);

  const handleConversationComplete = () => {
    setShowCompass(true);
  };

  return (
    <PresenceDetector onPresenceChange={handlePresenceChange}>
      <div className="min-h-screen bg-navy relative overflow-hidden">
        {/* Compass Tree Overlay */}
        <div 
          className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain" 
          style={{ backgroundImage: 'url(/lovable-uploads/68c39900-fe84-4eac-be73-765984df2867.png)' }}
        />

        {/* Trauma-Informed Header */}
        <TraumaInformedHeader />

        {/* Ambient Response Layer */}
        <AmbientResponseLayer 
          presence={presence} 
          selectedEnvironment={undefined} 
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <div className="w-full max-w-6xl">
            <AnimatePresence mode="wait">
              {!showCompass ? (
                <div key="conversation">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <h1 className="font-montserrat font-black text-3xl md:text-4xl lg:text-5xl text-bronze mb-6 transition-all duration-2000 animate-fade-in">
                      COMPASS COMPANION
                    </h1>
                    
                    <p className="font-montserrat font-light text-lg md:text-xl text-moonlight/90 mb-8 transition-all duration-2000 delay-1000 animate-fade-in">
                      Let's explore the spaces that shape your world, one conversation at a time.
                    </p>
                  </div>

                  {/* Conversation Interface */}
                  <div className="bg-navy/40 backdrop-blur-sm border border-teal/20 rounded-lg p-6 md:p-8">
                    <ConversationInterface onComplete={handleConversationComplete} />
                  </div>

                  {/* Footer Note */}
                  <div className="text-center mt-8">
                    <p className="text-moonlight/60 font-montserrat text-sm italic">
                      This is a space for understanding, not assessment. 
                      Share only what feels comfortable to you.
                    </p>
                  </div>
                </div>
              ) : (
                <div key="compass">
                  <CompassReveal
                    insights={environmentalInsights}
                    conversationStory={responses}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PresenceDetector>
  );
};

export default CompassCompanion;
