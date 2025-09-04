
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestorContactSection from '@/components/partnership/InvestorContactSection';

const ImpactMetrics = () => {
  const [timeframe, setTimeframe] = useState('year1');

  const impactData = {
    year1: {
      peopleServed: 50000,
      costSavings: 15000000,
      employmentGains: 12500,
      sroi: 4.2
    },
    year3: {
      peopleServed: 250000,
      costSavings: 75000000,
      employmentGains: 62500,
      sroi: 5.8
    },
    year5: {
      peopleServed: 750000,
      costSavings: 225000000,
      employmentGains: 187500,
      sroi: 7.3
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
          
          <h1 className="text-moonlight mb-6">Social Impact Measurement</h1>
          <p className="text-xl text-moonlight/80 max-w-3xl">
            Quantifiable social return on investment demonstrating both 
            financial sustainability and meaningful community impact.
          </p>
        </div>
      </section>

      {/* SROI Calculator */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Social Return on Investment</h2>
          
          <div className="flex justify-center mb-8">
            <div className="flex bg-navy/50 rounded-lg p-1">
              <Button
                variant={timeframe === 'year1' ? 'default' : 'ghost'}
                onClick={() => setTimeframe('year1')}
                className="text-sm"
              >
                Year 1
              </Button>
              <Button
                variant={timeframe === 'year3' ? 'default' : 'ghost'}
                onClick={() => setTimeframe('year3')}
                className="text-sm"
              >
                Year 3
              </Button>
              <Button
                variant={timeframe === 'year5' ? 'default' : 'ghost'}
                onClick={() => setTimeframe('year5')}
                className="text-sm"
              >
                Year 5
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-bronze/20 border-bronze text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-bronze mx-auto mb-2" />
                <CardTitle className="text-moonlight">People Served</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-bronze mb-2">
                  {(impactData[timeframe].peopleServed / 1000).toFixed(0)}K
                </div>
                <div className="text-moonlight/70 text-sm">
                  Individuals receiving support
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal/20 border-teal text-center">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-teal mx-auto mb-2" />
                <CardTitle className="text-moonlight">Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-teal mb-2">
                  ${(impactData[timeframe].costSavings / 1000000).toFixed(0)}M
                </div>
                <div className="text-moonlight/70 text-sm">
                  Healthcare system savings
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gold/20 border-gold text-center">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-gold mx-auto mb-2" />
                <CardTitle className="text-moonlight">Employment Gains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-gold mb-2">
                  {(impactData[timeframe].employmentGains / 1000).toFixed(1)}K
                </div>
                <div className="text-moonlight/70 text-sm">
                  People returning to work
                </div>
              </CardContent>
            </Card>

            <Card className="bg-moonlight/20 border-moonlight text-center">
              <CardHeader>
                <Heart className="h-8 w-8 text-moonlight mx-auto mb-2" />
                <CardTitle className="text-moonlight">SROI Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-moonlight mb-2">
                  {impactData[timeframe].sroi}:1
                </div>
                <div className="text-moonlight/70 text-sm">
                  Social return per dollar invested
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Outcome Measurement */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Measurable Outcomes</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-navy/80 border-bronze/30">
              <CardHeader>
                <CardTitle className="text-moonlight">Individual Outcomes</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Tracked at person level with privacy protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Treatment Engagement</span>
                    <span className="text-bronze font-semibold">+340% increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Housing Stability</span>
                    <span className="text-bronze font-semibold">+180% improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Employment Retention</span>
                    <span className="text-bronze font-semibold">+220% increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Emergency Room Visits</span>
                    <span className="text-bronze font-semibold">-65% reduction</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-teal/30">
              <CardHeader>
                <CardTitle className="text-moonlight">System Outcomes</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Healthcare and social service improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Provider Capacity</span>
                    <span className="text-teal font-semibold">+150% effective increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Cost Per Outcome</span>
                    <span className="text-teal font-semibold">-45% reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Wait Times</span>
                    <span className="text-teal font-semibold">-70% reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">System Integration</span>
                    <span className="text-teal font-semibold">+400% improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Impact */}
          <Card className="bg-navy/80 border-gold/30 mt-12">
            <CardHeader>
              <CardTitle className="text-moonlight text-center">Community Impact Multiplier</CardTitle>
              <CardDescription className="text-center text-moonlight/70">
                Universal design benefits extend beyond recovery to broader community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">2.3x</div>
                  <div className="text-moonlight/70">Family Member Benefits</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Reduced stress, improved stability
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">4.1x</div>
                  <div className="text-moonlight/70">Employer Benefits</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Reduced absenteeism, improved productivity
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gold mb-2">6.2x</div>
                  <div className="text-moonlight/70">Community Benefits</div>
                  <div className="text-moonlight/60 text-sm mt-1">
                    Reduced crime, improved social cohesion
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-moonlight/70 mb-6">
              Ready to see our execution roadmap and next steps?
            </p>
            <Link to="/roadmap">
              <Button variant="cta" size="cta" className="group">
                View Execution Roadmap
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

export default ImpactMetrics;
