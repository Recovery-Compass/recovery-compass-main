
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PartnershipProposals = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedTimeline, setExpandedTimeline] = useState(-1);

  const metrics = [
    {
      icon: '💰',
      value: '$2,750',
      title: 'Monthly Investment',
      description: 'Complete strategic infrastructure'
    },
    {
      icon: '📈',
      value: '40%',
      title: 'Efficiency Gain',
      description: 'Operational optimization'
    },
    {
      icon: '🚀',
      value: '30 Days',
      title: 'Deployment Timeline',
      description: 'Rapid implementation'
    },
    {
      icon: '⚡',
      value: '24 Hours',
      title: 'Response Time',
      description: 'Strategic support availability'
    }
  ];

  const frameworkPhases = [
    {
      title: 'Foundation',
      description: 'Comprehensive organizational assessment and strategic framework development.',
      details: [
        'Organizational needs assessment and gap analysis',
        'Strategic framework customization',
        'Leadership alignment and stakeholder engagement',
        'Cultural preparation for sustainable change'
      ]
    },
    {
      title: 'Implementation',
      description: 'Structured implementation with measurable outcomes and transparent progress tracking.',
      details: [
        'Detailed implementation roadmap creation',
        'Performance metrics establishment',
        'Quality assurance protocols',
        'Stakeholder communication systems'
      ]
    },
    {
      title: 'Optimization',
      description: 'Continuous optimization that transforms initial investment into sustained organizational excellence.',
      details: [
        'Continuous improvement and refinement',
        'Success story documentation and sharing',
        'Expanded partnership opportunities',
        'Long-term strategic evolution planning'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101534] to-[#045295] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#101534] via-[#045295] to-[#101534]" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          {/* Prominent Organization Logos */}
          <motion.div
            className="flex items-center justify-center gap-16 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-6">
              <img 
                src="/lovable-uploads/48dc4660-99d4-45e5-8dbe-e1e80483d4d9.png" 
                alt="Recovery Compass" 
                className="w-64 h-64 object-contain"
              />
              <span className="text-3xl font-inter font-semibold text-white">Recovery Compass</span>
            </div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="flex flex-col items-center gap-6">
              <img 
                src="/lovable-uploads/5fb9fb69-169a-443a-888d-c72d8e05e597.png" 
                alt="First Day" 
                className="w-64 h-64 object-contain"
              />
              <span className="text-3xl font-inter font-semibold text-white">First Day</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-playfair font-bold mb-12 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic Partnership
            <span className="block text-[#D4AF37] mt-6">Framework</span>
          </motion.h1>

          {/* Clean Tagline */}
          <motion.p
            className="text-xl md:text-2xl font-inter text-gray-300 mb-20 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Collaborative Excellence Through Strategic Integration
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Overview Metrics */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-serif font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Overview</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl mb-4">{metric.icon}</div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{metric.value}</div>
                <div className="text-xl font-semibold mb-2">{metric.title}</div>
                <div className="text-gray-300 text-sm">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework Section */}
      <section className="py-24 px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-serif font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic <span className="text-[#D4AF37]">Framework</span>
          </motion.h2>

          {/* Phase Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/10 rounded-full p-2">
              {frameworkPhases.map((phase, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`px-8 py-4 rounded-full transition-all duration-300 ${
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
              className="bg-white/10 rounded-3xl p-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-6">{frameworkPhases[activePhase].title}</h3>
              <p className="text-xl text-gray-300 mb-8">{frameworkPhases[activePhase].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {frameworkPhases[activePhase].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-4"></div>
                    <span className="text-lg">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl font-serif font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Implementation <span className="text-[#D4AF37]">Timeline</span>
          </motion.h2>

          <div className="space-y-8">
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
                  className="w-full p-8 text-left hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#D4AF37] text-xl font-bold">{phase.period}</span>
                      <h3 className="text-2xl font-bold mt-2">{phase.title}</h3>
                    </div>
                    <div className={`text-2xl transition-transform duration-300 ${
                      expandedTimeline === index ? 'rotate-180' : ''
                    }`}>
                      ⌄
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedTimeline === index && (
                    <motion.div
                      className="px-8 pb-8"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-bold mb-4 text-[#D4AF37]">Deliverables</h4>
                          <ul className="space-y-2">
                            {phase.deliverables.map((item, i) => (
                              <li key={i} className="flex items-center">
                                <span className="text-[#D4AF37] mr-3">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-4 text-[#D4AF37]">Success Metrics</h4>
                          <ul className="space-y-2">
                            {phase.successMetrics.map((metric, i) => (
                              <li key={i} className="flex items-center">
                                <span className="text-[#D4AF37] mr-3">📊</span>
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
      <section className="py-24 px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl font-serif font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Benefits</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recovery Compass Provides */}
            <motion.div
              className="bg-white/10 rounded-3xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-center">
                Recovery Compass <span className="text-[#D4AF37]">Provides</span>
              </h3>
              <div className="space-y-4">
                {[
                  'Strategic framework development',
                  'Implementation expertise',
                  'Performance optimization',
                  'Continuous improvement',
                  '24/7 strategic support',
                  'Quality assurance protocols'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-4">
                      <span className="text-[#101534] text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* First Day Receives */}
            <motion.div
              className="bg-white/10 rounded-3xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8 text-center">
                First Day <span className="text-[#D4AF37]">Receives</span>
              </h3>
              <div className="space-y-4">
                {[
                  'Operational excellence framework',
                  'Measurable efficiency gains',
                  'Reduced operational complexity',
                  'Enhanced strategic capability',
                  'Competitive market advantage',
                  'Sustainable growth foundation'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center mr-4">
                      <span className="text-[#101534] text-sm font-bold">✓</span>
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms & Investment */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl font-serif font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Terms & <span className="text-[#D4AF37]">Investment</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-white/10 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 text-[#D4AF37]">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D4AF37] mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-8 bg-gradient-to-t from-[#101534] to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-serif font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Begin Your <span className="text-[#D4AF37]">Strategic Partnership</span>?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule a comprehensive partnership discussion to explore how Recovery Compass
            can serve as your strategic infrastructure partner.
          </motion.p>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="bg-[#D4AF37] text-[#101534] px-12 py-4 rounded-full text-xl font-bold hover:bg-[#D4AF37]/90 transition-colors duration-300">
              Schedule Partnership Discussion
            </button>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
              <div className="flex items-center">
                <span className="text-[#D4AF37] mr-3">📧</span>
                <span>partnerships@recoverycompass.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#D4AF37] mr-3">📞</span>
                <span>(555) 123-4567</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[#D4AF37] text-lg font-semibold">
              "Building Strategic Partnerships That Transform Organizations"
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipProposals;
