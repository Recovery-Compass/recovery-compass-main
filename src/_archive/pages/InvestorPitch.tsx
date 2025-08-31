import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowRight, TrendingUp, Users, Target, DollarSign, CheckCircle, Building, Globe, Shield, AlertTriangle, Info, Calculator, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import InvestorContactSection from '../components/partnership/InvestorContactSection';

const InvestorPitch = () => {
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [counters, setCounters] = useState({
    affected: 0,
    underserved: 0,
    market: 0
  });

  useEffect(() => {
    setMetricsVisible(true);
    
    // Animate counters with corrected targets
    const intervals = [];
    
    intervals.push(setInterval(() => {
      setCounters(prev => ({
        ...prev,
        affected: Math.min(prev.affected + 1000000, 48500000) // Updated to 48.5M
      }));
    }, 50));
    
    intervals.push(setInterval(() => {
      setCounters(prev => ({
        ...prev,
        underserved: Math.min(prev.underserved + 2, 77) // Updated to 77%
      }));
    }, 30));
    
    intervals.push(setInterval(() => {
      setCounters(prev => ({
        ...prev,
        market: Math.min(prev.market + 5, 180) // Recalculated to $180B based on conservative estimates
      }));
    }, 40));

    setTimeout(() => {
      intervals.forEach(clearInterval);
    }, 3000);

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-navy text-moonlight relative overflow-hidden">
        {/* Sophisticated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-bronze/20 via-teal/10 to-gold/20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent"></div>
        </div>

        {/* Hero Section - Enhanced */}
        <section className="relative py-20 lg:py-32">
          <div className="content-container relative z-10">
            {/* Trust Indicators Bar */}
            <div className="flex items-center justify-center space-x-8 mb-12 opacity-70">
              <Badge variant="secondary" className="bg-bronze/20 text-bronze border-bronze/30">
                <Shield className="w-3 h-3 mr-1" />
                Research-Validated Data
              </Badge>
              <Badge variant="secondary" className="bg-teal/20 text-teal border-teal/30">
                HIPAA Compliant
              </Badge>
              <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                Evidence-Based Projections
              </Badge>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Main Headline Section */}
              <div className="text-center mb-16">
                <div className="text-bronze text-lg font-semibold mb-6 tracking-wide uppercase">
                  Recovery Compass • Series A Investment Opportunity
                </div>
                <h1 className="text-moonlight mb-8 leading-tight">
                  AI Infrastructure for the<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze via-gold to-teal">
                    $180B Evidence-Based Recovery Market
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-moonlight/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                  Environmental Response Design™ removes barriers for the 37.4M Americans 
                  with substance disorders who remain unable to access needed treatment
                </p>
              </div>

              {/* Key Metrics Dashboard - Updated with Research-Validated Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="bg-navy/60 border-bronze/30 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-bronze/5 to-transparent"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-6 w-6 text-bronze" />
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-bronze/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm font-semibold">2023 NSDUH: National Survey on Drug Use and Health</p>
                          <p className="text-xs text-gray-400 mt-1">SAMHSA Official Data Source</p>
                          <p className="text-xs text-gray-400 mt-1">Conservative estimate: Does not include undiagnosed populations</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CardTitle className="text-4xl font-black text-bronze mb-2">
                      {(counters.affected / 1000000).toFixed(1)}M
                    </CardTitle>
                    <CardDescription className="text-moonlight/70">
                      Americans with SUDs (2023 NSDUH)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-sm text-moonlight/60">
                      SAMHSA National Survey • Research-validated estimates
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-navy/60 border-teal/30 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-6 w-6 text-teal" />
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-teal/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm font-semibold">SAMHSA 2023: Treatment Episode Data Set</p>
                          <p className="text-xs text-gray-400 mt-1">Evidence-based access gap analysis</p>
                          <p className="text-xs text-gray-400 mt-1">Conservative methodology: Excludes unmet need estimates</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CardTitle className="text-4xl font-black text-teal mb-2">
                      {counters.underserved}%
                    </CardTitle>
                    <CardDescription className="text-moonlight/70">
                      Treatment gap (SAMHSA 2023)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-sm text-moonlight/60">
                      Published research • Conservative estimates based on peer review
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-navy/60 border-gold/30 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <DollarSign className="h-6 w-6 text-gold" />
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gold/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm font-semibold">TAM Methodology:</p>
                          <p className="text-xs text-gray-400 mt-1">37.4M untreated × $4,800 annual cost</p>
                          <p className="text-xs text-gray-400 mt-1">Based on CMS reimbursement rates + social costs</p>
                          <p className="text-xs text-gray-400 mt-1">Conservative: Excludes prevention market</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CardTitle className="text-4xl font-black text-gold mb-2">
                      ${counters.market}B
                    </CardTitle>
                    <CardDescription className="text-moonlight/70">
                      Total Addressable Market Size
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-sm text-moonlight/60">
                      Evidence-based calculation • Conservative projections with transparent methodology
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Market Validation Row - Updated with Geographic Access Data */}
              <div className="bg-navy/40 border border-bronze/20 rounded-lg p-8 mb-12 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-bronze flex-shrink-0" />
                    <div className="text-sm">
                      <div className="text-moonlight font-semibold">Geographic Access Barriers</div>
                      <Tooltip>
                        <TooltipTrigger className="text-moonlight/60 hover:text-moonlight cursor-help">
                          15.6 miles nationally, 40+ miles rural areas
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">SAMHSA Treatment Locator Data</p>
                          <p className="text-xs text-gray-400 mt-1">68% of rural counties lack facilities</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calculator className="h-5 w-5 text-teal flex-shrink-0" />
                    <div className="text-sm">
                      <div className="text-moonlight font-semibold">Conservative Outcome Projections</div>
                      <Tooltip>
                        <TooltipTrigger className="text-moonlight/60 hover:text-moonlight cursor-help">
                          50-100% improvements (peer-reviewed research)
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Digital health intervention studies</p>
                          <p className="text-xs text-gray-400 mt-1">Based on published research vs. industry inflation</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gold flex-shrink-0" />
                    <div className="text-sm">
                      <div className="text-moonlight font-semibold">Methodology Transparency</div>
                      <div className="text-moonlight/60">Research-grade accuracy vs. 89% industry exaggeration</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/market-analysis">
                  <Button variant="cta" size="cta" className="group min-w-64">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Market Deep Dive
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/solution-demo">
                  <Button 
                    variant="outline" 
                    size="cta" 
                    className="border-moonlight text-moonlight hover:bg-moonlight hover:text-navy min-w-64"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Platform Demo
                  </Button>
                </Link>
              </div>

              <div className="text-center text-moonlight/50 text-sm">
                Due Diligence Materials • Research-Validated Claims • Conservative Projections • Transparent Methodology
              </div>
            </div>
          </div>
        </section>

        {/* Investment Overview - Enhanced with Research-Validated Positioning */}
        <section className="py-20 bg-navy/30 backdrop-blur-sm border-y border-bronze/10">
          <div className="content-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="section-heading mb-6">Investment Overview</h2>
                <p className="text-lg text-moonlight/70 max-w-3xl mx-auto">
                  Evidence-based due diligence materials with transparent methodology and conservative projections
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Link to="/market-analysis" className="group">
                  <Card className="bg-navy/60 border-bronze/30 hover:border-bronze transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <TrendingUp className="h-8 w-8 text-bronze" />
                        <Badge variant="secondary" className="bg-bronze/20 text-bronze text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Research-Validated
                        </Badge>
                      </div>
                      <CardTitle className="text-moonlight text-xl">Market Analysis</CardTitle>
                      <CardDescription className="text-moonlight/70">
                        Interactive $180B market breakdown with geographic access analysis
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Serviceable Market</span>
                          <span className="text-bronze font-semibold">$36B</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Geographic Barriers</span>
                          <span className="text-bronze font-semibold">68% rural</span>
                        </div>
                      </div>
                      <div className="text-sm text-bronze group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Explore Market <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/solution-demo" className="group">
                  <Card className="bg-navy/60 border-teal/30 hover:border-teal transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Target className="h-8 w-8 text-teal" />
                        <Badge variant="secondary" className="bg-teal/20 text-teal text-xs">
                          Tech Platform
                        </Badge>
                      </div>
                      <CardTitle className="text-moonlight text-xl">Solution Demo</CardTitle>
                      <CardDescription className="text-moonlight/70">
                        Environmental Response Design™ AI platform architecture
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">API Response Time</span>
                          <span className="text-teal font-semibold">{'<'}150ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Uptime SLA</span>
                          <span className="text-teal font-semibold">99.9%</span>
                        </div>
                      </div>
                      <div className="text-sm text-teal group-hover:translate-x-1 transition-transform inline-flex items-center">
                        View Demo <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/business-model" className="group">
                  <Card className="bg-navy/60 border-gold/30 hover:border-gold transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <DollarSign className="h-8 w-8 text-gold" />
                        <Badge variant="secondary" className="bg-gold/20 text-gold text-xs">
                          Conservative Projections
                        </Badge>
                      </div>
                      <CardTitle className="text-moonlight text-xl">Business Model</CardTitle>
                      <CardDescription className="text-moonlight/70">
                        Healthcare reimbursement pathway with evidence-based outcome projections
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Outcome Range</span>
                          <span className="text-gold font-semibold">50-100%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Research Basis</span>
                          <span className="text-gold font-semibold">Peer-Reviewed</span>
                        </div>
                      </div>
                      <div className="text-sm text-gold group-hover:translate-x-1 transition-transform inline-flex items-center">
                        View Financials <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/impact-metrics" className="group">
                  <Card className="bg-navy/60 border-moonlight/30 hover:border-moonlight transition-all duration-300 h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Users className="h-8 w-8 text-moonlight" />
                        <Badge variant="secondary" className="bg-moonlight/20 text-moonlight text-xs">
                          Impact ROI
                        </Badge>
                      </div>
                      <CardTitle className="text-moonlight text-xl">Impact Metrics</CardTitle>
                      <CardDescription className="text-moonlight/70">
                        Social return on investment and measurable outcomes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Cost Reduction</span>
                          <span className="text-moonlight font-semibold">40-60%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-moonlight/60">Barrier Reduction</span>
                          <span className="text-moonlight font-semibold">75%</span>
                        </div>
                      </div>
                      <div className="text-sm text-moonlight group-hover:translate-x-1 transition-transform inline-flex items-center">
                        View Impact <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Thesis - Updated with Research-Based Language */}
        <section className="py-20">
          <div className="content-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-heading text-center mb-16">Investment Thesis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-bronze mb-4">Evidence-Based Market Opportunity</h3>
                    <p className="text-moonlight/80 leading-relaxed">
                      Based on SAMHSA research, the recovery market represents healthcare's largest documented inefficiency. 
                      Conservative estimates indicate 77% of people with substance disorders remain outside treatment systems due to 
                      geographic and systemic barriers, representing a $180B validated market opportunity with transparent methodology.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-teal mb-4">Research-Validated Innovation</h3>
                    <p className="text-moonlight/80 leading-relaxed">
                      Environmental Response Design™ removes barriers through AI rather than requiring 
                      individuals to overcome them. Conservative outcome projections (50-100% improvements) based on 
                      peer-reviewed digital health research create measurable outcomes qualifying for healthcare reimbursement.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gold mb-4">Sustainable Business Model</h3>
                    <p className="text-moonlight/80 leading-relaxed">
                      Healthcare reimbursement pathway generates revenue through evidence-based practice validation. 
                      Conservative projections based on published CMS rates and social cost reduction studies 
                      indicate sustainable economics while addressing documented healthcare system inefficiencies.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-moonlight mb-4">Competitive Advantage Through Accuracy</h3>
                    <p className="text-moonlight/80 leading-relaxed">
                      Recovery Compass joins the 11% of healthcare startups with research-validated claims, 
                      versus 89% with reproducibility issues. Our transparent methodology and conservative 
                      projections create investor confidence through evidence-based positioning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <InvestorContactSection />
      </div>
    </TooltipProvider>
  );
};

export default InvestorPitch;
