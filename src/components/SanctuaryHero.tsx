import React from 'react'
import '../styles/rc-hero.css'

const SanctuaryHero: React.FC = () => {
  return (
    <main className="rc-hero-page">
      <div className="rc-hero-bg" aria-hidden="true" />
      <section className="rc-hero-panel" aria-label="Recovery Compass hero">
        <div className="rc-hero-panel-inner">
          <div>
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

