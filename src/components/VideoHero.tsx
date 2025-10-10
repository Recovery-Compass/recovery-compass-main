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
        {/* Use desktop video on all devices to show three-panel layout */}
        <source src={`${VIDEO_BASE}/compass-desktop.src.mp4?v=3`} type="video/mp4" />
      </video>

      {/* Centered Panel (CTA only) */}
      <div className="hero-panel">
        <Link to="/begin" className="hero-cta" aria-label="Begin your journey">
          BEGIN YOUR JOURNEY
        </Link>
      </div>
    </section>
  );
};

export default VideoHero;
