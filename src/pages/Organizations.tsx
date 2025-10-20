import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompassLogo from '@/components/shared/CompassLogo';
import { trackBusinessEvent } from '@/lib/analytics';

const Organizations = () => {
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
            Organizational Transformation
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform organizational challenges into environmental opportunities using proven methodology
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Systems Thinking
              </h3>
              <p className="text-white/80">
                Address root causes through environmental design rather than individual behavior change
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Evidence-Based
              </h3>
              <p className="text-white/80">
                Leverage Environmental Response Architecture™ methodology proven in real-world settings
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
                Scalable Impact
              </h3>
              <p className="text-white/80">
                Create cascading positive effects across your entire organizational ecosystem
              </p>
            </div>
          </div>

          {/* Partnership & Evidence-Building */}
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm mb-12">
            <h2 className="font-heading text-2xl font-bold mb-6 text-compass-gold">
              Partnership & Evidence-Building
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="font-semibold text-white mb-3">Data Systems Partnership</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Recovery Compass and Whittier First Day will collaborate on a six-month 
                  pilot starting September 2025 to validate Environmental Response Design™ 
                  methodology through unified data collection using a Master Program Data 
                  Sheet with standardized fields and data integrity protocols.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-3">Research Goals</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Establish ERD as formally recognized evidence-based practice</li>
                  <li>• Co-author joint case study for professional publication</li>
                  <li>• Validate methodology through systematic data collection</li>
                  <li>• Advocate through professional platforms and networks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white/5 rounded-lg p-8 mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-compass-gold">
              Ready to Transform?
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Engage our AI-guided prompt system to analyze your organizational challenges 
              and receive expert-crafted transformation strategies
            </p>
            <Link
              to="/organizations/transform"
              onClick={() => trackBusinessEvent('journey_choice', {
                choice: 'organizational_transform',
                from: 'organizations_landing',
                timestamp: new Date().toISOString(),
              })}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-compass-gold to-tree-copper text-navy font-bold px-8 py-4 text-lg hover:scale-105 transition-all min-h-[3rem]"
              >
                Begin Transformation
              </Button>
            </Link>
          </div>

          {/* Additional Context */}
          <div className="text-sm text-white/70 max-w-2xl mx-auto">
            <p>
              Our transformation process uses Environmental Response Architecture™ to help 
              organizations create sustainable change through strategic environmental modifications 
              that support both individual and collective success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizations;