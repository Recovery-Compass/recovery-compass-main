
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

  // Generic metrics data - NO CLIENT-SPECIFIC PRICING
  const metrics: MetricCard[] = [
    {
      title: 'Custom Investment',
      value: 'Tailored',
      description: 'Strategic solutions designed for your organization',
      icon: '💰'
    },
    {
      title: 'Efficiency Gain',
      value: '30-50%',
      description: 'Typical operational optimization range',
      icon: '📈'
    },
    {
      title: 'Implementation',
      value: '30-90 Days',
      description: 'Depends on organizational scope',
      icon: '🚀'
    },
    {
      title: 'Support Response',
      value: '24-48 Hours',
      description: 'Strategic support availability',
      icon: '⚡'
    }
  ];

  // Generic framework phases
  const frameworkPhases = [
    {
      title: 'Assessment',
      description: 'Comprehensive organizational evaluation and strategic framework development',
      details: [
        'Organizational needs assessment',
        'Strategic framework customization',
        'Leadership alignment sessions',
        'Implementation planning'
      ]
    },
    {
      title: 'Implementation',
      description: 'Structured deployment with measurable outcomes and progress tracking',
      details: [
        'Phased implementation approach',
        'Performance metrics establishment',
        'Quality assurance protocols',
        'Team training and onboarding'
      ]
    },
    {
      title: 'Optimization',
      description: 'Continuous improvement and partnership evolution',
      details: [
        'Performance monitoring',
        'Continuous improvement processes',
        'Strategic partnership development',
        'Long-term growth planning'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101534] to-[#045295] text-white font-inter">
      {/* Hero Section - Fixed spacing and logo positioning */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Recovery Compass Branding - Moved down to avoid nav overlap */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-3">
                <img 
                  src="/lovable-uploads/95effcc8-1040-400d-ae6d-a6bec88d761a.png" 
                  alt="Recovery Compass" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-semibold">Recovery Compass</span>
            </div>
          </motion.div>

          {/* Title - Reduced font sizes */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Strategic Partnership
            <span className="block text-[#D4AF37] mt-2">Framework</span>
          </motion.h1>

          {/* Subtitle - Reduced font size */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming Organizations Through Strategic AI Integration
          </motion.p>
        </div>
      </section>

      {/* Partnership Overview - Improved spacing */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Approach</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-2xl sm:text-3xl mb-3">{metric.icon}</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#D4AF37] mb-2">{metric.value}</div>
                <div className="text-sm sm:text-base font-semibold mb-2">{metric.title}</div>
                <div className="text-gray-300 text-xs sm:text-sm">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework Section - Improved spacing */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic <span className="text-[#D4AF37]">Framework</span>
          </motion.h2>

          {/* Phase Selector */}
          <div className="flex justify-center mb-6 sm:mb-8 px-4">
            <div className="flex flex-col sm:flex-row bg-white/10 rounded-full p-2 w-full sm:w-auto">
              {frameworkPhases.map((phase, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm mb-1 sm:mb-0 ${
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
              className="bg-white/10 rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{frameworkPhases[activePhase].title}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6">{frameworkPhases[activePhase].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {frameworkPhases[activePhase].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Partnership Benefits - Improved spacing */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Partnership <span className="text-[#D4AF37]">Benefits</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recovery Compass Provides */}
            <motion.div
              className="bg-white/10 rounded-2xl p-4 sm:p-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Recovery Compass <span className="text-[#D4AF37]">Delivers</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Custom AI integration strategies',
                  'Implementation expertise and support',
                  'Performance optimization systems',
                  'Continuous improvement frameworks',
                  'Strategic consulting and guidance',
                  'Quality assurance protocols'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#101534] text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Partner Organizations Receive */}
            <motion.div
              className="bg-white/10 rounded-2xl p-4 sm:p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Your Organization <span className="text-[#D4AF37]">Receives</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Operational excellence transformation',
                  'Measurable efficiency improvements',
                  'Reduced complexity and overhead',
                  'Enhanced strategic capabilities',
                  'Competitive market advantages',
                  'Sustainable growth foundations'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#101534] text-xs font-bold">✓</span>
                    </div>
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Generic, NO CLIENT NAMES */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-[#D4AF37]">Partner</span>?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'Discovery Call',
                items: [
                  'Initial consultation',
                  'Needs assessment',
                  'Strategic alignment',
                  'Custom proposal development'
                ]
              },
              {
                title: 'Partnership Structure',
                items: [
                  'Flexible engagement models',
                  'Transparent communication',
                  'Performance-based outcomes',
                  'Long-term strategic relationships'
                ]
              },
              {
                title: 'Implementation',
                items: [
                  'Phased deployment approach',
                  'Dedicated support team',
                  'Continuous monitoring',
                  'Success measurement'
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                className="bg-white/10 rounded-xl p-4 sm:p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D4AF37] mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Professional Export Options - COMPLETELY GENERIC */}
          <motion.div
            className="mt-12 sm:mt-16 bg-white/10 rounded-xl p-4 sm:p-6 border border-[#D4AF37]/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#D4AF37] flex items-center">
              <span className="mr-2">📋</span> Professional Export Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
              <button className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg transition-colors text-sm">
                📄 Export PDF
              </button>
              <button className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg transition-colors text-sm">
                📝 Export Word
              </button>
              <button className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-lg transition-colors text-sm">
                📋 Export Text
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 italic">
              Professional formatting optimized for organizational presentations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Closing Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#101534]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Professional Quote */}
            <div className="border-l-4 border-[#D4AF37] pl-4 sm:pl-6 text-left max-w-2xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg font-light italic text-gray-200 leading-relaxed">
                "Strategic partnerships are built on trust, expertise, and shared commitment to excellence. 
                Every collaboration is unique, designed specifically for your organization's goals."
              </p>
            </div>

            {/* Professional Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 sm:w-12 h-px bg-[#D4AF37]"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              <div className="w-8 sm:w-12 h-px bg-[#D4AF37]"></div>
            </div>

            {/* Eric's Professional Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-[#D4AF37] mb-2">
                  Eric B. Jones
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Founder & Strategic Partner, MSW
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Recovery Compass
                </p>
              </div>

              {/* Professional Tagline */}
              <div className="bg-white/5 rounded-lg py-3 sm:py-4 px-4 sm:px-6 border border-white/10">
                <p className="text-sm sm:text-base md:text-lg font-medium text-white">
                  "We attract easier; we don't apply harder"
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-4 sm:pt-6">
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  Strategic Partnership Inquiries
                </p>
                <a 
                  href="mailto:partnerships@recovery-compass.org"
                  className="text-[#D4AF37] text-sm sm:text-base font-medium hover:text-[#D4AF37]/80 transition-colors duration-300 break-all"
                >
                  partnerships@recovery-compass.org
                </a>
              </div>
            </div>

            {/* Final Professional Touch */}
            <div className="pt-6 sm:pt-8 border-t border-white/20">
              <p className="text-xs text-gray-500">
                All partnership discussions are confidential and tailored to your organization's specific needs
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipProposals;
