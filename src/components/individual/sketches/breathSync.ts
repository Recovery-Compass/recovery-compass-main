import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { BreathSyncSketchProps } from './types'

export const breathSyncSketch = (p5: P5CanvasInstance) => {
  let circleSize = 100
  let targetSize = 100
  let props: BreathSyncSketchProps = {
    pattern: '4-7-8',
    isPlaying: true,
    phase: 'inhale'
  }

  p5.setup = () => {
    const canvas = p5.createCanvas(
      Math.min(600, p5.windowWidth), 
      Math.min(400, p5.windowHeight * 0.4)
    )
    p5.noStroke()
    p5.frameRate(60) // Target 60fps
  }

  p5.updateWithProps = (newProps: any) => {
    props = newProps
    
    if (!props.isPlaying) {
      p5.noLoop()
    } else {
      p5.loop()
    }

    // Update target size based on phase
    switch (props.phase) {
      case 'inhale':
      case 'hold':
        targetSize = 200
        break
      case 'exhale':
      case 'rest':
        targetSize = 100
        break
    }
  }

  p5.draw = () => {
    // Deep navy background from design system
    p5.background('#101534')
    
    // Smooth size transition
    circleSize = p5.lerp(circleSize, targetSize, 0.05)
    
    // Golden glow effect
    p5.push()
    p5.drawingContext.shadowBlur = 40
    p5.drawingContext.shadowColor = '#D4AF37'
    
    // Outer glow circles with compass gold
    for (let i = 5; i > 0; i--) {
      p5.fill(212, 175, 55, 15) // Gold with transparency
      p5.circle(p5.width/2, p5.height/2, circleSize + (i * 30))
    }
    
    // Main breathing circle
    p5.fill('#D4AF37') // Compass gold
    p5.circle(p5.width/2, p5.height/2, circleSize)
    
    // Inner navy circle for contrast
    p5.fill('#101534') // Midnight foundation
    p5.circle(p5.width/2, p5.height/2, circleSize * 0.85)
    p5.pop()
    
    // Phase text
    p5.fill('#D4AF37') // Compass gold
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.textSize(20)
    p5.textFont('Inter, system-ui, sans-serif')
    p5.text(props.phase.toUpperCase(), p5.width/2, p5.height/2)
    
    // Instruction text
    p5.fill('#F5F5DC') // Moon glow
    p5.textSize(16)
    p5.text(getInstruction(props.phase), p5.width/2, p5.height - 40)
  }
  
  p5.windowResized = () => {
    p5.resizeCanvas(
      Math.min(600, p5.windowWidth), 
      Math.min(400, p5.windowHeight * 0.4)
    )
  }
  
  const getInstruction = (phase: string) => {
    switch(phase) {
      case 'inhale': return 'Breathe in slowly through your nose'
      case 'hold': return 'Hold your breath gently'
      case 'exhale': return 'Release slowly through your mouth'
      case 'rest': return 'Rest before the next breath'
      default: return ''
    }
  }
}