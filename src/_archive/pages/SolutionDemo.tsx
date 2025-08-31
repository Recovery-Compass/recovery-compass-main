
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestorContactSection from '../components/partnership/InvestorContactSection';

const SolutionDemo = () => {
  const [activeDemo, setActiveDemo] = useState('environmental-design');

  const demos = {
    'environmental-design': {
      title: 'Environmental Response Design™',
      description: 'AI-powered system that removes barriers instead of requiring individuals to overcome them',
      features: [
        'Real-time risk assessment and environmental modification',
        'Predictive analytics for intervention timing',
        'Adaptive support matching based on individual needs',
        'Integration with existing healthcare infrastructure'
      ]
    },
    'fsp-model': {
      title: 'Full Service Patient/Provider/Partner Model',
      description: 'Comprehensive platform serving all stakeholders in the recovery ecosystem',
      features: [
        'Patient: Ambient support without stigma or barriers',
        'Provider: Enhanced capacity through AI assistance',
        'Partner: Measurable outcomes and ROI tracking',
        'System: Reduced costs through prevention focus'
      ]
    },
    'ai-platform': {
      title: 'AI Platform Architecture',
      description: 'Scalable technology infrastructure designed for universal accessibility',
      features: [
        'WCAG 2.1 AA compliant interface design',
        'Multi-modal interaction (voice, text, visual)',
        'Privacy-first data architecture',
        'Real-time outcome measurement and optimization'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-navy text-moonlight">
      {/* Header */}
      <section className="py-16">
        <div className="content-container">
          <Link to="/investor-pitch" className="inline-flex items-center text-bronze hover:text-gold transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Link>
          
          <h1 className="text-moonlight mb-6">Recovery Compass Platform</h1>
          <p className="text-xl text-moonlight/80 max-w-3xl">
            AI-powered infrastructure that transforms recovery support from a 
            treatment-focused to an environment-focused approach.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Platform Capabilities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                activeDemo === 'environmental-design' 
                  ? 'bg-bronze/20 border-bronze' 
                  : 'bg-navy/80 border-moonlight/20 hover:border-bronze/50'
              }`}
              onClick={() => setActiveDemo('environmental-design')}
            >
              <CardHeader>
                <Brain className={`h-8 w-8 mb-2 ${activeDemo === 'environmental-design' ? 'text-bronze' : 'text-moonlight'}`} />
                <CardTitle className="text-moonlight">Environmental Response Design™</CardTitle>
                <CardDescription className="text-moonlight/70">
                  AI removes barriers instead of requiring individuals to overcome them
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                activeDemo === 'fsp-model' 
                  ? 'bg-teal/20 border-teal' 
                  : 'bg-navy/80 border-moonlight/20 hover:border-teal/50'
              }`}
              onClick={() => setActiveDemo('fsp-model')}
            >
              <CardHeader>
                <Users className={`h-8 w-8 mb-2 ${activeDemo === 'fsp-model' ? 'text-teal' : 'text-moonlight'}`} />
                <CardTitle className="text-moonlight">FSP Model</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Full Service Patient/Provider/Partner ecosystem approach
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                activeDemo === 'ai-platform' 
                  ? 'bg-gold/20 border-gold' 
                  : 'bg-navy/80 border-moonlight/20 hover:border-gold/50'
              }`}
              onClick={() => setActiveDemo('ai-platform')}
            >
              <CardHeader>
                <Zap className={`h-8 w-8 mb-2 ${activeDemo === 'ai-platform' ? 'text-gold' : 'text-moonlight'}`} />
                <CardTitle className="text-moonlight">AI Platform</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Scalable, accessible technology infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Demo Content */}
          <Card className="bg-navy/80 border-moonlight/30">
            <CardHeader>
              <CardTitle className="text-moonlight text-2xl">{demos[activeDemo].title}</CardTitle>
              <CardDescription className="text-moonlight/70 text-lg">
                {demos[activeDemo].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demos[activeDemo].features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-bronze rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-moonlight/80">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Technical Architecture</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-navy/80 border-bronze/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-bronze" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">HIPAA Compliance</span>
                    <Badge variant="secondary" className="bg-bronze/20 text-bronze">Certified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">End-to-End Encryption</span>
                    <Badge variant="secondary" className="bg-bronze/20 text-bronze">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">Data Minimization</span>
                    <Badge variant="secondary" className="bg-bronze/20 text-bronze">Privacy by Design</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-teal/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-teal" />
                  Scalability & Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">Cloud Infrastructure</span>
                    <Badge variant="secondary" className="bg-teal/20 text-teal">Auto-scaling</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">API Response Time</span>
                    <Badge variant="secondary" className="bg-teal/20 text-teal">{'<'}150ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-moonlight/70">Uptime SLA</span>
                    <Badge variant="secondary" className="bg-teal/20 text-teal">99.9%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-moonlight/70 mb-6">
              Ready to see the financial model behind this technology platform?
            </p>
            <Link to="/business-model">
              <Button variant="cta" size="cta" className="group">
                View Business Model
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <InvestorContactSection />
    </div>
  );
};

export default SolutionDemo;
