
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, TrendingUp, Clock } from 'lucide-react';

const TermsInvestment = () => {
  const investmentFramework = {
    monthly: '$2,750',
    setup: 'Included',
    commitment: '12 months minimum',
    roi: '40% efficiency gain guaranteed'
  };

  const governanceStructure = [
    {
      title: 'Strategic Oversight',
      description: 'Joint leadership committee with quarterly reviews',
      icon: Users,
      details: ['Executive alignment meetings', 'Performance review sessions', 'Strategic planning workshops']
    },
    {
      title: 'Risk Management',
      description: 'Comprehensive mitigation and contingency planning',
      icon: Shield,
      details: ['Performance guarantees', '24-hour support response', 'Continuous monitoring protocols']
    },
    {
      title: 'Growth Planning',
      description: 'Scalable framework for organizational expansion',
      icon: TrendingUp,
      details: ['Multi-site deployment capability', 'Flexible resource allocation', 'Innovation integration pathways']
    },
    {
      title: 'Timeline Management',
      description: 'Structured implementation with clear milestones',
      icon: Clock,
      details: ['30-60-90 day checkpoints', 'Adaptive timeline adjustments', 'Success metric tracking']
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Terms & <span className="text-[#D4AF37]">Investment</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent, strategic investment framework designed for sustainable 
            partnership success and measurable organizational transformation.
          </p>
        </motion.div>

        {/* Investment Overview */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#045295]/10 backdrop-blur-sm border-[#D4AF37]/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-playfair font-bold text-[#D4AF37] mb-2">
                    {investmentFramework.monthly}
                  </h3>
                  <p className="text-gray-300 font-inter">Monthly Investment</p>
                </div>
                <div>
                  <h3 className="text-3xl font-playfair font-bold text-[#D4AF37] mb-2">
                    {investmentFramework.setup}
                  </h3>
                  <p className="text-gray-300 font-inter">Setup & Training</p>
                </div>
                <div>
                  <h3 className="text-3xl font-playfair font-bold text-[#D4AF37] mb-2">
                    {investmentFramework.commitment}
                  </h3>
                  <p className="text-gray-300 font-inter">Initial Commitment</p>
                </div>
                <div>
                  <h3 className="text-3xl font-playfair font-bold text-[#D4AF37] mb-2">
                    {investmentFramework.roi}
                  </h3>
                  <p className="text-gray-300 font-inter">Guaranteed ROI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Governance Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governanceStructure.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconComponent className="w-6 h-6 text-[#101534]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-inter font-semibold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Value Proposition Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#101534] to-[#045295] border-[#D4AF37]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-4">
                Total Value Proposition
              </h3>
              <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto">
                For less than the cost of a single full-time strategic position, First Day receives 
                comprehensive organizational transformation, embedded expertise, and guaranteed performance improvements 
                that create sustainable competitive advantages.
              </p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-playfair font-bold text-[#D4AF37]">$33,000</div>
                  <div className="text-gray-400">Annual Investment</div>
                </div>
                <div className="w-px bg-[#D4AF37]/30 h-16"></div>
                <div>
                  <div className="text-3xl font-playfair font-bold text-[#D4AF37]">$132,000+</div>
                  <div className="text-gray-400">Equivalent Value Delivered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsInvestment;
