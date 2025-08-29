import React from 'react'
import '../styles/rc-hero.css'

const VIDEO_BASE = '/videos'

const SanctuaryHero: React.FC = () => {
  return (
    <main className="rc-hero-page">
      <div className="rc-hero-bg" aria-hidden="true" />
      <section className="rc-hero-panel" aria-label="Recovery Compass hero">
        {/* Water video INSIDE the panel — single source of truth for branding */}
        <video className="rc-panel-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" poster={`${VIDEO_BASE}/compass-poster-desktop.jpg`}>
          {/* Desktop sources */}
          <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.webm`} type="video/webm" />
          <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.mp4`} type="video/mp4" />
          {/* Mobile sources */}
          <source src={`${VIDEO_BASE}/compass-mobile.webm`} type="video/webm" />
          <source src={`${VIDEO_BASE}/compass-mobile.mp4`} type="video/mp4" />
        </video>
        <div className="rc-hero-panel-inner">
          {/* Removed overlay logo and wordmark to avoid duplicate branding */}
          <div className="rc-hero-cta-wrap">
            <a className="rc-hero-cta" href="/adventure" aria-label="Begin your journey">BEGIN YOUR JOURNEY</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SanctuaryHero

