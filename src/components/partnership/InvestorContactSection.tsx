
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Calendar } from 'lucide-react';

const InvestorContactSection = () => {
  return (
    <section className="py-20 bg-navy/30 backdrop-blur-sm border-y border-bronze/10">
      <div className="content-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading mb-6">Ready to Partner?</h2>
          <p className="text-lg text-moonlight/70 mb-12 max-w-2xl mx-auto">
            Connect with our partnership team to explore how Recovery Compass 
            can transform your organization's impact and sustainability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-navy/60 border-bronze/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5 text-bronze" />
                  Schedule Partnership Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-moonlight/70 mb-6 text-sm">
                  Book a 45-minute strategic alignment session to explore collaboration opportunities.
                </p>
                <a href="mailto:partnerships@recovery-compass.org?subject=Partnership%20Discussion%20Request&body=I%20would%20like%20to%20schedule%20a%20partnership%20discussion%20to%20explore%20collaboration%20opportunities.">
                  <Button variant="cta" size="lg" className="w-full">
                    Schedule Call
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-navy/60 border-teal/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-moonlight flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5 text-teal" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <div className="text-moonlight/70 text-sm mb-1">Email</div>
                  <a 
                    href="mailto:partnerships@recovery-compass.org" 
                    className="text-teal hover:text-teal/80 transition-colors font-medium"
                  >
                    partnerships@recovery-compass.org
                  </a>
                </div>
                <div>
                  <div className="text-moonlight/70 text-sm mb-1">Phone</div>
                  <a 
                    href="tel:310-776-5741" 
                    className="text-teal hover:text-teal/80 transition-colors font-medium"
                  >
                    310-776-5741
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-moonlight/50 text-sm">
            Partnership discussions are confidential and non-binding • 
            <span className="text-bronze"> We attract easier; we don't apply harder.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorContactSection;
