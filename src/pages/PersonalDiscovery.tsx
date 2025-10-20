import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CompassLogo from '@/components/shared/CompassLogo';
import { trackBusinessEvent } from '@/lib/analytics';

const PersonalDiscovery = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    trackBusinessEvent('journey_choice', {
      choice: 'environmental_assessment',
      from: 'personal_discovery',
      timestamp: new Date().toISOString(),
    });
    navigate('/environmental-design');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-navy-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <CompassLogo 
            size="lg" 
            animated={true} 
            className="mx-auto mb-8 drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]" 
          />
          
          {/* Header */}
          <h1 className="font-heading text-4xl md:text-5xl font-black mb-6 text-white">
            Personal Discovery Assessment
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Explore your unique strengths and environmental opportunities through our personalized assessment
          </p>

          {/* What You'll Discover */}
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm mb-12">
            <h2 className="font-heading text-2xl font-bold mb-6 text-compass-gold">
              What You'll Discover
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Environmental Strengths</h3>
                  <p className="text-white/80 text-sm">
                    Identify spaces, routines, and relationships that naturally support your well-being
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Growth Opportunities</h3>
                  <p className="text-white/80 text-sm">
                    Discover areas where small environmental changes can create significant impact
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Personalized Strategy</h3>
                  <p className="text-white/80 text-sm">
                    Receive tailored recommendations based on your unique situation and goals
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-compass-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Action Steps</h3>
                  <p className="text-white/80 text-sm">
                    Get specific, practical steps you can implement immediately
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Details */}
          <div className="bg-white/5 rounded-lg p-6 mb-12">
            <h3 className="font-heading text-xl font-bold mb-4 text-compass-gold">
              Assessment Details
            </h3>
            <div className="text-white/80 space-y-2">
              <p>• Takes approximately 10-15 minutes to complete</p>
              <p>• Evidence-based questions focused on environmental factors</p>
              <p>• Immediate personalized insights upon completion</p>
              <p>• Asset-based approach emphasizing your existing strengths</p>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={handleStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-compass-gold to-tree-copper text-navy font-bold px-8 py-4 text-lg hover:scale-105 transition-all min-h-[3rem]"
          >
            Begin Assessment
          </Button>
          
          <p className="text-sm text-white/60 mt-6">
            Your responses help us understand how to make your environment your strongest ally
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDiscovery;