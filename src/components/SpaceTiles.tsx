
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bed, Car, User } from 'lucide-react';
import type { PresenceData } from './PresenceDetector';

interface SpaceTilesProps {
  presence: PresenceData;
  onSpaceSelect: (space: string) => void;
  isVisible: boolean;
}

const SpaceTiles = ({ presence, onSpaceSelect, isVisible }: SpaceTilesProps) => {
  const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);
  const [hoverStartTime, setHoverStartTime] = useState<number>(0);

  const spaces = [
    { 
      id: 'bedroom', 
      icon: Bed, 
      name: 'Sanctuary Space',
      position: { top: '20%', left: '15%' }
    },
    { 
      id: 'transportation', 
      icon: Car, 
      name: 'Movement Flow',
      position: { top: '20%', right: '15%' }
    },
    { 
      id: 'relationships', 
      icon: User, 
      name: 'Connection Field',
      position: { bottom: '30%', left: '10%' }
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (hoveredSpace && hoverStartTime) {
      timer = setTimeout(() => {
        if (hoveredSpace) {
          onSpaceSelect(hoveredSpace);
        }
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hoveredSpace, hoverStartTime, onSpaceSelect]);

  const handleSpaceHover = (spaceId: string) => {
    setHoveredSpace(spaceId);
    setHoverStartTime(Date.now());
  };

  const handleSpaceLeave = () => {
    setHoveredSpace(null);
    setHoverStartTime(0);
  };

  const handleSpaceClick = (spaceId: string) => {
    onSpaceSelect(spaceId);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {spaces.map((space, index) => {
        const isHovered = hoveredSpace === space.id;
        
        return (
          <div
            key={space.id}
            className={cn(
              'absolute pointer-events-auto transition-all duration-1000 cursor-pointer',
              'animate-fade-in'
            )}
            style={{
              ...space.position,
              animationDelay: `${index * 200}ms`
            }}
            onMouseEnter={() => handleSpaceHover(space.id)}
            onMouseLeave={handleSpaceLeave}
            onClick={() => handleSpaceClick(space.id)}
          >
            {/* Space Tile */}
            <div
              className={cn(
                'relative w-20 h-20 rounded-full transition-all duration-700',
                'bg-navy/50 border border-bronze/30 flex items-center justify-center',
                'hover:border-bronze/80 hover:bg-bronze/10 hover:scale-110',
                isHovered && 'shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-110'
              )}
            >
              <space.icon 
                size={28} 
                className={cn(
                  'transition-colors duration-500 text-bronze/70',
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

            {/* Space Name */}
            {isHovered && (
              <div 
                className={cn(
                  'absolute top-full mt-4 left-1/2 transform -translate-x-1/2',
                  'text-bronze font-montserrat text-sm text-center',
                  'animate-fade-in whitespace-nowrap'
                )}
              >
                {space.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpaceTiles;
