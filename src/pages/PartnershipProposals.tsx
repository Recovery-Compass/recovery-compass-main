
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
  const [logoError, setLogoError] = useState(false);

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

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleExportPDF = () => {
    console.log('Export PDF functionality would be implemented here');
  };

  const handleExportWord = () => {
    console.log('Export Word functionality would be implemented here');
  };

  const handleExportText = () => {
    console.log('Export Text functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#101534] to-[#045295] text-white font-inter overflow-x-hidden">
      {/* Hero Section - Optimized sizing and mobile responsiveness */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Recovery Compass Branding - Properly sized like home page */}
          <motion.div
            className="flex justify-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              {/* Logo Container - Sized to match home page */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 flex items-center justify-center mb-6 sm:mb-8">
                {logoError ? (
                  // Fallback for logo error
                  <div 
                    className="w-full h-full bg-[#D4AF37]/20 rounded-full flex items-center justify-center border-2 border-[#D4AF37]"
                    role="img"
                    aria-label="Recovery Compass Logo"
                  >
                    <span className="text-[#D4AF37] font-bold text-lg sm:text-xl md:text-2xl">RC</span>
                  </div>
                ) : (
                  <img 
                    src="/lovable-uploads/a3dd77ca-2111-41fe-8111-fe1d04695f12.png" 
                    alt="Recovery Compass" 
                    className="w-full h-full object-contain"
                    onError={handleLogoError}
                    loading="lazy"
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                )}
              </div>
              {/* Typography - Responsive and properly sized */}
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-wider text-[#D4AF37]"
                style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  fontKerning: 'auto',
                  fontFeatureSettings: '"liga" 1, "kern" 1, "ss02" 1',
                  fontVariantLigatures: 'common-ligatures',
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                
              </h1>
            </div>
          </motion.div>

          {/* Title - Mobile responsive */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            STRATEGIC PARTNERSHIP
            <span className="block text-[#D4AF37] mt-2 sm:mt-4">FRAMEWORK</span>
          </motion.h2>

          {/* Subtitle - Mobile responsive */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming Organizations Through Strategic AI Integration
          </motion.p>
        </div>
      </section>

      {/* Partnership Overview - Enhanced mobile responsiveness */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
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
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#D4AF37] focus-within:ring-offset-2 focus-within:ring-offset-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                tabIndex={0}
                role="article"
                aria-label={`${metric.title}: ${metric.value}`}
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4" aria-hidden="true">{metric.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-[#D4AF37] mb-2 sm:mb-3">{metric.value}</div>
                <div className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{metric.title}</div>
                <div className="text-gray-300 text-sm sm:text-base">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework Section - Enhanced accessibility */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic <span className="text-[#D4AF37]">Framework</span>
          </motion.h2>

          {/* Phase Selector - Mobile optimized */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4">
            <div 
              className="flex flex-col sm:flex-row bg-white/10 rounded-full p-2 w-full sm:w-auto"
              role="tablist"
              aria-label="Strategic Framework Phases"
            >
              {frameworkPhases.map((phase, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base mb-1 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent ${
                    activePhase === index
                      ? 'bg-[#D4AF37] text-[#101534] font-bold'
                      : 'text-white hover:bg-white/10'
                  }`}
                  role="tab"
                  aria-selected={activePhase === index}
                  aria-controls={`phase-${index}`}
                  id={`tab-${index}`}
                >
                  {phase.title}
                </button>
              ))}
            </div>
          </div>

          {/* Phase Details - Enhanced with ARIA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              className="bg-white/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              role="tabpanel"
              id={`phase-${activePhase}`}
              aria-labelledby={`tab-${activePhase}`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{frameworkPhases[activePhase].title}</h3>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">{frameworkPhases[activePhase].description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {frameworkPhases[activePhase].details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3 flex-shrink-0" aria-hidden="true"></div>
                    <span className="text-sm sm:text-base">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Partnership Benefits - Mobile optimized */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
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
              className="bg-white/10 rounded-2xl p-6 sm:p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
                Recovery Compass <span className="text-[#D4AF37]">Delivers</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Custom AI integration strategies',
                  'Implementation expertise and support',
                  'Performance optimization systems',
                  'Continuous improvement frameworks',
                  'Strategic consulting and guidance',
                  'Quality assurance protocols'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 sm:w-5 h-4 sm:h-5 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span className="text-[#101534] text-xs sm:text-sm font-bold">✓</span>
                    </div>
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Partner Organizations Receive */}
            <motion.div
              className="bg-white/10 rounded-2xl p-6 sm:p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
                Your Organization <span className="text-[#D4AF37]">Receives</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  'Operational excellence transformation',
                  'Measurable efficiency improvements',
                  'Reduced complexity and overhead',
                  'Enhanced strategic capabilities',
                  'Competitive market advantages',
                  'Sustainable growth foundations'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 sm:w-5 h-4 sm:h-5 bg-[#D4AF37] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span className="text-[#101534] text-xs sm:text-sm font-bold">✓</span>
                    </div>
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with proper error handling */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
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
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#D4AF37]">{section.title}</h3>
                <ul className="space-y-2 sm:space-y-3" role="list">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">•</span>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Professional Export Options - Enhanced accessibility */}
          <motion.div
            className="mt-16 sm:mt-20 bg-white/10 rounded-xl p-6 sm:p-8 border border-[#D4AF37]/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#D4AF37] flex items-center">
              <span className="mr-3" aria-hidden="true">📋</span> Professional Export Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button 
                onClick={handleExportPDF}
                className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Export as PDF document"
              >
                📄 Export PDF
              </button>
              <button 
                onClick={handleExportWord}
                className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Export as Word document"
              >
                📝 Export Word
              </button>
              <button 
                onClick={handleExportText}
                className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Export as text document"
              >
                📋 Export Text
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 italic">
              Professional formatting optimized for organizational presentations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Closing Section - Enhanced mobile */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#101534]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Professional Quote */}
            <div className="border-l-4 border-[#D4AF37] pl-6 sm:pl-8 text-left max-w-2xl mx-auto">
              <p className="text-base sm:text-lg font-light italic text-gray-200 leading-relaxed">
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
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-light text-[#D4AF37] mb-2 sm:mb-3">
                  Eric B. Jones
                </h3>
                <p className="text-base sm:text-lg text-gray-300">
                  Founder & Strategic Partner, MSW
                </p>
                <p className="text-sm text-gray-400 mt-1 sm:mt-2">
                  Recovery Compass
                </p>
              </div>

              {/* Professional Tagline */}
              <div className="bg-white/5 rounded-lg py-4 sm:py-6 px-6 sm:px-8 border border-white/10">
                <p className="text-base sm:text-lg font-medium text-white">
                  "We attract easier; we don't apply harder"
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-4 sm:pt-6">
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
                  Strategic Partnership Inquiries
                </p>
                <a 
                  href="mailto:partnerships@recovery-compass.org"
                  className="text-[#D4AF37] text-base sm:text-lg font-medium hover:text-[#D4AF37]/80 transition-colors duration-300 break-all focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent rounded"
                  aria-label="Send email to partnerships@recovery-compass.org"
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
