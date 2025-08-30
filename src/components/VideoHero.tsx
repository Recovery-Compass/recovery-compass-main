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
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 1,
        }}
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

      {/* Centered Panel */}
      <div
        className="hero-panel"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(0,0,0,0.65)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          padding: '32px 16px 24px 16px',
          maxWidth: '340px',
          width: '92vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <img
          src="/assets/branding/recovery-compass-logo.png"
          alt="Recovery Compass Logo"
          className="brand-logo"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '18px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 16px rgba(212,175,55,0.25))',
          }}
        />

        {/* Title */}
        <h1
          style={{
            color: '#FFFFFF',
            fontWeight: 900,
            fontFamily: 'Montserrat ExtraBold, Montserrat, sans-serif',
            fontSize: '1.3rem',
            letterSpacing: '0.08em',
            textAlign: 'center',
            marginBottom: '18px',
            textShadow: '0 2px 12px rgba(0,0,0,0.45)',
          }}
        >
          RECOVERY COMPASS
        </h1>

        {/* CTA Button */}
        <Link
          to="/begin"
          className="hero-cta"
          aria-label="Begin your journey"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
            color: '#000',
            fontWeight: 900,
            fontFamily: 'Montserrat ExtraBold, Montserrat, sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.08em',
            borderRadius: '999px',
            padding: '12px 28px',
            boxShadow: '0 4px 20px rgba(212,175,55,0.35), 0 2px 10px rgba(0,0,0,0.2)',
            border: 'none',
            cursor: 'pointer',
            marginTop: 'auto',
            marginBottom: '0',
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          BEGIN YOUR JOURNEY
        </Link>
      </div>
    </section>
  );
};

export default VideoHero;
