import { useState } from 'react';

const BRAND_COLORS = {
  deepOcean: '#045295',
  midnightFoundation: '#101534', 
  compassGold: '#D4AF37',
  sanctuaryCream: '#F7F3E9'
} as const;

const Navigation = () => {
  return (
    <nav 
      className="sticky top-0 z-50 px-6 py-4"
      style={{ 
        background: `linear-gradient(180deg, ${BRAND_COLORS.midnightFoundation}F0, ${BRAND_COLORS.midnightFoundation}E0)`,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${BRAND_COLORS.compassGold}30`
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img 
            src="/recovery-compass-logo.png" 
            alt="Recovery Compass"
            className="w-12 h-12"
          />
          <div>
            <div style={{ color: BRAND_COLORS.sanctuaryCream, fontFamily: 'Inter, system-ui, sans-serif' }} className="font-bold text-lg">
              Recovery Compass
            </div>
            <div style={{ color: BRAND_COLORS.compassGold }} className="text-xs">
              Environmental Response Design™
            </div>
          </div>
        </a>

        <div className="flex items-center space-x-6">
          <a 
            href="/assessment" 
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ 
              color: BRAND_COLORS.sanctuaryCream,
              background: `${BRAND_COLORS.compassGold}20`,
              border: `1px solid ${BRAND_COLORS.compassGold}40`
            }}
          >
            Assessment
          </a>
          <a 
            href="/impact-translator" 
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ 
              color: BRAND_COLORS.sanctuaryCream,
              background: `${BRAND_COLORS.deepOcean}20`,
              border: `1px solid ${BRAND_COLORS.deepOcean}40`
            }}
          >
            Impact Translator
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
