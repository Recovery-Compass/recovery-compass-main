import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompassLogo from '@/components/shared/CompassLogo';
import { trackBusinessEvent } from '@/lib/analytics';

const Personal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <CompassLogo 
            size="lg" 
            animated={true} 
            className="mx-auto mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]" 
          />
          
          <h1 className="font-heading text-4xl md:text-6xl font-black mb-6 text-white">
            Your Personal Journey
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover how your environment can become your strongest ally in recovery and personal growth
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Environmental Mastery
              </h3>
              <p className="text-white/80">
                Learn to design spaces and routines that naturally support your recovery goals
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Strength Discovery
              </h3>
              <p className="text-white/80">
                Identify your unique capabilities and leverage them for lasting change
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Practical Tools
              </h3>
              <p className="text-white/80">
                Access evidence-based strategies that work in real-world situations
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/5 rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-compass-gold">
              Ready to Begin?
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Start with our personalized environmental assessment to discover your path forward
            </p>
            <Link
              to="/personal/discovery"
              onClick={() => trackBusinessEvent('journey_choice', {
                choice: 'personal_discovery',
                from: 'personal_landing',
                timestamp: new Date().toISOString(),
              })}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-compass-gold to-tree-copper text-navy font-bold px-8 py-4 text-lg hover:scale-105 transition-all min-h-[3rem]"
              >
                Start Discovery Assessment
              </Button>
            </Link>
          </div>

          {/* Additional Context */}
          <div className="text-sm text-white/70 max-w-2xl mx-auto">
            <p>
              This assessment uses Environmental Response Architecture™ principles to help you 
              understand how your surroundings, routines, and relationships can be optimized 
              to support your personal recovery journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;