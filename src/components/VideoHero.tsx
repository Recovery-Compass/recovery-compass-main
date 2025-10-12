import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoHero.css';
import HeroBackground from './HeroBackground';

const VideoHero: React.FC = () => {
  return (
    <section className="video-hero" aria-label="Recovery Compass hero">
      {/* Background video layer with poster + graceful fallbacks */}
      <HeroBackground />

      {/* Centered Panel (CTA only per WARP rules) */}
      <div className="hero-panel">
        <Link to="/begin" className="hero-cta" aria-label="Begin your journey">
          BEGIN YOUR JOURNEY
        </Link>
      </div>
    </section>
  );
};

export default VideoHero;
