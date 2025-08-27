import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CompassLogo from '@/components/CompassLogo';
import { trackBusinessEvent } from '@/lib/analytics';

const Methodology = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEngagement = () => {
    trackBusinessEvent('demo_request', {
      demo_type: 'methodology_engagement',
      entry_point: 'artist_statement',
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
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <CompassLogo 
            size="lg" 
            animated={true} 
            className="mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]" 
          />
          <h1 className="section-heading text-moon-glow mb-6">
            The Artist's Statement
          </h1>
          <p className="text-moon-glow/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            The philosophy behind Environmental Response Architecture™
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 mb-16">
          
          {/* Core Philosophy */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">First Principles</h2>
            <div className="prose prose-lg text-moon-glow/90 max-w-none">
              <p className="mb-6 leading-relaxed">
                We start with a simple truth: humans are environmental response systems. We don't operate 
                in isolation from our surroundings—we are expressions of them. Traditional change management 
                fights this reality. Environmental Response Architecture™ harnesses it.
              </p>
              <p className="mb-6 leading-relaxed">
                When compliance fails, the problem isn't the people. It's the environment that makes 
                non-compliance the path of least resistance. When organizations struggle, the issue isn't 
                capability—it's the systematic design of friction in the wrong places.
              </p>
              <p className="leading-relaxed">
                We design environments where success becomes inevitable because it becomes easiest.
              </p>
            </div>
          </Card>

          {/* The Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-moon-glow/20 p-6 text-center brand-radius brand-shadow">
              <h3 className="text-xl font-heading text-compass-gold mb-4">Assessment</h3>
              <p className="text-moon-glow/90 leading-relaxed">
                Map the invisible architecture of current environmental responses. 
                Identify where friction serves the wrong outcomes.
              </p>
            </Card>
            <Card className="bg-white/5 border-moon-glow/20 p-6 text-center brand-radius brand-shadow">
              <h3 className="text-xl font-heading text-compass-gold mb-4">Design</h3>
              <p className="text-moon-glow/90 leading-relaxed">
                Engineer systems where desired behaviors become the natural, 
                effortless response to environmental cues.
              </p>
            </Card>
            <Card className="bg-white/5 border-moon-glow/20 p-6 text-center brand-radius brand-shadow">
              <h3 className="text-xl font-heading text-compass-gold mb-4">Integration</h3>
              <p className="text-moon-glow/90 leading-relaxed">
                Implement seamlessly within existing structures, 
                creating transformation without disruption.
              </p>
            </Card>
          </div>

          {/* The Science */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">The Science Behind the Art</h2>
            <div className="prose prose-lg text-moon-glow/90 max-w-none">
              <p className="mb-6 leading-relaxed">
                Environmental Response Architecture™ synthesizes behavioral economics, systems theory, 
                and trauma-informed design principles. It recognizes that sustainable change happens 
                at the level of environmental structure, not individual willpower.
              </p>
              <p className="mb-6 leading-relaxed">
                This isn't about motivation or inspiration—it's about physics. When you design an 
                environment correctly, success becomes as natural as water flowing downhill. Resistance 
                disappears because you're no longer asking people to swim upstream.
              </p>
              <p className="leading-relaxed">
                The methodology has been validated across healthcare, education, and organizational 
                development contexts. The pattern is consistent: when environments are designed for 
                inevitable success, organizations discover capabilities they didn't know they possessed.
              </p>
            </div>
          </Card>

          {/* Applications */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">Applications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-compass-gold mb-3">Organizational Excellence</h3>
                <ul className="text-moon-glow/90 space-y-2 leading-relaxed">
                  <li>• Compliance systems that self-maintain</li>
                  <li>• Performance cultures that self-reinforce</li>
                  <li>• Innovation environments that self-generate</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-compass-gold mb-3">Individual Development</h3>
                <ul className="text-moon-glow/90 space-y-2 leading-relaxed">
                  <li>• Recovery environments that support healing</li>
                  <li>• Learning systems that eliminate friction</li>
                  <li>• Growth pathways that feel effortless</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Philosophy Statement */}
          <Card className="bg-compass-gold/10 border-compass-gold/30 p-8 brand-radius brand-shadow text-center">
            <blockquote className="text-moon-glow text-xl italic leading-relaxed mb-6">
              "We are not separate from our environments. We are their expression. 
              Change the environment with sufficient precision, and transformation becomes inevitable."
            </blockquote>
            <cite className="text-compass-gold font-medium">
              — Recovery Compass Methodology
            </cite>
          </Card>

          {/* Call to Action */}
          <Card className="bg-white/5 border-moon-glow/20 p-8 brand-radius brand-shadow text-center">
            <h2 className="text-2xl font-heading text-compass-gold mb-6">Experience the Method</h2>
            <p className="text-moon-glow/90 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Environmental Response Architecture™ isn't theory—it's practice. See how it transforms 
              organizations and individuals alike.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/first-exhibit')}
                variant="outline"
                className="border-compass-gold text-compass-gold hover:bg-compass-gold hover:text-midnight-foundation"
              >
                See the Proof
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

export default Methodology;