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
          {/* Crisp logo overlay, precisely positioned over the background logo */}
          <div className="rc-hero-logo-wrap" aria-hidden="true">
            <img src="/assets/logo.png" alt="" className="rc-hero-logo" decoding="async" />
          </div>
          {/* We intentionally rely on the background video text for \"RECOVERY COMPASS\" to avoid duplication. */}
          <div className="rc-hero-cta-wrap">
            <a className="rc-hero-cta" href="/adventure" aria-label="Begin your journey">BEGIN YOUR JOURNEY</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SanctuaryHero

