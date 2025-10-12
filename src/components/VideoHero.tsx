import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoHero.css';

const VIDEO_BASE = '/videos';

const VideoHero: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return (
    <section className="video-hero" aria-label="Recovery Compass hero">
      {/* Video Background: render only if motion is allowed and no error; gradient base always present via CSS */}
      {!prefersReducedMotion && !videoError && (
        <video
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source media="(min-width: 768px)" src={`${VIDEO_BASE}/compass-desktop.src.mp4?v=3`} type="video/mp4" />
          <source src={`${VIDEO_BASE}/compass-mobile.src.mp4?v=3`} type="video/mp4" />
        </video>
      )}

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
