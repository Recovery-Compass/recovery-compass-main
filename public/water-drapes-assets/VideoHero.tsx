// components/VideoHero.tsx
import React from "react";
import "./VideoHero.css";

/**
 * Recovery Compass — Deterministic Calm Ocean Loop
 *
 * Strategy:
 * - Determinism: Embed a single validated loop and poster via Base64 to eliminate CDN/CORS variability.
 * - Performance: 1280×720 (~10s), H.264, ≤8 MB; poster paints instantly for zero layout shift.
 * - Accessibility: Honors prefers-reduced-motion by showing a static poster and hiding motion.
 *
 * Usage:
 * - Replace POSTER_B64 and MP4_B64 with one-line Base64 payloads (no whitespace, no newlines).
 * - Confirm loop seam and sizes with your local FFmpeg pipeline before embedding.
 */

// IMPORTANT: Paste Base64 payloads as single-line double-quoted strings.
// Do not include newlines or spaces; avoid backticks/template literals.
const POSTER_B64 = "PASTE_POSTER_BASE64_HERE";
const MP4_B64 = "PASTE_MP4_BASE64_HERE";

// Construct deterministic data URLs from Base64 payloads
const POSTER_DATA_URL = `data:image/jpeg;base64,${POSTER_B64}`;
const VIDEO_DATA_URL = `data:video/mp4;base64,${MP4_B64}`;

export default function VideoHero() {
  // Respect user motion preferences at render time
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="hero" aria-label="Calm ocean visualization">
      {/* Poster paints instantly; visible for reduced motion users */}
      <img
        className={`hero__poster${prefersReducedMotion ? " hero__poster--visible" : ""}`}
        src={POSTER_DATA_URL}
        alt="Calm ocean"
        decoding="async"
      />

      {/* Deterministic loop: muted, inline, autoplay; hidden if reduced motion */}
      {!prefersReducedMotion && (
        <video
          className="hero__video"
          src={VIDEO_DATA_URL}
          preload="metadata"
          muted
          loop
          playsInline
          autoPlay
          poster={POSTER_DATA_URL}
        />
      )}

      {/* Contrast overlay for readable content over varied water luminance */}
      <div className="hero__overlay" />

      {/* Content layer */}
      <div className="hero__content">
        <h1 className="hero__title">Recovery Compass</h1>
        <a className="hero__cta" href="/start">Begin Your Journey</a>
      </div>
    </section>
  );
}
