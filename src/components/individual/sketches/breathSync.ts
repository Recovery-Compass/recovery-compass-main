import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { BreathSyncSketchProps } from './types'

export const breathSyncSketch = (p5: P5CanvasInstance<BreathSyncSketchProps>) => {

  
  let circleSize = 100
  let targetSize = 100
  let props: BreathSyncSketchProps = {
    pattern: '4-7-8',
    isPlaying: true,
    phase: 'inhale'
  }

  p5.setup = () => {

    try {
      p5.createCanvas(
        Math.min(600, p5.windowWidth - 40), 
        Math.min(400, p5.windowHeight * 0.4)
      )
      p5.noStroke()
      p5.frameRate(60)

    } catch (error) {
      console.error('❌ Canvas creation failed:', error);
    }
  }

  p5.updateWithProps = (newProps: BreathSyncSketchProps) => {

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
    // Dark navy background
    p5.background(16, 21, 52) // #101534 in RGB
    
    // Smooth size transition
    circleSize = p5.lerp(circleSize, targetSize, 0.05)
    
    // Create glow effect with multiple circles (no shadowBlur)
    p5.noStroke()
    
    // Draw multiple circles for glow effect
    for (let i = 8; i > 0; i--) {
      const alpha = p5.map(i, 0, 8, 40, 5)
      p5.fill(212, 175, 55, alpha) // Gold with decreasing transparency
      const size = circleSize + (i * 20)
      p5.circle(p5.width/2, p5.height/2, size)
    }
    
    // Main breathing circle
    p5.fill(212, 175, 55) // #D4AF37 in RGB
    p5.circle(p5.width/2, p5.height/2, circleSize)
    
    // Inner navy circle for contrast
    p5.fill(16, 21, 52) // #101534 in RGB
    p5.circle(p5.width/2, p5.height/2, circleSize * 0.85)
    
    // Phase text
    p5.fill(212, 175, 55) // Gold
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.textSize(24)
    try {
      p5.textFont('Inter, -apple-system, BlinkMacSystemFont, sans-serif')
    } catch (e) {
      // Fallback if font fails
    }
    p5.text(props.phase.toUpperCase(), p5.width/2, p5.height/2)
    
    // Instruction text
    p5.fill(245, 245, 220) // #F5F5DC in RGB
    p5.textSize(16)
    p5.text(getInstruction(props.phase), p5.width/2, p5.height - 40)
  }
  
  p5.windowResized = () => {
    p5.resizeCanvas(
      Math.min(600, p5.windowWidth - 40), 
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