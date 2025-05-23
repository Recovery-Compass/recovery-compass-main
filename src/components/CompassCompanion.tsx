
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Bed, Car, Computer } from 'lucide-react';

const CompassCompanion = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtextVisible, setSubtextVisible] = useState(false);
  const [orbVisible, setOrbVisible] = useState(false);
  const [orbClicked, setOrbClicked] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  
  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 500);
    const subtextTimer = setTimeout(() => setSubtextVisible(true), 1500);
    const orbTimer = setTimeout(() => setOrbVisible(true), 3000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtextTimer);
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
      {/* Ambient Background */}
      <div className="absolute inset-0">
        {/* Breathing rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full border border-teal/20 animate-[gentle-pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-8 left-8 w-80 h-80 rounded-full border border-bronze/15 animate-[gentle-pulse_8s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-16 left-16 w-64 h-64 rounded-full border border-teal/10 animate-[gentle-pulse_10s_ease-in-out_infinite_2s]"></div>
        </div>
        
        {/* Ambient particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-bronze/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-teal/40 rounded-full animate-[float_8s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-bronze/20 rounded-full animate-[float_12s_ease-in-out_infinite_4s]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <h1 
          className={cn(
            'font-montserrat font-black text-4xl md:text-5xl text-bronze mb-6',
            'transition-all duration-2000',
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          COMPASS COMPANION
        </h1>
        
        <p 
          className={cn(
            'font-montserrat font-light italic text-xl md:text-2xl text-moonlight/80 mb-16',
            'transition-all duration-2000 delay-1000',
            subtextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          This isn't treatment. This is environment design.
        </p>

        {/* Main Interaction Orb */}
        {!orbClicked && (
          <div 
            className={cn(
              'relative group cursor-pointer transition-all duration-2000 delay-2000',
              orbVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            )}
            onClick={handleOrbClick}
          >
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-teal/20 to-bronze/20 border-2 border-teal/40 flex items-center justify-center group-hover:border-teal/70 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(20,141,141,0.3)]">
                <span className="text-moonlight font-montserrat font-medium text-lg">Start</span>
              </div>
              
              {/* Hover reveal */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-moonlight/70 font-montserrat italic text-center whitespace-nowrap">
                  Where do you feel most overwhelmed right now?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Space Selection */}
        {orbClicked && !selectedSpace && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto animate-fade-in">
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
              icon={Computer}
              space="workplace"
              onSelect={handleSpaceSelect}
            />
          </div>
        )}

        {/* Room Map Interface */}
        {selectedSpace === 'bedroom' && (
          <BedroomMap />
        )}
        
        {selectedSpace === 'transportation' && (
          <TransportationMap />
        )}
        
        {selectedSpace === 'workplace' && (
          <WorkplaceMap />
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
      <div className="w-24 h-24 mx-auto rounded-full bg-navy/50 border border-bronze/30 flex items-center justify-center group-hover:border-bronze/70 group-hover:bg-bronze/10 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
        <Icon size={32} className="text-bronze/70 group-hover:text-bronze transition-colors duration-500" />
      </div>
    </div>
  );
};

const BedroomMap = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="relative bg-navy/30 rounded-lg p-8 border border-teal/20">
        {/* Room visualization */}
        <div className="relative w-full h-64 bg-navy/50 rounded border border-moonlight/10">
          {/* Pressure zones */}
          <div 
            className="absolute top-4 right-4 w-16 h-12 bg-bronze/20 rounded cursor-pointer hover:bg-bronze/30 transition-colors duration-300"
            onClick={() => setSelectedZone('light')}
            title="Lighting"
          ></div>
          <div 
            className="absolute bottom-4 left-4 w-20 h-16 bg-teal/20 rounded cursor-pointer hover:bg-teal/30 transition-colors duration-300"
            onClick={() => setSelectedZone('sound')}
            title="Sound Environment"
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-bronze/30 rounded-full cursor-pointer hover:bg-bronze/40 transition-colors duration-300"
            onClick={() => setSelectedZone('scent')}
            title="Scent & Air"
          ></div>
        </div>
        
        {/* Environmental suggestions */}
        {selectedZone && (
          <div className="mt-6 p-4 bg-teal/10 rounded border border-teal/20 animate-fade-in">
            <EnvironmentalSuggestion zone={selectedZone} />
          </div>
        )}
      </div>
    </div>
  );
};

const TransportationMap = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="relative bg-navy/30 rounded-lg p-8 border border-teal/20 text-center">
        <div className="text-moonlight/70 font-montserrat italic">
          Transportation environment design coming soon...
        </div>
      </div>
    </div>
  );
};

const WorkplaceMap = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="relative bg-navy/30 rounded-lg p-8 border border-teal/20 text-center">
        <div className="text-moonlight/70 font-montserrat italic">
          Workplace environment design coming soon...
        </div>
      </div>
    </div>
  );
};

const EnvironmentalSuggestion = ({ zone }: { zone: string }) => {
  const suggestions = {
    light: "Consider warm, dimmable lighting. Natural light cycles support your body's rhythm.",
    sound: "White noise or nature sounds can create psychological safety. Silence has its own power too.",
    scent: "Lavender, vanilla, or cedar can shift your nervous system. What feels like safety to you?"
  };
  
  return (
    <p className="text-moonlight/80 font-montserrat font-light">
      {suggestions[zone as keyof typeof suggestions]}
    </p>
  );
};

export default CompassCompanion;
