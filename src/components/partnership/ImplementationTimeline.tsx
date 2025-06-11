
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ImplementationTimeline = () => {
  const [expandedPhase, setExpandedPhase] = useState(0);

  const timeline = [
    {
      period: 'Days 1-30',
      title: 'Foundation & Assessment',
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
      title: 'Implementation & Integration',
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
      title: 'Optimization & Expansion',
      status: 'Force Multiplication',
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
        'Academic validation completed'
      ]
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
            Implementation <span className="text-[#D4AF37]">Timeline</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Strategic 30-60-90 day roadmap designed for rapid deployment 
            and sustainable long-term partnership success.
          </p>
        </motion.div>

        <div className="space-y-6">
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
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#045295] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#101534] rounded-full animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-playfair font-bold text-white">
                            {phase.title}
                          </h3>
                          <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-inter rounded-full">
                            {phase.status}
                          </span>
                        </div>
                        <p className="text-lg text-[#D4AF37] font-inter font-semibold">
                          {phase.period}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
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
                        <div className="p-6 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-xl font-inter font-semibold text-[#D4AF37] mb-4">
                              Key Deliverables
                            </h4>
                            <ul className="space-y-2">
                              {phase.deliverables.map((deliverable, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-300">{deliverable}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xl font-inter font-semibold text-[#D4AF37] mb-4">
                              Success Metrics
                            </h4>
                            <ul className="space-y-2">
                              {phase.successMetrics.map((metric, idx) => (
                                <motion.li
                                  key={idx}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                  <div className="w-5 h-5 border-2 border-[#D4AF37] rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                                  </div>
                                  <span className="text-gray-300">{metric}</span>
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
