import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoHero.css';
import HeroBackground from './HeroBackground';

const VideoHero: React.FC = () => {
  return (
    <section className="video-hero" aria-label="Recovery Compass hero">
      {/* Background video layer */}
      <HeroBackground />

      {/* Clean overlay: Logo + Text only */}
      <div className="hero-overlay">
        {/* Recovery Compass ERD Method Logo */}
        <img 
          src="/images/rc-erd-method-logo.png" 
          alt="Recovery Compass" 
          className="hero-logo"
        />
        
        {/* Text as clickable link, no button frame */}
        <Link to="/begin" className="hero-text" aria-label="Begin your journey">
          BEGIN YOUR JOURNEY<sup>2</sup>
        </Link>
      </div>
    </section>
  );
};

export default VideoHero;
