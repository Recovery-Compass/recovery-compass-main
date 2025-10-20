import React, { Suspense, useEffect, useState } from 'react'
import { useBreathingPattern } from '../../hooks/useBreathingPattern'
import { breathSyncSketch } from './sketches/breathSync'

// Lazy load p5 wrapper with error handling
const ReactP5Wrapper = React.lazy(() => 
  import('@p5-wrapper/react')
    .then(mod => {

      return { default: mod.ReactP5Wrapper };
    })
    .catch(err => {
      console.error('❌ Failed to load @p5-wrapper/react:', err);
      throw err;
    })
)

interface BreathSyncProps {
  pattern?: '4-7-8' | 'box' | 'coherent'
  duration?: number
  _onComplete?: () => void
  className?: string
}

export const BreathSync: React.FC<BreathSyncProps> = ({ 
  pattern = '4-7-8', 
  duration = 15,
  _onComplete,
  className = ''
}) => {

  
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { phase, cycles } = useBreathingPattern(pattern, isPlaying)

  useEffect(() => {

  }, [phase, cycles]);

  useEffect(() => {
    const timer = setTimeout(() => {

      _onComplete?.()
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [duration, _onComplete])

  // Accessibility: Reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && _onComplete) {
      // Skip to completion if user prefers reduced motion
      setTimeout(_onComplete, 1000)
    }
  }, [_onComplete])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      } else if (e.code === 'Escape' && _onComplete) {
        _onComplete()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, _onComplete])

  // Error boundary for p5
  const handleError = () => {
    console.error('❌ P5 rendering failed, showing fallback');
    setHasError(true);
  };

  if (hasError) {
    // CSS Fallback
    return (
      <div className={`relative ${className}`}>
        <BreathSyncCSS pattern={pattern} phase={phase} _onComplete={onComplete} />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} role="region" aria-label="Breathing exercise">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gold mb-2">
          Analyzing your responses...
        </h2>
        <p className="text-moonlight/70 text-base">
          Take a moment to breathe while we prepare your insights
        </p>
        {cycles > 0 && (
          <p className="text-bronze/60 text-sm mt-2">
            Breath cycles completed: {cycles}
          </p>
        )}
      </div>
      
      <div className="relative">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-gold animate-pulse">Loading breathing exercise...</div>
          </div>
        }>
          <div className="w-full" onError={handleError}>
            <ReactP5Wrapper 
              sketch={breathSyncSketch} 
              pattern={pattern}
              isPlaying={isPlaying}
              phase={phase}
            />
          </div>
        </Suspense>
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 text-gold hover:text-bronze transition-colors font-body"
          aria-label={isPlaying ? 'Pause breathing exercise' : 'Resume breathing exercise'}
        >
          {isPlaying ? 'Pause' : 'Resume'}
        </button>
        
        {_onComplete && (
          <button
            onClick={_onComplete}
            className="px-4 py-2 text-moonlight/50 hover:text-moonlight transition-colors font-body"
            aria-label="Skip breathing exercise"
          >
            Skip
          </button>
        )}
      </div>
      
      <div className="mt-4 text-center text-moonlight/50 text-sm">
        Press <kbd className="px-2 py-1 bg-navy/30 rounded">Space</kbd> to pause/resume
        {_onComplete && (
          <> or <kbd className="px-2 py-1 bg-navy/30 rounded">Esc</kbd> to skip</>
        )}
      </div>
      
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        <span>{phase} phase - {getPhaseDescription(phase)}</span>
      </div>
    </div>
  )
}

// CSS Fallback Component
const BreathSyncCSS: React.FC<any> = ({ phase, _onComplete }) => {
  const phaseConfig = {
    inhale: { scale: 'scale-150', duration: '4s' },
    hold: { scale: 'scale-150', duration: '7s' },
    exhale: { scale: 'scale-100', duration: '8s' },
    rest: { scale: 'scale-100', duration: '0s' }
  };

  const config = phaseConfig[phase as keyof typeof phaseConfig] || phaseConfig.inhale;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`relative w-48 h-48 rounded-full bg-gold shadow-2xl transition-transform ${config.scale}`}
        style={{ transitionDuration: config.duration }}
      >
        <div className="absolute inset-4 rounded-full bg-navy flex items-center justify-center">
          <span className="text-gold font-bold text-2xl">
            {phase.toUpperCase()}
          </span>
        </div>
      </div>
      <p className="mt-8 text-moonlight text-lg">
        {getPhaseDescription(phase)}
      </p>
    </div>
  );
};

function getPhaseDescription(phase: string): string {
  switch(phase) {
    case 'inhale': return 'Breathe in slowly through your nose'
    case 'hold': return 'Hold your breath gently'
    case 'exhale': return 'Release slowly through your mouth'
    case 'rest': return 'Rest before the next breath'
    default: return ''
  }
}