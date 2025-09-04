import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const InvestorContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-navy to-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-8 text-compass-gold">
            Get In Touch
          </h2>
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                  placeholder="Tell us about your investment interest..."
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-compass-gold to-tree-copper text-navy font-semibold hover:scale-105 transition-all min-h-[3rem]">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorContactSection;