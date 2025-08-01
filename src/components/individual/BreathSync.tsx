import React, { Suspense, useEffect, useState } from 'react'
import { useBreathingPattern } from '../../hooks/useBreathingPattern'
import { breathSyncSketch } from './sketches/breathSync'

// Lazy load p5 wrapper for code splitting
const ReactP5Wrapper = React.lazy(
  () => import('@p5-wrapper/react').then(mod => ({ default: mod.ReactP5Wrapper }))
)

interface BreathSyncProps {
  pattern?: '4-7-8' | 'box' | 'coherent'
  duration?: number
  onComplete?: () => void
  className?: string
}

export const BreathSync: React.FC<BreathSyncProps> = ({ 
  pattern = '4-7-8', 
  duration = 15,
  onComplete,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const { phase, cycles } = useBreathingPattern(pattern, isPlaying)

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  // Accessibility: Reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion && onComplete) {
      // Skip to completion if user prefers reduced motion
      setTimeout(onComplete, 1000)
    }
  }, [onComplete])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      } else if (e.code === 'Escape' && onComplete) {
        onComplete()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, onComplete])

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
            <div className="w-16 h-16 border-4 border-bronze/30 border-t-bronze rounded-full animate-spin"></div>
          </div>
        }>
          <ReactP5Wrapper 
            sketch={breathSyncSketch} 
            pattern={pattern}
            isPlaying={isPlaying}
            phase={phase}
          />
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
        
        {onComplete && (
          <button
            onClick={onComplete}
            className="px-4 py-2 text-moonlight/50 hover:text-moonlight transition-colors font-body"
            aria-label="Skip breathing exercise"
          >
            Skip
          </button>
        )}
      </div>
      
      <div className="mt-4 text-center text-moonlight/50 text-sm">
        Press <kbd className="px-2 py-1 bg-navy/30 rounded">Space</kbd> to pause/resume
        {onComplete && (
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

function getPhaseDescription(phase: string): string {
  switch(phase) {
    case 'inhale': return 'Breathe in slowly through your nose'
    case 'hold': return 'Hold your breath gently'
    case 'exhale': return 'Release slowly through your mouth'
    case 'rest': return 'Rest before the next breath'
    default: return ''
  }
}