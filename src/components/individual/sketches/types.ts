export interface BreathSyncSketchProps {
  pattern: '4-7-8' | 'box' | 'coherent'
  isPlaying: boolean
  phase: BreathPhase
  onPhaseChange?: (phase: BreathPhase) => void
  [key: string]: any // Index signature for p5 compatibility
}

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest'

export interface BreathingPattern {
  inhale: number
  hold: number
  exhale: number
  rest: number
}