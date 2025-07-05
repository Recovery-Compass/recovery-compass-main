import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Brand System Configuration
const BRAND_COLORS = {
  deepOcean: '#045295',
  midnightFoundation: '#101534', 
  compassGold: '#D4AF37',
  treeCopper: '#B87333',
  sanctuaryCream: '#F7F3E9',
  moonlight: '#E8E9F3',
  bronze: '#CD7F32'
} as const;

const CORE_PATHWAYS = [
  {
    id: 'assessment',
    title: 'Environmental Assessment',
    subtitle: 'Environmental Mastery Design™',
    description: 'Discover your unique environmental strengths and optimization opportunities.',
    subtext: 'Complete your assessment and receive your personalized Environmental Mastery Design™ within 72 hours.',
    ctaText: 'Start Assessment',
    color: 'teal',
    icon: '🌳'
  },
  {
    id: 'impact-translator', 
    title: 'Impact Translator',
    subtitle: 'Success Documentation Engine',
    description: 'Transform your environmental mastery journey into compelling impact stories.',
    subtext: 'Perfect for organizations, grants, and partnerships that need data-driven success narratives.',
    ctaText: 'Launch Translator',
    color: 'gold',
    icon: '💫'
  }
] as const;

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = useCallback((pathwayId: string) => {
    if (pathwayId.startsWith('/')) {
      navigate(pathwayId);
    } else {
      navigate(`/${pathwayId}`);
    }
  }, [navigate]);

  const handleStartAssessment = useCallback(() => {
    navigate('/assessment');
  }, [navigate]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.midnightFoundation }}>
      {/* Environmental Mastery Promise - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <div
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          style={{ 
            backgroundColor: BRAND_COLORS.compassGold,
            color: BRAND_COLORS.midnightFoundation,
            border: `2px solid ${BRAND_COLORS.compassGold}`
          }}
        >
          ✨ Unique Design Within 72 Hours
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Recovery Compass Logo */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto">
            <img 
              src="/recovery-compass-logo.png" 
              alt="Recovery Compass - Tree of Life Navigation" 
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ 
                filter: `drop-shadow(0 0 20px ${BRAND_COLORS.compassGold}60)`
              }}
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className={`text-center max-w-4xl mx-auto mb-12 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif',
              color: BRAND_COLORS.sanctuaryCream,
              textShadow: `2px 2px 4px ${BRAND_COLORS.midnightFoundation}`
            }}
          >
            RECOVERY COMPASS
          </h1>
          
          <div 
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ color: BRAND_COLORS.compassGold }}
          >
            Environmental Response Design™
          </div>
          
          <p 
            className="text-lg md:text-xl font-medium leading-relaxed"
            style={{ 
              color: BRAND_COLORS.moonlight,
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            Master your environment. Design your flourishing.<br/>
            <span className="text-base opacity-90">
              Receive your personalized Environmental Mastery Design™ within 72 hours.
            </span>
          </p>
        </div>

        {/* Pathway Selection */}
        <div className={`max-w-6xl w-full transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {CORE_PATHWAYS.map((pathway, index) => (
              <PathwayCard
                key={pathway.id}
                pathway={pathway}
                delay={800 + (index * 200)}
                onSelect={() => handleNavigate(pathway.id)}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 text-center max-w-3xl mx-auto transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div style={{ color: BRAND_COLORS.moonlight }}>
              <div className="font-semibold mb-1">⚡ 72-Hour Delivery</div>
              <div className="opacity-80">Your unique design guaranteed</div>
            </div>
            <div style={{ color: BRAND_COLORS.moonlight }}>
              <div className="font-semibold mb-1">🎯 Personalized Design</div>
              <div className="opacity-80">Tailored to your environment</div>
            </div>
            <div style={{ color: BRAND_COLORS.moonlight }}>
              <div className="font-semibold mb-1">🌟 Mastery Focused</div>
              <div className="opacity-80">Strength-based optimization</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface PathwayCardProps {
  pathway: typeof CORE_PATHWAYS[0];
  delay: number;
  onSelect: () => void;
}

const PathwayCard = ({ pathway, delay, onSelect }: PathwayCardProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isGold = pathway.color === 'gold';
  const primaryColor = isGold ? BRAND_COLORS.compassGold : BRAND_COLORS.deepOcean;
  const hoverColor = isGold ? BRAND_COLORS.treeCopper : '#0369A1';

  return (
    <div
      className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{
        backgroundColor: `${BRAND_COLORS.deepOcean}20`,
        borderColor: `${primaryColor}40`,
        boxShadow: `0 4px 20px ${BRAND_COLORS.midnightFoundation}40`
      }}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Access ${pathway.title}`}
    >
      {/* Card Background Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: primaryColor }}
      />
      
      {/* Icon */}
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {pathway.icon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 
          className="font-black text-2xl md:text-3xl mb-2"
          style={{ 
            color: primaryColor,
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {pathway.title}
        </h3>
        
        <div 
          className="text-sm font-semibold mb-4 opacity-90"
          style={{ color: BRAND_COLORS.compassGold }}
        >
          {pathway.subtitle}
        </div>
        
        <p 
          className="text-lg mb-4 font-medium leading-relaxed"
          style={{ color: BRAND_COLORS.moonlight }}
        >
          {pathway.description}
        </p>
        
        <p 
          className="text-sm italic mb-8 opacity-80 leading-relaxed"
          style={{ color: BRAND_COLORS.moonlight }}
        >
          {pathway.subtext}
        </p>
        
        {/* CTA Button */}
        <button
          className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: 'transparent',
            border: `2px solid ${primaryColor}`,
            color: primaryColor
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = primaryColor;
            e.currentTarget.style.color = BRAND_COLORS.midnightFoundation;
            e.currentTarget.style.boxShadow = `0 8px 25px ${primaryColor}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = primaryColor;
            e.currentTarget.style.boxShadow = 'none';
          }}
          aria-label={`${pathway.ctaText} - ${pathway.title}`}
        >
          {pathway.ctaText}
        </button>
      </div>
    </div>
  );
};

export default Index;
