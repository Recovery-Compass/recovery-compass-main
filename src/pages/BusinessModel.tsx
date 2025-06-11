
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, TrendingUp, Users, ArrowRight, Award, CheckCircle } from 'lucide-react';
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
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
        
            {/* Strategic Partnership Revenue */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-bronze-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <DollarSign className="h-8 w-8 text-bronze-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Strategic Partnership Revenue</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Getting paid to provide data services while accelerating evidence-based practice pathway
              </p>
              <div className="text-bronze-400 text-3xl font-bold mb-2">60%</div>
              <div className="text-sm text-slate-400 mb-4">$150K-$400K annually</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Data analytics partnerships
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Clinical integration services
                </div>
              </div>
            </div>

            {/* Evidence-Based Practice Pipeline */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-bronze-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-bronze-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Evidence-Based Practice Pipeline</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Medi-Cal/Medicaid reimbursement pathway through clinical validation
              </p>
              <div className="text-bronze-400 text-3xl font-bold mb-2">30%</div>
              <div className="text-sm text-slate-400 mb-4">$75K-$200K pathway</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Clinical outcome tracking
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Reimbursement documentation
                </div>
              </div>
            </div>

            {/* Research & Validation Revenue */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-bronze-500 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-bronze-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Research & Validation Revenue</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Academic partnerships generating validation data for reimbursement pathway
              </p>
              <div className="text-bronze-400 text-3xl font-bold mb-2">10%</div>
              <div className="text-sm text-slate-400 mb-4">$25K-$80K grants</div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  University collaborations
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Evidence generation studies
                </div>
              </div>
            </div>
          </div>

          {/* Evidence-Based Practice Timeline */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Evidence-Based Practice Timeline to Medi-Cal Reimbursement
            </h2>
              
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-bronze-400 transform -translate-y-1/2"></div>
                
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Year 1 */}
                <div className="text-center">
                  <div className="bg-bronze-400 w-4 h-4 rounded-full mx-auto mb-4 relative z-10"></div>
                  <h3 className="text-lg font-semibold text-white mb-2">Year 1</h3>
                  <p className="text-bronze-400 text-xl font-bold mb-2">$150K</p>
                  <p className="text-sm text-slate-300">Strategic partnerships established</p>
                </div>
                  
                {/* Year 2 */}
                <div className="text-center">
                  <div className="bg-bronze-400 w-4 h-4 rounded-full mx-auto mb-4 relative z-10"></div>
                  <h3 className="text-lg font-semibold text-white mb-2">Year 2</h3>
                  <p className="text-bronze-400 text-xl font-bold mb-2">$450K</p>
                  <p className="text-sm text-slate-300">Clinical validation data collection</p>
                </div>
                  
                {/* Year 3 */}
                <div className="text-center">
                  <div className="bg-bronze-400 w-4 h-4 rounded-full mx-auto mb-4 relative z-10"></div>
                  <h3 className="text-lg font-semibold text-white mb-2">Year 3</h3>
                  <p className="text-bronze-400 text-xl font-bold mb-2">$1.2M</p>
                  <p className="text-sm text-slate-300">Evidence-based practice designation</p>
                </div>
                  
                {/* Year 5 */}
                <div className="text-center">
                  <div className="bg-green-400 w-4 h-4 rounded-full mx-auto mb-4 relative z-10"></div>
                  <h3 className="text-lg font-semibold text-white mb-2">Year 5</h3>
                  <p className="text-green-400 text-xl font-bold mb-2">$8M</p>
                  <p className="text-sm text-slate-300">Full Medi-Cal reimbursement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Multiplication Effect */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Strategic Multiplication Effect
            </h2>
              
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-bronze-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Single Partnership</h3>
                <p className="text-slate-300">One strategic healthcare partner provides multiple revenue streams</p>
              </div>
                
              <div className="text-center">
                <div className="bg-bronze-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data + Evidence</h3>
                <p className="text-slate-300">Simultaneous revenue generation and clinical validation</p>
              </div>
                
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Guaranteed ROI</h3>
                <p className="text-slate-300">Evidence-based pathway ensures Medi-Cal reimbursement</p>
              </div>
            </div>
          </div>

          {/* Why This Excites Impact Investors */}
          <div className="bg-gradient-to-r from-bronze-900 to-slate-800 border border-bronze-500 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Why This Model Excites Impact Investors
            </h2>
              
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-bronze-400 mb-4">Sustainable Impact</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Self-funding eliminates donation dependency
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Healthcare reimbursement provides long-term stability
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Evidence-based approach ensures clinical validity
                  </li>
                </ul>
              </div>
                
              <div>
                <h3 className="text-lg font-semibold text-bronze-400 mb-4">Scalable Returns</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Multiple revenue streams from single partnerships
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Clear pathway to guaranteed reimbursement
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Medi-Cal coverage ensures market expansion
                  </li>
                </ul>
              </div>
            </div>
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
