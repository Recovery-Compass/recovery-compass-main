import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackBusinessEvent } from '@/lib/analytics';

const ComplianceCompass = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleExecutiveBriefing = () => {
    trackBusinessEvent('demo_request', {
      demo_type: 'executive_briefing',
      entry_point: 'compliance_compass_cta',
      timestamp: new Date().toISOString()
    });
    navigate('/investor-pitch');
  };

  const MetricCard = ({ value, label, detail }: { value: string; label: string; detail: string }) => (
    <Card className="bg-midnight-foundation/50 backdrop-blur border border-compass-gold/20 p-8 text-center hover:border-compass-gold/40 transition-all duration-300">
      <div className="text-4xl font-montserrat font-black text-compass-gold mb-2 metric">
        {value}
      </div>
      <h3 className="text-xl font-montserrat font-semibold text-moon-glow mb-2">
        {label}
      </h3>
      <p className="text-moon-glow/70 font-montserrat">
        {detail}
      </p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] to-midnight-foundation">
      <div 
        className={cn(
          'max-w-7xl mx-auto px-8 py-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="font-montserrat font-black text-5xl text-moon-glow mb-6 tracking-wide">
            The Compliance Compass™
          </h1>
          <p className="text-xl text-moon-glow/70 mt-4 max-w-3xl mx-auto font-montserrat leading-relaxed">
            Environmental Response Design™ achieving 95% KPI compliance 
            for healthcare organizations ready to lead, not follow.
          </p>
        </section>

        {/* Evidence Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <MetricCard 
            value="95%" 
            label="KPI Compliance Rate"
            detail="Whittier First Day case study"
          />
          <MetricCard 
            value="65→95" 
            label="90-Day Transformation"
            detail="From crisis to excellence"
          />
          <MetricCard 
            value="ERD™" 
            label="Proprietary Methodology"
            detail="Patent-pending approach"
          />
        </section>

        {/* Methodology Section */}
        <section className="mb-20">
          <Card className="bg-deep-ocean/30 backdrop-blur border border-compass-gold/30 p-12">
            <h2 className="font-montserrat font-bold text-3xl text-compass-gold mb-8 text-center">
              Environmental Response Design™
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-montserrat font-semibold text-xl text-moon-glow mb-4">
                  The Problem
                </h3>
                <p className="text-moon-glow/80 font-montserrat leading-relaxed mb-6">
                  Healthcare organizations struggle with compliance not because of lack of effort, 
                  but because environments aren't designed for success. Traditional approaches 
                  treat symptoms, not root causes.
                </p>
                
                <h3 className="font-montserrat font-semibold text-xl text-moon-glow mb-4">
                  The Solution
                </h3>
                <p className="text-moon-glow/80 font-montserrat leading-relaxed">
                  ERD™ transforms organizational environments to naturally support compliance. 
                  When the environment changes, behavior follows—without resistance.
                </p>
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-xl text-moon-glow mb-4">
                  The Results
                </h3>
                <ul className="space-y-3 text-moon-glow/80 font-montserrat">
                  <li>• 95% sustained KPI compliance rates</li>
                  <li>• 30% reduction in staff turnover</li>
                  <li>• 40% improvement in patient satisfaction</li>
                  <li>• 25% decrease in regulatory violations</li>
                  <li>• ROI visible within 90 days</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Case Study Teaser */}
        <section className="text-center mb-20">
          <h2 className="font-montserrat font-bold text-3xl text-moon-glow mb-6">
            Whittier First Day: From Crisis to Excellence
          </h2>
          <p className="text-moon-glow/80 font-montserrat text-lg mb-8 max-w-3xl mx-auto">
            See how a struggling healthcare facility achieved 95% compliance 
            in 90 days using Environmental Response Design™
          </p>
          
          <div className="bg-midnight-foundation/50 rounded-lg p-8 max-w-4xl mx-auto border border-compass-gold/20">
            <div className="aspect-video bg-deep-ocean/30 rounded-lg flex items-center justify-center border border-compass-gold/20">
              <p className="text-compass-gold font-montserrat text-lg">
                Dashboard Preview Coming Soon
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Button 
            onClick={handleExecutiveBriefing}
            className="px-16 py-8 text-xl font-montserrat font-black tracking-wide bg-gradient-to-r from-compass-gold to-tree-copper text-midnight-foundation hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 rounded-md uppercase"
          >
            Schedule Executive Briefing
          </Button>
          <p className="text-moon-glow/60 font-montserrat text-sm mt-4">
            Exclusive presentation for healthcare leadership teams
          </p>
        </section>
      </div>
    </div>
  );
};

export default ComplianceCompass;