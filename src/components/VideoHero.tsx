import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoHero.css';

const VIDEO_BASE = '/videos';

const VideoHero: React.FC = () => {
  return (
    <section className="video-hero">
      {/* Video Background */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.src.mp4`} type="video/mp4" />
        <source src={`${VIDEO_BASE}/compass-mobile.src.mp4`} type="video/mp4" />
      </video>

      {/* Centered Panel */}
      <div className="hero-panel">
        <img
          src="/assets/branding/recovery-compass-logo.png"
          alt="Recovery Compass Logo"
          className="brand-logo"
        />
        <h1 className="brand-wordmark">RECOVERY COMPASS</h1>
        <Link to="/begin" className="hero-cta" aria-label="Begin your journey">
          BEGIN YOUR JOURNEY
        </Link>
      </div>
    </section>
  );
};

export default VideoHero;
