
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '@/components/Section';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('compass');
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    compass: null,
  });

  // Handle navigation between sections and external routes
  const handleNavigate = (sectionId: string) => {
    // Check if it's an external route (starts with /)
    if (sectionId.startsWith('/')) {
      navigate(sectionId);
      return;
    }
    
    // Handle internal section navigation
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setCurrentSection('compass');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Breathing twilight background */}
      <div className="absolute inset-0 twilight-aurora-bg"></div>
      {/* Compass/Home Section */}
      <Section id="compass" className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
      </Section>
      
      {/* Three Pillars of Safety */}
      <section className="three-pillars-safety py-20 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-montserrat text-center mb-16 text-white">
          Every Transformation Begins With Safety
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Physical Safety Card */}
          <div className="safety-card">
            <div className="icon-glow text-6xl mb-6">🏠</div>
            <h3 className="text-xl font-montserrat font-semibold text-white mb-4">Physical Safety</h3>
            <p className="text-white/80 font-montserrat">A stable foundation where basic needs are met</p>
          </div>
          
          {/* Emotional Safety Card */}
          <div className="safety-card">
            <div className="icon-glow text-6xl mb-6">❤️</div>
            <h3 className="text-xl font-montserrat font-semibold text-white mb-4">Emotional Safety</h3>
            <p className="text-white/80 font-montserrat">Freedom to feel without judgment or shame</p>
          </div>
          
          {/* Psychological Safety Card */}
          <div className="safety-card">
            <div className="icon-glow text-6xl mb-6">🧠</div>
            <h3 className="text-xl font-montserrat font-semibold text-white mb-4">Psychological Safety</h3>
            <p className="text-white/80 font-montserrat">Space to explore, fail, and grow without fear</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
