
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Bed, Car, User } from 'lucide-react';

const CompassCompanion = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [orbVisible, setOrbVisible] = useState(false);
  const [orbClicked, setOrbClicked] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  
  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 800);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 2000);
    const orbTimer = setTimeout(() => setOrbVisible(true), 3500);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(orbTimer);
    };
  }, []);

  const handleOrbClick = () => {
    setOrbClicked(true);
  };

  const handleSpaceSelect = (space: string) => {
    setSelectedSpace(space);
  };

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Compass Tree Overlay */}
      <div className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain" 
           style={{ backgroundImage: 'url(/lovable-uploads/68c39900-fe84-4eac-be73-765984df2867.png)' }}>
      </div>

      {/* Ambient Background */}
      <div className="absolute inset-0">
        {/* Breathing rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full border border-teal/20 animate-[gentle-pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-8 left-8 w-80 h-80 rounded-full border border-bronze/15 animate-[gentle-pulse_12s_ease-in-out_infinite_2s]"></div>
          <div className="absolute top-16 left-16 w-64 h-64 rounded-full border border-teal/10 animate-[gentle-pulse_16s_ease-in-out_infinite_4s]"></div>
        </div>
        
        {/* Ambient particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-bronze/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-teal/40 rounded-full animate-[float_12s_ease-in-out_infinite_3s]"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-bronze/20 rounded-full animate-[float_16s_ease-in-out_infinite_6s]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 
          className={cn(
            'font-montserrat font-black text-4xl md:text-5xl lg:text-6xl text-bronze mb-8',
            'transition-all duration-2000',
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          COMPASS COMPANION
        </h1>
        
        <p 
          className={cn(
            'font-montserrat font-light text-xl md:text-2xl text-moonlight/90 mb-20',
            'transition-all duration-2000 delay-1000',
            subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          Let's begin with your space, not your symptoms.
        </p>

        {/* Main Interaction Orb */}
        {!orbClicked && (
          <div 
            className={cn(
              'relative group cursor-pointer transition-all duration-2000 delay-2500',
              orbVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            )}
            onClick={handleOrbClick}
          >
            <div className="relative">
              <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-teal/20 to-bronze/20 border-2 border-teal/40 flex items-center justify-center group-hover:border-teal/80 transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(20,141,141,0.4)] group-hover:scale-105">
                <span className="text-moonlight font-montserrat font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Start with One Question
                </span>
              </div>
              
              {/* Breathing ring around orb */}
              <div className="absolute inset-0 rounded-full border border-bronze/20 animate-[gentle-pulse_6s_ease-in-out_infinite] scale-110"></div>
            </div>
          </div>
        )}

        {/* Space Selection */}
        {orbClicked && !selectedSpace && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto animate-fade-in">
            <SpaceTile 
              icon={Bed}
              space="bedroom"
              onSelect={handleSpaceSelect}
            />
            <SpaceTile 
              icon={Car}
              space="transportation"
              onSelect={handleSpaceSelect}
            />
            <SpaceTile 
              icon={User}
              space="relationships"
              onSelect={handleSpaceSelect}
            />
          </div>
        )}

        {/* Selected Space Interface */}
        {selectedSpace && (
          <AmbientResponse selectedSpace={selectedSpace} />
        )}
      </div>
    </div>
  );
};

interface SpaceTileProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  space: string;
  onSelect: (space: string) => void;
}

const SpaceTile = ({ icon: Icon, space, onSelect }: SpaceTileProps) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onSelect(space)}
    >
      <div className="w-32 h-32 mx-auto rounded-full bg-navy/50 border border-bronze/30 flex items-center justify-center group-hover:border-bronze/80 group-hover:bg-bronze/10 transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] group-hover:scale-110">
        <Icon size={48} className="text-bronze/70 group-hover:text-bronze transition-colors duration-500" />
      </div>
    </div>
  );
};

const AmbientResponse = ({ selectedSpace }: { selectedSpace: string }) => {
  const [responseVisible, setResponseVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setResponseVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const responses = {
    bedroom: {
      field: "Your sanctuary awaits attention...",
      elements: ["Light patterns shifting", "Sound frequencies adjusting", "Air quality responding"]
    },
    transportation: {
      field: "Movement through space, redefined...",
      elements: ["Route anxiety dissolving", "Travel rhythm harmonizing", "Journey becoming meditation"]
    },
    relationships: {
      field: "Connection patterns emerging...",
      elements: ["Boundary clarity", "Energy exchange balance", "Presence without performance"]
    }
  };

  const response = responses[selectedSpace as keyof typeof responses];

  return (
    <div 
      className={cn(
        'max-w-3xl mx-auto transition-all duration-2000',
        responseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
    >
      <div className="relative bg-navy/30 rounded-lg p-12 border border-teal/20 backdrop-blur-sm">
        <h3 className="text-bronze font-montserrat font-light text-2xl mb-8 text-center italic">
          {response.field}
        </h3>
        
        <div className="space-y-6">
          {response.elements.map((element, index) => (
            <div 
              key={index}
              className={cn(
                'text-moonlight/80 font-montserrat text-lg text-center transition-all duration-1000',
                responseVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}
              style={{ transitionDelay: `${index * 500}ms` }}
            >
              {element}
            </div>
          ))}
        </div>

        {/* Ambient response indicator */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-teal/30 rounded-full animate-gentle-pulse"></div>
      </div>
    </div>
  );
};

export default CompassCompanion;
