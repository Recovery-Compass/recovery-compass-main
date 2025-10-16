import React, { useEffect, useState } from 'react';

/**
 * HeroBackground — renders a resilient background video with poster and graceful fallbacks.
 * - Uses prefers-reduced-motion to disable motion automatically.
 * - Uses onError to hide the <video> if loading/decoding fails (gradient base remains via CSS).
 * - Uses MP4 video with poster. Poster paints instantly for LCP.
 * - Paths assume assets live under /public/videos and /public/images.
 */
const POSTER = '/images/water-drapes-poster.jpg';
const MP4 = '/videos/erd-method-homepage.mp4';

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
      <source src={MP4} type="video/mp4" />
    </video>
  );
};

export default HeroBackground;