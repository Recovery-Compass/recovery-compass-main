
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorPitch = () => {
  return (
    <div className="min-h-screen bg-navy text-moonlight">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="content-container">
          <div className="text-center mb-16">
            <div className="text-bronze text-lg font-semibold mb-4 tracking-wide uppercase">
              Recovery Compass Investor Relations
            </div>
            <h1 className="text-moonlight mb-8">
              The $200B Invisible Recovery Market
            </h1>
            <p className="text-xl md:text-2xl text-moonlight/80 max-w-4xl mx-auto mb-12 leading-relaxed">
              AI-powered infrastructure for the 95% of Americans with substance disorders 
              who remain underserved by traditional recovery systems
            </p>
            
            {/* Key Metrics Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-black text-gold mb-2">20M</div>
                <div className="text-moonlight/70">Americans with Substance Disorders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-teal mb-2">95%</div>
                <div className="text-moonlight/70">Currently Underserved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-bronze mb-2">$200B+</div>
                <div className="text-moonlight/70">Total Addressable Market</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/market-analysis">
                <Button variant="cta" size="cta" className="group">
                  Explore Market Opportunity
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/solution-demo">
                <Button variant="outline" size="cta" className="border-moonlight text-moonlight hover:bg-moonlight hover:text-navy">
                  View Platform Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="section-padding bg-navy/50">
        <div className="content-container">
          <h2 className="section-heading text-center mb-16">Investment Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/market-analysis" className="group">
              <Card className="bg-navy/80 border-bronze/30 hover:border-bronze transition-all duration-300 h-full">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-bronze mb-2" />
                  <CardTitle className="text-moonlight">Market Analysis</CardTitle>
                  <CardDescription className="text-moonlight/70">
                    Interactive visualization of the invisible recovery market opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-bronze group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Explore Market <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/solution-demo" className="group">
              <Card className="bg-navy/80 border-teal/30 hover:border-teal transition-all duration-300 h-full">
                <CardHeader>
                  <Target className="h-8 w-8 text-teal mb-2" />
                  <CardTitle className="text-moonlight">Solution Demo</CardTitle>
                  <CardDescription className="text-moonlight/70">
                    AI-powered Environmental Response Design™ platform capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-teal group-hover:translate-x-1 transition-transform inline-flex items-center">
                    View Demo <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/business-model" className="group">
              <Card className="bg-navy/80 border-gold/30 hover:border-gold transition-all duration-300 h-full">
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-gold mb-2" />
                  <CardTitle className="text-moonlight">Business Model</CardTitle>
                  <CardDescription className="text-moonlight/70">
                    SaaS metrics, unit economics, and sustainable revenue streams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    View Financials <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/impact-metrics" className="group">
              <Card className="bg-navy/80 border-moonlight/30 hover:border-moonlight transition-all duration-300 h-full">
                <CardHeader>
                  <Users className="h-8 w-8 text-moonlight mb-2" />
                  <CardTitle className="text-moonlight">Impact Metrics</CardTitle>
                  <CardDescription className="text-moonlight/70">
                    Social return on investment and measurable outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-moonlight group-hover:translate-x-1 transition-transform inline-flex items-center">
                    View Impact <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-heading mb-8">Why Recovery Compass</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-bronze mb-4">Sustainable Business Model</h3>
                <p className="text-moonlight/80 leading-relaxed">
                  SaaS platform generates recurring revenue without grant dependency. 
                  80%+ gross margins typical of software platforms with proven unit economics.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-teal mb-4">Universal Design Advantage</h3>
                <p className="text-moonlight/80 leading-relaxed">
                  Solutions designed for recovery benefit broader healthcare ecosystem. 
                  The "curb cut effect" multiplies market opportunity and impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorPitch;
