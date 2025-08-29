import React from 'react'
import '../styles/rc-hero.css'

const VIDEO_BASE = '/videos'

const SanctuaryHero: React.FC = () => {
  return (
    <main className="rc-hero-page">
      {/* Full-viewport water video as the ONLY background */}
      <video className="rc-panel-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" poster={`${VIDEO_BASE}/compass-poster-desktop.jpg`}>
        {/* Desktop sources */}
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.webm`} type="video/webm" />
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.mp4`} type="video/mp4" />
        {/* Mobile sources */}
        <source src={`${VIDEO_BASE}/compass-mobile.webm`} type="video/webm" />
        <source src={`${VIDEO_BASE}/compass-mobile.mp4`} type="video/mp4" />
      </video>

      {/* Foreground panel content only */}
      <section className="rc-hero-panel" aria-label="Recovery Compass hero">
        <div className="rc-hero-panel-inner">
          <div className="rc-hero-logo-wrap">
            <img src="/assets/logo.png" alt="Recovery Compass logo" className="rc-hero-logo" decoding="async" />
          </div>
          <h1 className="rc-hero-title">RECOVERY COMPASS</h1>
          <div className="rc-hero-cta-wrap">
            <a className="rc-hero-cta" href="/adventure" aria-label="Begin your journey">BEGIN YOUR JOURNEY</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SanctuaryHero

