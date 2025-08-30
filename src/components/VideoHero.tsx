import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoHero.css';

interface VideoHeroProps {
  className?: string;
}

// Canonical hero video location
const VIDEO_BASE = '/videos';

const VideoHero: React.FC<VideoHeroProps> = ({ className = '' }) => {
  // Force visibility with inline styles as backup
  const heroStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
    minHeight: '600px',
    overflow: 'hidden',
    background: '#000',
    display: 'block',
    visibility: 'visible',
    opacity: 1,
    zIndex: 1
  };

  return (
      <section className={`video-hero ${className}`} style={heroStyle}>
      {/* Video Background - NO OVERLAY, FULL VIBRANCY */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${VIDEO_BASE}/compass-poster-desktop.jpg`}
      >
        {/* Desktop sources */}
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.webm`} type="video/webm" />
        <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.mp4`} type="video/mp4" />

        {/* Mobile sources (fallback below 768px) */}
        <source src={`${VIDEO_BASE}/compass-mobile.webm`} type="video/webm" />
        <source src={`${VIDEO_BASE}/compass-mobile.mp4`} type="video/mp4" />
      </video>

      {/* NO OVERLAY DIV - Video shows at full opacity */}

      {/* Removed duplicate compass overlay — logo/wordmark is embedded in the video */}

      {/* Golden CTA Button Container */}
      <div className="hero-cta-container">
        <Link to="/pathway-select" className="hero-cta" aria-label="Begin your journey">
          BEGIN YOUR JOURNEY
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </section>
  );
};

export default VideoHero;
