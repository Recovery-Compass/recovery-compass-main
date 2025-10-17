import React, { useEffect, useState } from 'react';

/**
 * HeroBackground — renders a resilient background video with poster and graceful fallbacks.
 * - Uses prefers-reduced-motion to disable motion automatically.
 * - Uses onError to hide the <video> if loading/decoding fails (gradient base remains via CSS).
 * - Uses responsive video sources: portrait for mobile, landscape for desktop.
 * - Uses MP4 video with poster. Poster paints instantly for LCP.
 * - Paths assume assets live under /public/videos and /public/images.
 */

// ERD METHOD HOMEPAGE ASSETS - 2025-10-17
// Desktop video: erd-method-homepage-desktop.mp4 (4.7MB, optimized)
// Mobile video: erd-method-homepage-mobile.mp4 (5.1MB, optimized)
// Desktop poster: erd-method-homepage-desktop-poster.png (4.7MB static image)
// Mobile poster: erd-method-homepage-mobile-poster.png (1.6MB static image)

const POSTER_DESKTOP = '/images/erd-method-homepage-desktop-poster.png';
const POSTER_MOBILE = '/images/erd-method-homepage-mobile-poster.png';
const MP4_DESKTOP = '/videos/erd-method-homepage-desktop.mp4';
const MP4_MOBILE = '/videos/erd-method-homepage-mobile.mp4';

const HeroBackground: React.FC = () => {
  const [reduced, setReduced] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    
    // Check for reduced motion
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(!!motionMq.matches);
    updateMotion();
    motionMq.addEventListener?.('change', updateMotion);
    
    // Check for mobile viewport
    const mobileMq = window.matchMedia('(max-width: 768px)');
    const updateMobile = () => setIsMobile(!!mobileMq.matches);
    updateMobile();
    mobileMq.addEventListener?.('change', updateMobile);
    
    return () => {
      motionMq.removeEventListener?.('change', updateMotion);
      mobileMq.removeEventListener?.('change', updateMobile);
    };
  }, []);

  // Select appropriate poster based on viewport
  const poster = isMobile ? POSTER_MOBILE : POSTER_DESKTOP;

  if (reduced || error) {
    // Render the poster image for visual consistency when reduced motion is preferred or video fails
    return (
      <img
        className="video-background-poster"
        src={poster}
        alt="Background"
        aria-hidden="true"
      />
    );
  }

  // Select appropriate video based on viewport
  const videoSrc = isMobile ? MP4_MOBILE : MP4_DESKTOP;

  return (
    <video
      key={videoSrc} // Force re-mount when video source changes
      className="video-background"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setError(true)}
      poster={poster}
      aria-hidden="true"
      src={videoSrc}
    />
  );
};

export default HeroBackground;