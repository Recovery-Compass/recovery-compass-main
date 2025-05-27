import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import PresenceDetector, { type PresenceData } from './PresenceDetector';
import AmbientResponseLayer from './AmbientResponseLayer';
import InteractiveCompass3D from './InteractiveCompass3D';
import EnvironmentalDetailPanel from './EnvironmentalDetailPanel';
import { type EnvironmentalVector } from './compass/types';

const CompassCompanion = () => {
  const [presence, setPresence] = useState<PresenceData>({
    presenceDepth: 0,
    pausePatterns: [],
    userEssence: 'wanderer',
    environmentAffinity: 'bedroom'
  });
  
  const [selectedVector, setSelectedVector] = useState<EnvironmentalVector | null>(null);

  const handlePresenceChange = useCallback((newPresence: PresenceData) => {
    setPresence(newPresence);
  }, []);

  const handleVectorClick = (vector: EnvironmentalVector) => {
    setSelectedVector(vector);
  };

  const handleCloseDetailPanel = () => {
    setSelectedVector(null);
  };

  const handleQuickExit = () => {
    // Trauma-informed quick exit - could redirect to a safe page
    window.location.href = 'https://www.google.com';
  };

  return (
    <PresenceDetector onPresenceChange={handlePresenceChange}>
      <div className="min-h-screen bg-navy relative overflow-hidden flex flex-col items-center justify-center">
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

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl px-6 w-full">
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
              'font-montserrat font-light text-xl md:text-2xl text-moonlight/90 mb-12',
              'transition-all duration-2000 delay-1000 animate-fade-in'
            )}
          >
            Let's begin with your space, not your symptoms.
          </p>

          {/* Instructions */}
          <div className="mb-8">
            <p className="text-moonlight/70 font-montserrat text-lg mb-4">
              Your environmental compass shows 8 key factors affecting your recovery space.
            </p>
            <p className="text-moonlight/60 font-montserrat text-sm">
              Click on any vector to explore detailed insights and support options.
            </p>
          </div>

          {/* Interactive 3D Compass */}
          <div className="relative mb-12">
            <InteractiveCompass3D
              onVectorClick={handleVectorClick}
              selectedVector={selectedVector}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-moonlight/70 text-sm">Low Risk</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-moonlight/70 text-sm">Medium Risk</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-moonlight/70 text-sm">High Risk</span>
            </div>
          </div>
        </div>

        {/* Environmental Detail Panel */}
        <EnvironmentalDetailPanel
          vector={selectedVector}
          onClose={handleCloseDetailPanel}
        />
      </div>
    </PresenceDetector>
  );
};

export default CompassCompanion;
