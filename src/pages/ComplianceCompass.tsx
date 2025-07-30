import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { trackBusinessEvent } from '@/lib/analytics';
import { DashboardPreview } from '@/components/DashboardPreview';
import { StripeCheckoutButton } from '@/components/StripeCheckoutButton';

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
      <div className="text-[3rem] font-heading heading-confident text-compass-gold mb-2">
        {value}
      </div>
      <h3 className="text-[1.5rem] font-heading heading-welcoming text-moon-glow mb-2">
        {label}
      </h3>
      <p className="text-moon-glow/70 font-body text-[0.875rem]">
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
        <section className="text-center py-20">
          <h1 className="text-moon-glow font-heading heading-confident text-[3.5rem] tracking-wide mb-4">
            The Compliance Compass<span className="text-[1.75rem] align-top">™</span>
          </h1>
          <p className="text-moon-glow/70 font-body text-lg max-w-3xl mx-auto leading-relaxed">
            Environmental Response Design™ achieving 95% KPI compliance 
            for healthcare organizations ready to lead, not follow.
          </p>
        </section>

        {/* Evidence Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 mb-20">
          <MetricCard 
            value="95%" 
            label="KPI Compliance Rate"
            detail="Healthcare case study"
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
            <h2 className="font-heading heading-confident text-3xl text-compass-gold mb-8 text-center">
              Environmental Response Design™
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-heading heading-welcoming text-xl text-moon-glow mb-4">
                  The Problem
                </h3>
                <p className="text-moon-glow/80 font-body leading-relaxed mb-6">
                  Healthcare organizations struggle with compliance not because of lack of effort, 
                  but because environments aren't designed for success. Traditional approaches 
                  treat symptoms, not root causes.
                </p>
                
                <h3 className="font-heading heading-welcoming text-xl text-moon-glow mb-4">
                  The Solution
                </h3>
                <p className="text-moon-glow/80 font-body leading-relaxed">
                  ERD™ transforms organizational environments to naturally support compliance. 
                  When the environment changes, behavior follows—without resistance.
                </p>
              </div>
              
              <div>
                <h3 className="font-heading heading-welcoming text-xl text-moon-glow mb-4">
                  The Results
                </h3>
                <ul className="space-y-3 text-moon-glow/80 font-body">
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
          <h2 className="font-heading heading-confident text-[2.25rem] text-moon-glow mb-6">
            Healthcare Transformation: From Crisis to Excellence
          </h2>
          <p className="text-moon-glow/80 font-body text-lg mb-8 max-w-3xl mx-auto">
            See how a Los Angeles healthcare facility achieved 95% compliance 
            in 90 days using Environmental Response Design™
          </p>
          
          <DashboardPreview />
        </section>

        {/* Intelligence Exchange Section */}
        <section className="text-center mb-20">
          <div className="intelligence-exchange">
            <h2 className="text-[2.25rem] font-inter font-bold text-moon-glow mb-6">
              Compliance Intelligence Exchange
            </h2>
            
            <p className="text-xl text-moon-glow/80 mb-8 max-w-3xl mx-auto">
              Get our proprietary AI compliance audit prompt. 
              Share your results. Receive personalized insights.
            </p>
            
            <button 
              onClick={() => {/* TODO: Open exchange modal */}}
              className="bg-gradient-to-r from-compass-gold to-tree-copper text-midnight-foundation font-inter font-bold px-12 py-4 rounded-[12px] hover:transform hover:translateY(-2px) transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
            >
              Get Your Free AI Compliance Audit
            </button>
            
            <p className="text-sm text-moon-glow/60 mt-4">
              Join 50+ organizations uncovering hidden compliance gaps
            </p>
          </div>
        </section>

        {/* Intelligence Value Prop */}
        <section className="intelligence-value-prop mb-20">
          <h2 className="text-[2.25rem] font-inter font-bold text-moon-glow text-center mb-12">
            Why 50+ Organizations Trust Our Intelligence Exchange
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="value-point text-center p-8">
              <h3 className="font-inter font-bold text-xl text-compass-gold mb-4">Immediate Insight</h3>
              <p className="text-moon-glow/80 font-inter">AI-powered compliance gaps revealed in minutes</p>
            </div>
            
            <div className="value-point text-center p-8">
              <h3 className="font-inter font-bold text-xl text-compass-gold mb-4">Custom Roadmap</h3>
              <p className="text-moon-glow/80 font-inter">Personalized pathway based on your specific gaps</p>
            </div>
            
            <div className="value-point text-center p-8">
              <h3 className="font-inter font-bold text-xl text-compass-gold mb-4">Ongoing Intelligence</h3>
              <p className="text-moon-glow/80 font-inter">Weekly insights from aggregated compliance data</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComplianceCompass;