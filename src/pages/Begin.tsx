import React from 'react';
import { Link } from 'react-router-dom';

const cardStyle: React.CSSProperties = {
  display: 'grid',
  gap: '12px',
  padding: '24px',
  borderRadius: '20px',
  background: 'rgba(0,0,0,0.55)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  textAlign: 'center'
};

const titleStyle: React.CSSProperties = {
  color: '#fff',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 900,
  letterSpacing: '0.06em',
  fontSize: '1.35rem',
  margin: 0
};

const subStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.85)',
  margin: 0,
  fontSize: '0.95rem'
};

const ctaStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: '8px',
  textDecoration: 'none',
  fontWeight: 900,
  letterSpacing: '0.08em',
  padding: '14px 28px',
  borderRadius: 999,
  color: '#000',
  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
  boxShadow: '0 6px 20px rgba(212,175,55,0.35), 0 3px 10px rgba(0,0,0,0.25)'
};

export default function Begin() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#000',
        padding: '24px'
      }}
    >
      <div
        style={{
          width: 'min(980px, 94vw)',
          display: 'grid',
          gap: '22px'
        }}
      >
        <h1
          style={{
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            letterSpacing: '0.08em',
            fontSize: 'clamp(24px, 3.2vw, 36px)',
            textAlign: 'center',
            margin: '0 0 10px 0'
          }}
        >
          Choose Your Journey
        </h1>

        {/* Organization (Primary) */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Transform your organization</h2>
          <p style={subStyle}>Engage the prompt: Transform organizational challenges.</p>
          <Link to="/adventure" style={ctaStyle} aria-label="Transform your organization">
            Continue
          </Link>
        </div>

        {/* Individual (Secondary) */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Begin your journey</h2>
          <p style={subStyle}>Explore your personal path and tools.</p>
          <Link to="/pathway-select" style={ctaStyle} aria-label="Begin your individual journey">
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}

