
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestorContactSection from '@/components/partnership/InvestorContactSection';

const MarketAnalysis = () => {
  const [visibleCounter, setVisibleCounter] = useState(0);
  const [invisibleCounter, setInvisibleCounter] = useState(0);

  useEffect(() => {
    // Animate counters
    const visibleTarget = 1000000; // 1M visible market
    const invisibleTarget = 19000000; // 19M invisible market
    
    const visibleInterval = setInterval(() => {
      setVisibleCounter(prev => {
        if (prev >= visibleTarget) {
          clearInterval(visibleInterval);
          return visibleTarget;
        }
        return prev + 50000;
      });
    }, 100);

    const invisibleInterval = setInterval(() => {
      setInvisibleCounter(prev => {
        if (prev >= invisibleTarget) {
          clearInterval(invisibleInterval);
          return invisibleTarget;
        }
        return prev + 950000;
      });
    }, 100);

    return () => {
      clearInterval(visibleInterval);
      clearInterval(invisibleInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy text-moonlight">
      {/* Header */}
      <section className="py-16">
        <div className="content-container">
          <Link to="/investor-pitch" className="inline-flex items-center text-bronze hover:text-gold transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Overview
          </Link>
          
          <h1 className="text-moonlight mb-6">The Invisible Recovery Market</h1>
          <p className="text-xl text-moonlight/80 max-w-3xl">
            95% of Americans with substance use disorders remain outside traditional treatment systems, 
            representing a massive underserved market opportunity.
          </p>
        </div>
      </section>

      {/* Market Iceberg Visualization */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Market Iceberg: Visible vs Invisible</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Above Water (Visible Market) */}
            <div className="relative mb-8">
              <Card className="bg-teal/20 border-teal">
                <CardHeader>
                  <CardTitle className="text-teal flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Visible Market (5%)
                  </CardTitle>
                  <CardDescription className="text-moonlight/70">
                    Currently receiving treatment through traditional systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-teal mb-4">
                    {(visibleCounter / 1000000).toFixed(1)}M
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-teal font-semibold">Inpatient Treatment</div>
                      <div className="text-moonlight/70">~300K annually</div>
                    </div>
                    <div>
                      <div className="text-teal font-semibold">Outpatient Programs</div>
                      <div className="text-moonlight/70">~700K actively enrolled</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Waterline */}
            <div className="flex items-center justify-center my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-moonlight to-transparent"></div>
              <div className="px-4 text-moonlight/60 text-sm">Treatment Access Waterline</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-moonlight to-transparent"></div>
            </div>

            {/* Below Water (Invisible Market) */}
            <div className="relative">
              <Card className="bg-bronze/20 border-bronze">
                <CardHeader>
                  <CardTitle className="text-bronze flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Invisible Market (95%)
                  </CardTitle>
                  <CardDescription className="text-moonlight/70">
                    Underserved population with substance use disorders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-bronze mb-4">
                    {(invisibleCounter / 1000000).toFixed(1)}M
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <div className="text-bronze font-semibold">Geographic Barriers</div>
                      <div className="text-moonlight/70">Rural/remote areas</div>
                    </div>
                    <div>
                      <div className="text-bronze font-semibold">Economic Barriers</div>
                      <div className="text-moonlight/70">Cost and insurance gaps</div>
                    </div>
                    <div>
                      <div className="text-bronze font-semibold">Social Barriers</div>
                      <div className="text-moonlight/70">Stigma and privacy concerns</div>
                    </div>
                    <div>
                      <div className="text-bronze font-semibold">System Barriers</div>
                      <div className="text-moonlight/70">Waitlists and capacity limits</div>
                    </div>
                  </div>
                  
                  <div className="bg-navy/50 p-4 rounded-lg">
                    <h4 className="text-gold font-semibold mb-2">Recovery Compass Opportunity</h4>
                    <p className="text-moonlight/80 text-sm">
                      AI-powered environmental design removes barriers for this underserved population, 
                      creating sustainable revenue while generating massive social impact.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Analysis */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Treatment Desert Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-navy/80 border-bronze/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-bronze" />
                  Geographic Barriers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Rural Counties</span>
                    <span className="text-bronze font-semibold">68% lack treatment facilities</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Average Distance</span>
                    <span className="text-bronze font-semibold">87 miles to nearest facility</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Public Transportation</span>
                    <span className="text-bronze font-semibold">23% accessible by transit</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-teal/30">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-teal" />
                  Market Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Total Addressable Market</span>
                    <span className="text-teal font-semibold">$240B annually</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Serviceable Market</span>
                    <span className="text-teal font-semibold">$48B (20%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-moonlight/70">Initial Target</span>
                    <span className="text-teal font-semibold">$2.4B (5%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/solution-demo">
              <Button variant="cta" size="cta">
                See How We Address These Barriers
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

export default MarketAnalysis;
