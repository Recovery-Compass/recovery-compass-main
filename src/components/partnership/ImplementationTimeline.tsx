
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

const ImplementationTimeline = () => {
  const [expandedPhase, setExpandedPhase] = useState(0);

  const timeline = [
    {
      period: 'Days 1-30',
      title: 'Foundation Phase',
      status: 'Critical Phase',
      deliverables: [
        'Comprehensive organizational assessment',
        'Strategic framework customization',
        'Stakeholder alignment sessions',
        'Initial infrastructure setup',
        'Communication protocol establishment'
      ],
      successMetrics: [
        'Complete stakeholder buy-in achieved',
        'Custom framework approved',
        'Communication channels established',
        'Performance baseline documented'
      ]
    },
    {
      period: 'Days 31-60',
      title: 'Expansion Phase',
      status: 'Active Deployment',
      deliverables: [
        'Core system implementation',
        'Staff training and development',
        'Process optimization workflows',
        'Quality assurance protocols',
        'Performance monitoring systems'
      ],
      successMetrics: [
        '40% efficiency improvement demonstrated',
        'Staff proficiency certification completed',
        'Quality standards consistently met',
        'Stakeholder satisfaction > 85%'
      ]
    },
    {
      period: 'Days 61-90',
      title: 'Optimization Phase',
      status: 'Sustained Excellence',
      deliverables: [
        'Advanced feature rollout',
        'Success story documentation',
        'Expansion planning sessions',
        'Long-term strategy development',
        'Partnership evaluation and renewal'
      ],
      successMetrics: [
        'Full ROI demonstration achieved',
        'Expansion opportunities identified',
        'Long-term partnership framework established',
        'Strategic validation completed'
      ]
    }
  ];

  return (
    <section className="py-32 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-12">
            Implementation <span className="text-[#D4AF37]">Timeline</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Strategic 30-60-90 day roadmap designed for rapid deployment 
            and sustainable long-term partnership success.
          </p>
        </motion.div>

        <div className="space-y-12">
          {timeline.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedPhase(expandedPhase === index ? -1 : index)}
                    className="w-full p-12 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-12">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#045295] rounded-full flex items-center justify-center text-white font-bold text-3xl">
                          {index + 1}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-[#101534] rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-6 mb-4">
                          <h3 className="text-4xl font-playfair font-bold text-white">
                            {phase.title}
                          </h3>
                          <span className="px-6 py-3 bg-[#D4AF37]/20 text-[#D4AF37] text-lg font-inter rounded-full">
                            {phase.status}
                          </span>
                        </div>
                        <p className="text-2xl text-[#D4AF37] font-inter font-semibold">
                          {phase.period}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-10 h-10 text-[#D4AF37]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedPhase === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-12 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-16">
                          <div>
                            <h4 className="text-3xl font-inter font-semibold text-[#D4AF37] mb-8">
                              Key Deliverables
                            </h4>
                            <ul className="space-y-4">
                              {phase.deliverables.map((deliverable, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-6"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0" />
                                  <span className="text-gray-300 text-xl">{deliverable}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-3xl font-inter font-semibold text-[#D4AF37] mb-8">
                              Success Metrics
                            </h4>
                            <ul className="space-y-4">
                              {phase.successMetrics.map((metric, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-6"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <div className="w-8 h-8 border-2 border-[#D4AF37] rounded flex items-center justify-center mt-1 flex-shrink-0">
                                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full" />
                                  </div>
                                  <span className="text-gray-300 text-xl">{metric}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;
