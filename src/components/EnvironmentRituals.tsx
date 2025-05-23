
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bed, Car, User } from 'lucide-react';
import type { PresenceData } from './PresenceDetector';

interface EnvironmentRitualsProps {
  presence: PresenceData;
  onEnvironmentSelect: (environment: string) => void;
  isVisible: boolean;
}

const EnvironmentRituals = ({ presence, onEnvironmentSelect, isVisible }: EnvironmentRitualsProps) => {
  const [hoveredEnvironment, setHoveredEnvironment] = useState<string | null>(null);
  const [hoverStartTime, setHoverStartTime] = useState<number>(0);

  const environments = [
    { 
      id: 'bedroom', 
      icon: Bed, 
      name: 'Sanctuary Space',
      position: { top: '20%', left: '20%' },
      ritual: 'Rest & Restoration'
    },
    { 
      id: 'transportation', 
      icon: Car, 
      name: 'Movement Flow',
      position: { top: '20%', right: '20%' },
      ritual: 'Journey Harmony'
    },
    { 
      id: 'relationships', 
      icon: User, 
      name: 'Connection Field',
      position: { bottom: '30%', left: '15%' },
      ritual: 'Presence Exchange'
    },
    { 
      id: 'workspace', 
      icon: User, // Using User as placeholder since we don't have Monitor icon
      name: 'Creation Zone',
      position: { bottom: '30%', right: '15%' },
      ritual: 'Focus Cultivation'
    },
    { 
      id: 'solitude', 
      icon: User, // Using User as placeholder
      name: 'Inner Compass',
      position: { top: '60%', left: '50%', transform: 'translateX(-50%)' },
      ritual: 'Deep Listening'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (hoveredEnvironment && hoverStartTime) {
      timer = setTimeout(() => {
        if (hoveredEnvironment) {
          onEnvironmentSelect(hoveredEnvironment);
        }
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hoveredEnvironment, hoverStartTime, onEnvironmentSelect]);

  const handleEnvironmentHover = (environmentId: string) => {
    setHoveredEnvironment(environmentId);
    setHoverStartTime(Date.now());
  };

  const handleEnvironmentLeave = () => {
    setHoveredEnvironment(null);
    setHoverStartTime(0);
  };

  const handleEnvironmentClick = (environmentId: string) => {
    onEnvironmentSelect(environmentId);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {environments.map((environment, index) => {
        const isAffinity = presence.environmentAffinity === environment.id;
        const isHovered = hoveredEnvironment === environment.id;
        
        return (
          <div
            key={environment.id}
            className={cn(
              'absolute pointer-events-auto transition-all duration-1000 cursor-pointer',
              'animate-fade-in'
            )}
            style={{
              ...environment.position,
              animationDelay: `${index * 200}ms`
            }}
            onMouseEnter={() => handleEnvironmentHover(environment.id)}
            onMouseLeave={handleEnvironmentLeave}
            onClick={() => handleEnvironmentClick(environment.id)}
          >
            {/* Environment Tile */}
            <div
              className={cn(
                'relative w-24 h-24 rounded-full transition-all duration-700',
                'bg-navy/50 border border-bronze/30 flex items-center justify-center',
                'hover:border-bronze/80 hover:bg-bronze/10 hover:scale-110',
                isAffinity && 'border-teal/60 bg-teal/5',
                isHovered && 'shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-110'
              )}
            >
              <environment.icon 
                size={32} 
                className={cn(
                  'transition-colors duration-500',
                  isAffinity ? 'text-teal' : 'text-bronze/70',
                  isHovered && 'text-bronze'
                )}
              />

              {/* Hover progress ring */}
              {isHovered && (
                <div className="absolute inset-0 rounded-full">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      className="animate-[draw-circle_2s_linear_forwards]"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Ritual Name */}
            {isHovered && (
              <div 
                className={cn(
                  'absolute top-full mt-4 left-1/2 transform -translate-x-1/2',
                  'text-bronze font-montserrat text-sm text-center',
                  'animate-fade-in whitespace-nowrap'
                )}
              >
                <div className="font-light">{environment.name}</div>
                <div className="font-light italic text-xs text-moonlight/70 mt-1">
                  {environment.ritual}
                </div>
              </div>
            )}

            {/* Affinity glow */}
            {isAffinity && (
              <div className="absolute inset-0 rounded-full border border-teal/30 animate-gentle-pulse scale-125"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EnvironmentRituals;
