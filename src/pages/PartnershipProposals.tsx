

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Type definitions
interface MetricCard {
  title: string;
  value: string;
  description: string;
  icon: string;
}

interface TimelinePhase {
  period: string;
  title: string;
  deliverables: string[];
  successMetrics: string[];
}

const PartnershipProposals: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedTimeline, setExpandedTimeline] = useState(0);

  // Metrics data
  const metrics: MetricCard[] = [
    {
      title: 'Monthly Investment',
      value: '$2,750',
      description: 'Complete strategic infrastructure',
      icon: '💰'
    },
    {
      title: 'Efficiency Gain',
      value: '40%',
      description: 'Operational optimization',
      icon: '📈'
    },
    {
      title: 'Deployment Timeline',
      value: '30 Days',
      description: 'Rapid implementation',
      icon: '🚀'
    },
    {
      title: 'Response Time',
      value: '24 Hours',
      description: 'Strategic support guarantee',
      icon: '⚡'
    }
  ];

  // Framework phases
  const frameworkPhases = [
    {
      title: 'Foundation',
      description: 'Comprehensive organizational assessment and strategic framework development',
      details: [
        'Organizational needs assessment',
        'Strategic framework customization',
        'Leadership alignment',
        'Cultural preparation'
      ]
    },
    {
      title: 'Implementation',
      description: 'Structured deployment with measurable outcomes and transparent progress tracking',
      details: [
        'Implementation roadmap creation',
        'Performance metrics establishment',
        'Quality assurance protocols',
        'Communication systems'
      ]
    },
    {
      title: 'Optimization',
      description: 'Continuous improvement that transforms investment into sustained excellence',
      details: [
        'Continuous improvement',
        'Success documentation',
        'Partnership expansion',
        'Strategic evolution'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101534] to-[#045295] text-white font-['Montserrat',sans-serif]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Prominent Logos */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/95effcc8-1040-400d-ae6d-a6bec88d761a.png" 
                  alt="Recovery Compass" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-2xl font-black">Recovery Compass</span>
            </div>
            
            <div className="w-16 sm:w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center mb-4">
                <img 
                  src="/lovable-uploads/65a65ff0-be2f-4c63-ba8d-b74745f07a46.png" 
                  alt="Whittier First Day" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg sm:text-2xl font-black">Whittier First Day</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic Partnership
            <span className="block text-[#D4AF37] mt-2 sm:mt-4">Framework</span>
          </motion.h1>

          {/* Clean Subtitle - NO SYMBOLS */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-300 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Collaborative Excellence Through Strategic Integration
          </motion.p>
        </div>
      </section>

      {/* Partnership Overview Metrics */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Overview</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-3xl sm:text-4xl mb-4">{metric.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2 font-['Montserrat',sans-serif] font-700">{metric.value}</div>
                <div className="text-lg sm:text-xl font-semibold mb-2 font-['Montserrat',sans-serif] font-600">{metric.title}</div>
                <div className="text-gray-300 text-sm font-['Montserrat',sans-serif] font-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic <span className="text-[#D4AF37]">Framework</span>
          </motion.h2>

          {/* Phase Selector */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div className="flex flex-col sm:flex-row bg-white/10 rounded-full p-2 w-full sm:w-auto">
              {frameworkPhases.map((phase, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] text-sm sm:text-base mb-2 sm:mb-0 ${
                    activePhase === index
                      ? 'bg-[#D4AF37] text-[#101534] font-bold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {phase.title}
                </button>
              ))}
            </div>
          </div>

          {/* Phase Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              className="bg-white/10 rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-['Montserrat',sans-serif] font-700">{frameworkPhases[activePhase].title}</h3>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 font-['Montserrat',sans-serif] font-400">{frameworkPhases[activePhase].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {frameworkPhases[activePhase].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
                    <span className="text-base sm:text-lg font-['Montserrat',sans-serif] font-400">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Implementation <span className="text-[#D4AF37]">Timeline</span>
          </motion.h2>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                period: '30 Days',
                title: 'Foundation Phase',
                deliverables: ['Strategic assessment completion', 'Framework customization', 'Team onboarding', 'Initial metrics baseline'],
                successMetrics: ['100% assessment coverage', 'Framework approval', 'Team certification']
              },
              {
                period: '60 Days',
                title: 'Implementation Phase',
                deliverables: ['Full system deployment', 'Process optimization', 'Performance tracking', 'Quality assurance'],
                successMetrics: ['System operational', '90% process compliance', 'Metrics tracking active']
              },
              {
                period: '90 Days',
                title: 'Optimization Phase',
                deliverables: ['Performance review', 'Continuous improvement', 'Expansion planning', 'Partnership evolution'],
                successMetrics: ['Target metrics achieved', 'Improvement plan active', 'Partnership expansion ready']
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                className="bg-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setExpandedTimeline(expandedTimeline === index ? -1 : index)}
                  className="w-full p-6 sm:p-8 text-left hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#D4AF37] text-lg sm:text-xl font-bold font-['Montserrat',sans-serif] font-700">{phase.period}</span>
                      <h3 className="text-xl sm:text-2xl font-bold mt-2 font-['Montserrat',sans-serif] font-700">{phase.title}</h3>
                    </div>
                    <div className={`text-xl sm:text-2xl transition-transform duration-300 ${
                      expandedTimeline === index ? 'rotate-180' : ''
                    }`}>
                      ⌄
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedTimeline === index && (
                    <motion.div
                      className="px-6 sm:px-8 pb-6 sm:pb-8"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <h4 className="text-lg font-bold mb-4 text-[#D4AF37] font-['Montserrat',sans-serif] font-700">Deliverables</h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((item, i) => (
                              <li key={i} className="flex items-start font-['Montserrat',sans-serif] font-400 text-sm sm:text-base">
                                <span className="text-[#D4AF37] mr-3 mt-1 flex-shrink-0">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-4 text-[#D4AF37] font-['Montserrat',sans-serif] font-700">Success Metrics</h4>
                          <ul className="space-y-2">
                            {phase.successMetrics.map((metric, i) => (
                              <li key={i} className="flex items-start font-['Montserrat',sans-serif] font-400 text-sm sm:text-base">
                                <span className="text-[#D4AF37] mr-3 mt-1 flex-shrink-0">📊</span>
                                {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Benefits</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Recovery Compass Provides */}
            <motion.div
              className="bg-white/10 rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center font-['Montserrat',sans-serif] font-700">
                Recovery Compass <span className="text-[#D4AF37]">Provides</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Strategic framework development',
                  'Implementation expertise',
                  'Performance optimization',
                  'Continuous improvement',
                  '24/7 strategic support',
                  'Quality assurance protocols'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <span className="text-[#101534] text-xs sm:text-sm font-bold">✓</span>
                    </div>
                    <span className="text-base sm:text-lg font-['Montserrat',sans-serif] font-400">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Whittier First Day Receives */}
            <motion.div
              className="bg-white/10 rounded-3xl p-6 sm:p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center font-['Montserrat',sans-serif] font-700">
                Whittier First Day <span className="text-[#D4AF37]">Receives</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Operational excellence framework',
                  'Measurable efficiency gains',
                  'Reduced operational complexity',
                  'Enhanced strategic capability',
                  'Competitive market advantage',
                  'Sustainable growth foundation'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                      <span className="text-[#101534] text-xs sm:text-sm font-bold">✓</span>
                    </div>
                    <span className="text-base sm:text-lg font-['Montserrat',sans-serif] font-400">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms & Investment */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Montserrat',sans-serif] font-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Terms & <span className="text-[#D4AF37]">Investment</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Financial Framework',
                items: [
                  '$2,750 monthly investment',
                  'Complete infrastructure included',
                  'No hidden fees or charges',
                  'Transparent pricing model'
                ]
              },
              {
                title: 'Governance Structure',
                items: [
                  'Joint steering committee',
                  'Quarterly business reviews',
                  'Performance dashboards',
                  'Strategic planning sessions'
                ]
              },
              {
                title: 'Risk Mitigation',
                items: [
                  '30-day notice termination',
                  'Data protection guarantee',
                  'Service level agreements',
                  'Continuous monitoring'
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                className="bg-white/10 rounded-2xl p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#D4AF37] font-['Montserrat',sans-serif] font-700">{section.title}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D4AF37] mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="font-['Montserrat',sans-serif] font-400 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Classy Closing Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#101534]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center space-y-8 sm:space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Elegant Quote */}
            <div className="border-l-4 border-[#D4AF37] pl-6 sm:pl-8 text-left max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl font-light italic text-gray-200 leading-relaxed font-['Montserrat',sans-serif] font-300">
                "True partnership is built on mutual respect, shared vision, and unwavering commitment to excellence. 
                It's not about what we can take, but what we can build together."
              </p>
            </div>

            {/* Professional Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 sm:w-16 h-px bg-[#D4AF37]"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              <div className="w-12 sm:w-16 h-px bg-[#D4AF37]"></div>
            </div>

            {/* Eric's Signature Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-3xl sm:text-4xl font-light text-[#D4AF37] mb-2 font-['Montserrat',sans-serif] font-300">
                  Eric B. Jones
                </h3>
                <p className="text-base sm:text-lg text-gray-300 font-['Montserrat',sans-serif] font-400">
                  Founder & Strategic Partner, MSW
                </p>
                <p className="text-sm text-gray-400 mt-2 font-['Montserrat',sans-serif] font-300">
                  Recovery Compass
                </p>
              </div>

              {/* Professional Tagline */}
              <div className="bg-white/5 rounded-lg py-4 sm:py-6 px-6 sm:px-8 border border-white/10">
                <p className="text-lg sm:text-xl font-medium text-white font-['Montserrat',sans-serif] font-600">
                  "We attract easier; we don't apply harder"
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-6 sm:pt-8">
                <p className="text-gray-400 text-sm mb-3 font-['Montserrat',sans-serif] font-400">
                  Strategic Partnership Inquiries
                </p>
                <a 
                  href="mailto:eric@recovery-compass.org"
                  className="text-[#D4AF37] text-lg font-medium hover:text-[#D4AF37]/80 transition-colors duration-300 font-['Montserrat',sans-serif] font-600 break-all"
                >
                  eric@recovery-compass.org
                </a>
              </div>
            </div>

            {/* Final Professional Touch */}
            <div className="pt-8 sm:pt-12 border-t border-white/20">
              <p className="text-sm text-gray-500 font-['Montserrat',sans-serif] font-300 px-4">
                Building partnerships that honor both organizations and the communities we serve
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipProposals;

