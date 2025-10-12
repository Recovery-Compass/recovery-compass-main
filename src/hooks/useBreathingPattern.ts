import { useState, useEffect, useRef } from 'react'
import type { BreathPhase, BreathingPattern } from '../components/individual/sketches/types'

const patterns: Record<string, BreathingPattern> = {
  '4-7-8': { inhale: 4000, hold: 7000, exhale: 8000, rest: 0 },
  'box': { inhale: 4000, hold: 4000, exhale: 4000, rest: 4000 },
  'coherent': { inhale: 5000, hold: 0, exhale: 5000, rest: 0 }
}

export const useBreathingPattern = (
  pattern: keyof typeof patterns,
  isPlaying: boolean = true
) => {
  const [phase, setPhase] = useState<BreathPhase>('inhale')
  const [progress, setProgress] = useState(0)
  const phaseStartTime = useRef(Date.now())
  const totalCycles = useRef(0)

  useEffect(() => {
    if (!isPlaying) return

    const updatePhase = () => {
      const elapsed = Date.now() - phaseStartTime.current
      const currentPattern = patterns[pattern]
      const phaseDuration = currentPattern[phase]

      if (phaseDuration === 0 || elapsed >= phaseDuration) {
        // Move to next phase
        const phases: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest']
        const currentIndex = phases.indexOf(phase)
        let nextIndex = (currentIndex + 1) % phases.length
        let nextPhase = phases[nextIndex]
        
        // Skip phases with 0 duration
        while (currentPattern[nextPhase] === 0 && nextIndex !== currentIndex) {
          nextIndex = (nextIndex + 1) % phases.length
          nextPhase = phases[nextIndex]
        }
        
        phaseStartTime.current = Date.now()
        setPhase(nextPhase)
        
        // Track complete cycles
        if (nextPhase === 'inhale') {
          totalCycles.current += 1
        }
      } else {
        setProgress(elapsed / phaseDuration)
      }
    }

    const interval = setInterval(updatePhase, 50)
    return () => clearInterval(interval)
  }, [pattern, phase, isPlaying])

  return { phase, progress, cycles: totalCycles.current }
}