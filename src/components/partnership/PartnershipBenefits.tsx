
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PartnershipBenefits = () => {
  const recoveryCompassProvides = [
    {
      title: 'Strategic Infrastructure',
      description: 'Complete organizational capacity enhancement',
      details: ['Custom framework development', 'Process optimization', 'Quality assurance systems']
    },
    {
      title: 'Academic Validation',
      description: 'Cal State LA research partnership',
      details: ['Evidence-based methodologies', 'Institutional credibility', 'Research publication opportunities']
    },
    {
      title: 'Operational Excellence',
      description: '40% efficiency improvement guarantee',
      details: ['Streamlined workflows', 'Automated reporting', 'Performance monitoring']
    },
    {
      title: 'Strategic Positioning',
      description: 'Enhanced competitive advantage',
      details: ['Market differentiation', 'Thought leadership', 'Partnership opportunities']
    }
  ];

  const wfdReceives = [
    {
      title: 'Embedded Expertise',
      description: 'Strategic capabilities without overhead',
      details: ['No recruitment costs', 'Immediate implementation', 'Proven methodologies']
    },
    {
      title: 'Scalable Solutions',
      description: 'Growth-ready infrastructure',
      details: ['Flexible expansion', 'Multi-site deployment', 'Standardized excellence']
    },
    {
      title: 'Risk Mitigation',
      description: 'Comprehensive support framework',
      details: ['24-hour response time', 'Continuous optimization', 'Performance guarantees']
    },
    {
      title: 'Innovation Access',
      description: 'Cutting-edge methodologies',
      details: ['Latest best practices', 'Technology integration', 'Future-ready solutions']
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
            Partnership <span className="text-[#D4AF37]">Benefits</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A truly symbiotic relationship where strategic value flows in both directions, 
            creating sustainable competitive advantages for all stakeholders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recovery Compass Provides */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-2">
                Recovery Compass Provides
              </h3>
              <p className="text-gray-400">Strategic infrastructure and expertise</p>
            </div>
            <div className="space-y-4">
              {recoveryCompassProvides.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-[#101534]" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-lg font-inter font-semibold text-white mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-300 mb-3">
                            {benefit.description}
                          </p>
                          <ul className="space-y-1">
                            {benefit.details.map((detail, idx) => (
                              <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WFD Receives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-2">
                First Day Receives
              </h3>
              <p className="text-gray-400">Immediate value and competitive advantage</p>
            </div>
            <div className="space-y-4">
              {wfdReceives.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-8 h-8 bg-[#045295] rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-lg font-inter font-semibold text-white mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-300 mb-3">
                            {benefit.description}
                          </p>
                          <ul className="space-y-1">
                            {benefit.details.map((detail, idx) => (
                              <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                <div className="w-1 h-1 bg-[#045295] rounded-full" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
