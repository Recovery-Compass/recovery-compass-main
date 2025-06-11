
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessModel = () => {
  const [selectedScenario, setSelectedScenario] = useState('conservative');

  const scenarios = {
    conservative: {
      year1: { revenue: 500000, customers: 50, arr: 10000 },
      year3: { revenue: 5000000, customers: 250, arr: 20000 },
      year5: { revenue: 25000000, customers: 833, arr: 30000 }
    },
    optimistic: {
      year1: { revenue: 1000000, customers: 80, arr: 12500 },
      year3: { revenue: 15000000, customers: 500, arr: 30000 },
      year5: { revenue: 75000000, customers: 1500, arr: 50000 }
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
          
          <h1 className="text-moonlight mb-6">Sustainable Business Model</h1>
          <p className="text-xl text-moonlight/80 max-w-3xl">
            SaaS platform with recurring revenue, high gross margins, and 
            proven unit economics that scale without grant dependency.
          </p>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Revenue Streams</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-bronze/20 border-bronze">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-bronze mb-2" />
                <CardTitle className="text-moonlight">B2B2C Partnerships</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Healthcare systems and payers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-bronze mb-2">60%</div>
                <div className="text-moonlight/80 text-sm">
                  Primary revenue from institutional partnerships
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Per Member Per Month</span>
                    <span className="text-bronze">$15-45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Typical Contract</span>
                    <span className="text-bronze">3-5 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-teal/20 border-teal">
              <CardHeader>
                <Users className="h-8 w-8 text-teal mb-2" />
                <CardTitle className="text-moonlight">Enterprise Licenses</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Recovery organizations and clinics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-teal mb-2">30%</div>
                <div className="text-moonlight/80 text-sm">
                  Direct B2B software licensing
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Annual License</span>
                    <span className="text-teal">$50K-200K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Implementation</span>
                    <span className="text-teal">$25K-75K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gold/20 border-gold">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-gold mb-2" />
                <CardTitle className="text-moonlight">Outcome-Based Pricing</CardTitle>
                <CardDescription className="text-moonlight/70">
                  Performance bonuses and shared savings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-gold mb-2">10%</div>
                <div className="text-moonlight/80 text-sm">
                  Premium revenue from proven outcomes
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Success Fee</span>
                    <span className="text-gold">10-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Shared Savings</span>
                    <span className="text-gold">30-50%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Projections */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Financial Projections</h2>
          
          <div className="flex justify-center mb-8">
            <div className="flex bg-navy/50 rounded-lg p-1">
              <Button
                variant={selectedScenario === 'conservative' ? 'default' : 'ghost'}
                onClick={() => setSelectedScenario('conservative')}
                className="text-sm"
              >
                Conservative
              </Button>
              <Button
                variant={selectedScenario === 'optimistic' ? 'default' : 'ghost'}
                onClick={() => setSelectedScenario('optimistic')}
                className="text-sm"
              >
                Optimistic
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-navy/80 border-moonlight/30">
              <CardHeader>
                <CardTitle className="text-moonlight text-center">Year 1</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-black text-bronze mb-2">
                  ${(scenarios[selectedScenario].year1.revenue / 1000000).toFixed(1)}M
                </div>
                <div className="text-moonlight/70 text-sm mb-4">Annual Revenue</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Customers</span>
                    <span className="text-moonlight">{scenarios[selectedScenario].year1.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Avg ARR</span>
                    <span className="text-moonlight">${(scenarios[selectedScenario].year1.arr / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-moonlight/30">
              <CardHeader>
                <CardTitle className="text-moonlight text-center">Year 3</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-black text-teal mb-2">
                  ${(scenarios[selectedScenario].year3.revenue / 1000000).toFixed(0)}M
                </div>
                <div className="text-moonlight/70 text-sm mb-4">Annual Revenue</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Customers</span>
                    <span className="text-moonlight">{scenarios[selectedScenario].year3.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Avg ARR</span>
                    <span className="text-moonlight">${(scenarios[selectedScenario].year3.arr / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/80 border-moonlight/30">
              <CardHeader>
                <CardTitle className="text-moonlight text-center">Year 5</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-black text-gold mb-2">
                  ${(scenarios[selectedScenario].year5.revenue / 1000000).toFixed(0)}M
                </div>
                <div className="text-moonlight/70 text-sm mb-4">Annual Revenue</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Customers</span>
                    <span className="text-moonlight">{scenarios[selectedScenario].year5.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-moonlight/70">Avg ARR</span>
                    <span className="text-moonlight">${(scenarios[selectedScenario].year5.arr / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Unit Economics */}
          <Card className="bg-navy/80 border-bronze/30 mb-12">
            <CardHeader>
              <CardTitle className="text-moonlight text-center">Unit Economics</CardTitle>
              <CardDescription className="text-center text-moonlight/70">
                SaaS metrics demonstrating sustainable growth model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-black text-bronze mb-1">85%</div>
                  <div className="text-moonlight/70 text-sm">Gross Margin</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-teal mb-1">3.2:1</div>
                  <div className="text-moonlight/70 text-sm">LTV:CAC Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-gold mb-1">12</div>
                  <div className="text-moonlight/70 text-sm">Payback (months)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-moonlight mb-1">8%</div>
                  <div className="text-moonlight/70 text-sm">Annual Churn</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-moonlight/70 mb-6">
              Ready to see the social impact these economics enable?
            </p>
            <Link to="/impact-metrics">
              <Button variant="cta" size="cta" className="group">
                View Impact Metrics
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessModel;
