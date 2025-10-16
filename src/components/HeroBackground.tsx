import React, { useEffect, useState } from 'react';

/**
 * HeroBackground — renders a resilient background video with poster and graceful fallbacks.
 * - Uses prefers-reduced-motion to disable motion automatically.
 * - Uses onError to hide the <video> if loading/decoding fails (gradient base remains via CSS).
 * - Uses responsive video sources: portrait for mobile, landscape for desktop.
 * - Uses MP4 video with poster. Poster paints instantly for LCP.
 * - Paths assume assets live under /public/videos and /public/images.
 */

// VERIFIED LIGHTHOUSE VIDEOS - 2025-10-16T06:30 UTC
// Desktop: erd-method-homepage.mp4 (user uploaded, lighthouse verified)
// Mobile: homepage-mobile-20251016.mp4 (2.9MB, user uploaded, lighthouse verified)
// Poster: water-drapes-poster-v2.jpg (111KB, lighthouse verified, MD5: 99be73cf2721227cbf5a17f31d251028)

const POSTER = '/images/water-drapes-poster-v2.jpg';
const MP4_DESKTOP = '/videos/erd-method-homepage.mp4';
const MP4_MOBILE = '/videos/homepage-mobile-20251016.mp4';

const HeroBackground: React.FC = () => {
  const [reduced, setReduced] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  if (reduced || error) {
    // Render the poster image for visual consistency when reduced motion is preferred or video fails
    return (
      <img
        className="video-background-poster"
        src={POSTER}
        alt="Background"
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      className="video-background"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setError(true)}
      poster={POSTER}
      aria-hidden="true"
    >
      {/* Mobile-first: User-verified portrait video with lighthouse (2.9MB) */}
      <source 
        media="(max-width: 768px)" 
        src={MP4_MOBILE} 
        type="video/mp4" 
      />
      {/* Desktop: User-verified landscape video with lighthouse */}
      <source 
        src={MP4_DESKTOP} 
        type="video/mp4" 
      />
    </video>
  );
};

export default HeroBackground;