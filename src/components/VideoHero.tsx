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
        poster={`${VIDEO_BASE}/compass-poster-desktop.jpg`}
      >
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.webm`} type="video/webm" />
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.mp4`} type="video/mp4" />
        <source src={`${VIDEO_BASE}/compass-mobile.webm`} type="video/webm" />
        <source src={`${VIDEO_BASE}/compass-mobile.mp4`} type="video/mp4" />
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
