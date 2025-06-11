
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Target, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState('30-day');

  const phases = {
    '30-day': {
      title: '30-Day Foundation',
      subtitle: 'Pilot Deployment & Early Validation',
      milestones: [
        { title: 'WFD Partnership Launch', status: 'completed', impact: '500 initial users' },
        { title: 'Platform Core Deployment', status: 'in-progress', impact: 'Basic FSP functionality' },
        { title: 'CSULA Research Integration', status: 'planned', impact: 'Academic validation' },
        { title: 'Initial Outcome Measurement', status: 'planned', impact: 'Baseline metrics established' }
      ]
    },
    '60-day': {
      title: '60-Day Expansion',
      subtitle: 'Partnership Growth & Platform Optimization',
      milestones: [
        { title: 'Healthcare System Pilots', status: 'planned', impact: '3 health systems engaged' },
        { title: 'AI Model Optimization', status: 'planned', impact: '40% accuracy improvement' },
        { title: 'Mobile Platform Launch', status: 'planned', impact: 'Accessibility expansion' },
        { title: 'Provider Training Program', status: 'planned', impact: '100 providers certified' }
      ]
    },
    '90-day': {
      title: '90-Day Scale Preparation',
      subtitle: 'Market Validation & Scaling Infrastructure',
      milestones: [
        { title: 'Series A Funding Close', status: 'planned', impact: '$5M capital raised' },
        { title: 'Multi-State Expansion', status: 'planned', impact: '5 states operational' },
        { title: 'Enterprise Sales Team', status: 'planned', impact: '3 dedicated reps hired' },
        { title: 'Regulatory Compliance', status: 'planned', impact: 'HIPAA, FDA guidance' }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-teal/20 text-teal';
      case 'in-progress': return 'bg-gold/20 text-gold';
      case 'planned': return 'bg-bronze/20 text-bronze';
      default: return 'bg-moonlight/20 text-moonlight';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Zap className="h-4 w-4" />;
      case 'planned': return <Target className="h-4 w-4" />;
      default: return null;
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
          
          <h1 className="text-moonlight mb-6">30-60-90 Day Execution Roadmap</h1>
          <p className="text-xl text-moonlight/80 max-w-3xl">
            Detailed milestone tracking with success metrics, risk mitigation, 
            and resource allocation for rapid market validation and growth.
          </p>
        </div>
      </section>

      {/* Phase Navigation */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <div className="flex justify-center mb-16">
            <div className="flex bg-navy/50 rounded-lg p-1">
              {Object.entries(phases).map(([key, phase]) => (
                <Button
                  key={key}
                  variant={activePhase === key ? 'default' : 'ghost'}
                  onClick={() => setActivePhase(key)}
                  className="text-sm"
                >
                  {phase.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Phase Detail */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-navy/80 border-moonlight/30 mb-12">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-bronze mr-3" />
                  <div>
                    <CardTitle className="text-moonlight text-2xl">{phases[activePhase].title}</CardTitle>
                    <CardDescription className="text-moonlight/70 text-lg">
                      {phases[activePhase].subtitle}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {phases[activePhase].milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-navy/50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(milestone.status)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-moonlight font-semibold">{milestone.title}</h4>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-moonlight/70 text-sm">{milestone.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Metrics & Risk Mitigation */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Success Metrics & Risk Management</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-navy/80 border-teal/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <Target className="mr-2 h-5 w-5 text-teal" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">User Engagement Rate</span>
                    <span className="text-teal font-semibold">Target: 75%+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Partner Satisfaction</span>
                    <span className="text-teal font-semibold">Target: 4.5/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Monthly Recurring Revenue</span>
                    <span className="text-teal font-semibold">Target: $50K+ by Day 90</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Platform Uptime</span>
                    <span className="text-teal font-semibold">Target: 99.5%+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-bronze/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <Users className="mr-2 h-5 w-5 text-bronze" />
                  Risk Mitigation Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-bronze font-semibold mb-1">Technical Risk</div>
                    <div className="text-moonlight/70 text-sm">Phased rollout with rollback capabilities</div>
                  </div>
                  <div>
                    <div className="text-bronze font-semibold mb-1">Regulatory Risk</div>
                    <div className="text-moonlight/70 text-sm">Early engagement with FDA and state regulators</div>
                  </div>
                  <div>
                    <div className="text-bronze font-semibold mb-1">Market Risk</div>
                    <div className="text-moonlight/70 text-sm">Multiple pilot partnerships to validate demand</div>
                  </div>
                  <div>
                    <div className="text-bronze font-semibold mb-1">Funding Risk</div>
                    <div className="text-moonlight/70 text-sm">Revenue diversification and bootstrap capability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Allocation */}
          <Card className="bg-navy/80 border-gold/30 mt-12">
            <CardHeader>
              <CardTitle className="text-moonlight text-center">Resource Allocation (90 Days)</CardTitle>
              <CardDescription className="text-center text-moonlight/70">
                Strategic deployment of capital and human resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">40%</div>
                  <div className="text-moonlight/70">Platform Development</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    AI optimization, mobile app
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">25%</div>
                  <div className="text-moonlight/70">Partnership Development</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Business development, integration
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">20%</div>
                  <div className="text-moonlight/70">Operations & Compliance</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Regulatory, quality assurance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">15%</div>
                  <div className="text-moonlight/70">Team Expansion</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Key hires, advisory board
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-moonlight/70 mb-6 text-lg">
              Ready to partner with Recovery Compass in transforming recovery infrastructure?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="cta">
                Schedule Partnership Discussion
              </Button>
              <Button variant="outline" size="cta" className="border-moonlight text-moonlight hover:bg-moonlight hover:text-navy">
                Download Executive Summary
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;
