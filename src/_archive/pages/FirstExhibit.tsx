import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CompassLogo from '@/components/CompassLogo';
import { trackBusinessEvent } from '@/lib/analytics';

const FirstExhibit = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEngagement = () => {
    trackBusinessEvent('demo_request', {
      demo_type: 'first_exhibit_engagement',
      entry_point: 'wfd_story',
      timestamp: new Date().toISOString()
    });
    navigate('/compliance-compass');
  };

  return (
    <div className="min-h-screen relative px-4 py-8">
      {/* Breathing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean to-midnight-foundation animate-breathe" />
      
      <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Header with Logo */}
        <div className="text-center mb-12 sm:mb-16">
          <CompassLogo 
            size="lg" 
            animated={true} 
            className="mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" 
          />
          <h1 className="section-heading text-moon-glow mb-6">
            The First Exhibit
          </h1>
          <p className="text-moon-glow/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Where theory meets practice. The Whittier First Day story.
          </p>
        </div>

        {/* The Story */}
        <div className="grid gap-8 lg:gap-12 mb-16">
          
          {/* Challenge Section */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">The Challenge</h2>
            <p className="text-moon-glow/90 text-lg leading-relaxed mb-4">
              Whittier First Day faced a compliance landscape where 65% organizational performance 
              felt like an insurmountable ceiling. Traditional approaches had reached their limits.
            </p>
            <p className="text-moon-glow/90 text-lg leading-relaxed">
              The question wasn't just about meeting standards—it was about creating an environment 
              where excellence became the natural outcome.
            </p>
          </Card>

          {/* Methodology Section */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">Environmental Response Architecture™</h2>
            <p className="text-moon-glow/90 text-lg leading-relaxed mb-6">
              Rather than fighting systems, we designed new ones. Rather than managing problems, 
              we architected solutions into the environment itself.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-compass-gold mb-2">Assessment</div>
                <p className="text-moon-glow/80 text-sm">Environmental Response Patterns</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-compass-gold mb-2">Design</div>
                <p className="text-moon-glow/80 text-sm">Success-Inevitable Systems</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-compass-gold mb-2">Implementation</div>
                <p className="text-moon-glow/80 text-sm">Seamless Integration</p>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">The Results</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-5xl font-bold text-compass-gold mb-2">95%</div>
                <p className="text-moon-glow/90 text-lg">Compliance achievement in 90 days</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-compass-gold mb-2">46%</div>
                <p className="text-moon-glow/90 text-lg">Performance improvement</p>
              </div>
            </div>
            
            {/* Donna's Quote */}
            <div className="border-l-4 border-compass-gold pl-6 py-4 bg-compass-gold/5 rounded-r-lg">
              <blockquote className="text-moon-glow/95 text-xl italic leading-relaxed mb-4">
                "This wasn't just improvement—it was transformation. The environment itself became 
                our most powerful ally in achieving what we thought was impossible."
              </blockquote>
              <cite className="text-compass-gold font-medium">
                — Donna Richardson, Executive Director, Whittier First Day
              </cite>
            </div>
          </Card>

          {/* The Method */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow text-center">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">The Method Behind the Art</h2>
            <p className="text-moon-glow/90 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              This wasn't an accident. It was the inevitable result of Environmental Response Architecture™—
              the systematic design of environments where success becomes the path of least resistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/methodology')}
                variant="outline"
                className="border-compass-gold text-compass-gold hover:bg-compass-gold hover:text-midnight-foundation"
              >
                Explore the Method
              </Button>
              <Button 
                onClick={handleEngagement}
                className="bg-gradient-to-r from-compass-gold to-tree-copper text-midnight-foundation hover:scale-105 transition-all"
              >
                Transform Your Organization
              </Button>
            </div>
          </Card>
        </div>

        {/* Return Home */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-moon-glow/60 hover:text-compass-gold"
          >
            Return to Compass
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstExhibit;