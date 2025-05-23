
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { PresenceData } from './PresenceDetector';

interface AmbientResponseLayerProps {
  presence: PresenceData;
  selectedEnvironment?: string;
}

const AmbientResponseLayer = ({ presence, selectedEnvironment }: AmbientResponseLayerProps) => {
  // Generate particles based on presence depth
  const particles = useMemo(() => {
    const count = Math.floor(3 + presence.presenceDepth * 7);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? 'teal' : 'bronze',
      delay: Math.random() * 8
    }));
  }, [presence.presenceDepth]);

  // Environment-specific ambient colors
  const environmentColors = {
    bedroom: { primary: 'rgba(20,141,141,0.1)', secondary: 'rgba(212,175,55,0.05)' },
    transportation: { primary: 'rgba(212,175,55,0.1)', secondary: 'rgba(20,141,141,0.05)' },
    relationships: { primary: 'rgba(212,175,55,0.08)', secondary: 'rgba(20,141,141,0.08)' },
    workspace: { primary: 'rgba(20,141,141,0.12)', secondary: 'rgba(212,175,55,0.03)' },
    solitude: { primary: 'rgba(212,175,55,0.05)', secondary: 'rgba(20,141,141,0.12)' }
  };

  const currentColors = selectedEnvironment 
    ? environmentColors[selectedEnvironment as keyof typeof environmentColors]
    : { primary: 'rgba(20,141,141,0.05)', secondary: 'rgba(212,175,55,0.03)' };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Breathing background field */}
      <div 
        className="absolute inset-0 transition-all duration-3000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentColors.primary}, transparent 70%)`,
          opacity: 0.3 + presence.presenceDepth * 0.4
        }}
      />

      {/* Secondary color wash */}
      <div 
        className="absolute inset-0 transition-all duration-4000"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${currentColors.secondary}, transparent 60%)`,
          opacity: 0.2 + presence.presenceDepth * 0.3
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            'absolute rounded-full animate-float',
            particle.color === 'teal' ? 'bg-teal/30' : 'bg-bronze/20'
          )}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity * (0.5 + presence.presenceDepth * 0.5),
            animationDelay: `${particle.delay}s`,
            animationDuration: `${8 + Math.random() * 8}s`
          }}
        />
      ))}

      {/* Essence-based ambient patterns */}
      {presence.userEssence === 'seeker' && (
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-bronze/10 animate-gentle-pulse" />
      )}
      
      {presence.userEssence === 'explorer' && (
        <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full border border-teal/15 animate-[gentle-pulse_6s_ease-in-out_infinite]" />
      )}

      {presence.userEssence === 'guardian' && (
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-bronze/20 animate-[gentle-pulse_10s_ease-in-out_infinite]" />
      )}

      {presence.userEssence === 'wanderer' && (
        <>
          <div className="absolute top-16 left-1/3 w-16 h-16 rounded-full border border-teal/10 animate-float" />
          <div className="absolute bottom-20 right-1/3 w-12 h-12 rounded-full border border-bronze/15 animate-[float_12s_ease-in-out_infinite_4s]" />
        </>
      )}
    </div>
  );
};

export default AmbientResponseLayer;
