
import { useState, useEffect, useRef, useCallback } from 'react';

export interface PresenceData {
  presenceDepth: number;
  pausePatterns: number[];
  userEssence: 'explorer' | 'seeker' | 'guardian' | 'wanderer';
  environmentAffinity: string;
}

interface PresenceDetectorProps {
  onPresenceChange: (presence: PresenceData) => void;
  children: React.ReactNode;
}

const PresenceDetector = ({ onPresenceChange, children }: PresenceDetectorProps) => {
  const [presenceDepth, setPresenceDepth] = useState(0);
  const [pausePatterns, setPausePatterns] = useState<number[]>([]);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverStartRef = useRef<number>(0);
  const pauseTimerRef = useRef<NodeJS.Timeout>();

  const calculateUserEssence = useCallback((depth: number, patterns: number[]): PresenceData['userEssence'] => {
    const avgPause = patterns.length > 0 ? patterns.reduce((a, b) => a + b, 0) / patterns.length : 0;
    
    if (depth > 0.8 && avgPause > 3000) return 'seeker';
    if (depth > 0.6 && patterns.length > 5) return 'explorer';
    if (depth < 0.3 && avgPause < 1000) return 'wanderer';
    return 'guardian';
  }, []);

  const calculateEnvironmentAffinity = useCallback((essence: PresenceData['userEssence']): string => {
    switch (essence) {
      case 'seeker': return 'solitude';
      case 'explorer': return 'workspace';
      case 'guardian': return 'relationships';
      case 'wanderer': return 'transportation';
      default: return 'bedroom';
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      setPresenceDepth(prev => Math.min(prev + 0.01, 1));
    };

    const handleMouseEnter = () => {
      hoverStartRef.current = Date.now();
    };

    const handleMouseLeave = () => {
      const duration = Date.now() - hoverStartRef.current;
      if (duration > 500) {
        setPausePatterns(prev => [...prev.slice(-9), duration]);
      }
    };

    const handleScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollDepth(scrolled);
      setPresenceDepth(prev => Math.min(prev + 0.02, 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('scroll', handleScroll);

    // Presence decay timer
    const decayTimer = setInterval(() => {
      setPresenceDepth(prev => Math.max(prev - 0.005, 0));
    }, 1000);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayTimer);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const essence = calculateUserEssence(presenceDepth, pausePatterns);
    const affinity = calculateEnvironmentAffinity(essence);
    
    onPresenceChange({
      presenceDepth,
      pausePatterns,
      userEssence: essence,
      environmentAffinity: affinity
    });
  }, [presenceDepth, pausePatterns, calculateUserEssence, calculateEnvironmentAffinity, onPresenceChange]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
};

export default PresenceDetector;
