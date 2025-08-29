import React from 'react'
import '../styles/rc-hero.css'

const VIDEO_SRC = 'https://github.com/EssenceAlignment/sanctuary-hero-bloom/raw/main/Video/Most%20closely%20aligned%20version%20of%20the%20video%20file%20for%20home%20page%20AUG%2029.mp4'

const SanctuaryHero: React.FC = () => {
  return (
    <main className="rc-hero-page">
      <div className="rc-hero-bg" aria-hidden="true" />
      <section className="rc-hero-panel" aria-label="Recovery Compass hero">
        {/* Water video INSIDE the panel */}
        <video className="rc-panel-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
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

