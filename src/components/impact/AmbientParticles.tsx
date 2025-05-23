
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AmbientParticlesProps {
  presenceDepth: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

const AmbientParticles = ({ presenceDepth }: AmbientParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleCount = 20;
  
  // Generate particles on mount and when presence changes significantly
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // position as percentage
          y: Math.random() * 100,
          size: Math.random() * 5 + 2,
          opacity: Math.random() * 0.3 + 0.1,
          delay: Math.random() * 5,
          duration: Math.random() * 5 + 8
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Regenerate particles occasionally based on significant presence changes
    const presenceThreshold = Math.floor(presenceDepth * 10);
    if (presenceThreshold !== Math.floor((presenceDepth - 0.1) * 10)) {
      generateParticles();
    }
  }, [particleCount, presenceDepth]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        opacity: Math.min(presenceDepth + 0.2, 1)
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: Math.random() > 0.5 ? 'rgba(20, 141, 141, 0.3)' : 'rgba(212, 175, 55, 0.2)',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
      
      {/* Ambient gradient overlays */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-70"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-l from-navy/50 to-transparent opacity-30"
      />
    </div>
  );
};

export default AmbientParticles;
