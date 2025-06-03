
import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useConversationStore } from '@/stores/conversationStore';
import PresenceDetector, { type PresenceData } from './PresenceDetector';
import AmbientResponseLayer from './AmbientResponseLayer';
import ConversationInterface from './conversation/ConversationInterface';
import CompassReveal from './conversation/CompassReveal';
import TraumaInformedHeader from './conversation/TraumaInformedHeader';
import EnvironmentalAssessmentVR from './compass/EnvironmentalAssessmentVR';
import IntegrationTouchpoints from './compass/IntegrationTouchpoints';

const CompassCompanion = () => {
  const [presence, setPresence] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });
  const [showCompass, setShowCompass] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState<'conversation' | 'vr-assessment'>('conversation');

  const { environmentalInsights, responses, isComplete } = useConversationStore();

  const handlePresenceChange = useCallback((newPresence: PresenceData) => {
    setPresence(newPresence);
  }, []);

  const handleConversationComplete = () => {
    setShowCompass(true);
  };

  const handleModeSwitch = (mode: 'conversation' | 'vr-assessment') => {
    setAssessmentMode(mode);
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
                <div key="main-interface">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <h1 className="font-montserrat font-black text-3xl md:text-4xl lg:text-5xl text-bronze mb-6 transition-all duration-2000 animate-fade-in">
                      COMPASS COMPANION
                    </h1>
                    
                    <p className="font-montserrat font-light text-lg md:text-xl text-moonlight/90 mb-8 transition-all duration-2000 delay-1000 animate-fade-in">
                      Explore environmental spaces through conversation or immersive assessment
                    </p>

                    {/* Mode Selector */}
                    <div className="flex justify-center gap-4 mb-8">
                      <button
                        onClick={() => handleModeSwitch('conversation')}
                        className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                          assessmentMode === 'conversation'
                            ? 'bg-teal text-navy shadow-lg'
                            : 'bg-navy/40 text-moonlight/70 border border-teal/30 hover:border-teal/60'
                        }`}
                      >
                        Gentle Conversation
                      </button>
                      <button
                        onClick={() => handleModeSwitch('vr-assessment')}
                        className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                          assessmentMode === 'vr-assessment'
                            ? 'bg-teal text-navy shadow-lg'
                            : 'bg-navy/40 text-moonlight/70 border border-teal/30 hover:border-teal/60'
                        }`}
                      >
                        VR Environment
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Interface */}
                  <div className="bg-navy/40 backdrop-blur-sm border border-teal/20 rounded-lg p-6 md:p-8">
                    {assessmentMode === 'conversation' ? (
                      <ConversationInterface onComplete={handleConversationComplete} />
                    ) : (
                      <EnvironmentalAssessmentVR onComplete={handleConversationComplete} />
                    )}
                  </div>

                  {/* Integration Touchpoints */}
                  <IntegrationTouchpoints />

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
