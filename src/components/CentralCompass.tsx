
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { PresenceData } from './PresenceDetector';

interface CentralCompassProps {
  presence: PresenceData;
  onCompassActivate: () => void;
  isActivated: boolean;
}

const CentralCompass = ({ presence, onCompassActivate, isActivated }: CentralCompassProps) => {
  const [compassRotation, setCompassRotation] = useState(0);
  const [breathingIntensity, setBreathingIntensity] = useState(1);

  useEffect(() => {
    // Calculate compass needle rotation based on environment affinity
    const rotations = {
      bedroom: 0,
      transportation: 72,
      relationships: 144,
      workspace: 216,
      solitude: 288
    };
    
    const targetRotation = rotations[presence.environmentAffinity as keyof typeof rotations] || 0;
    setCompassRotation(targetRotation);
    
    // Breathing intensity based on presence depth
    setBreathingIntensity(1 + presence.presenceDepth * 0.5);
  }, [presence]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Sacred Geometry Background */}
      <div 
        className={cn(
          'absolute w-96 h-96 transition-all duration-2000',
          isActivated ? 'opacity-20 scale-110' : 'opacity-40 scale-100'
        )}
        style={{
          transform: `scale(${breathingIntensity}) rotate(${compassRotation * 0.1}deg)`,
          filter: `brightness(${1 + presence.presenceDepth * 0.3})`
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Sacred geometry pattern */}
          <defs>
            <radialGradient id="compassGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#148D8D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          
          {/* Outer rings */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="#148D8D" strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#148D8D" strokeWidth="1" opacity="0.5" />
          
          {/* Sacred lines */}
          {[0, 72, 144, 216, 288].map((angle, index) => (
            <line
              key={index}
              x1="200"
              y1="200"
              x2={200 + Math.cos((angle - 90) * Math.PI / 180) * 160}
              y2={200 + Math.sin((angle - 90) * Math.PI / 180) * 160}
              stroke="#D4AF37"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
          
          {/* Center point */}
          <circle cx="200" cy="200" r="8" fill="url(#compassGradient)" />
        </svg>
      </div>

      {/* Breathing Heart / Central Orb */}
      <div
        className={cn(
          'relative w-32 h-32 rounded-full cursor-pointer transition-all duration-700',
          'bg-gradient-to-r from-teal/20 to-bronze/20 border-2 border-teal/40',
          'hover:border-teal/80 hover:shadow-[0_0_40px_rgba(20,141,141,0.4)]',
          isActivated ? 'scale-75 opacity-50' : 'scale-100 opacity-100'
        )}
        style={{
          transform: `scale(${isActivated ? 0.75 : breathingIntensity})`,
          boxShadow: `0 0 ${20 + presence.presenceDepth * 30}px rgba(20,141,141,${0.2 + presence.presenceDepth * 0.3})`
        }}
        onClick={onCompassActivate}
      >
        {/* Compass Needle */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-2000"
          style={{ transform: `rotate(${compassRotation}deg)` }}
        >
          <div className="w-1 h-12 bg-gradient-to-t from-transparent to-bronze rounded-full"></div>
        </div>

        {/* Center activation text */}
        {!isActivated && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-moonlight/70 font-montserrat text-sm opacity-0 hover:opacity-100 transition-opacity duration-500 text-center">
              Start with One Question
            </span>
          </div>
        )}

        {/* Breathing rings */}
        <div 
          className="absolute inset-0 rounded-full border border-bronze/20 animate-gentle-pulse"
          style={{ transform: 'scale(1.2)' }}
        ></div>
        <div 
          className="absolute inset-0 rounded-full border border-teal/15 animate-gentle-pulse"
          style={{ transform: 'scale(1.4)', animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default CentralCompass;
