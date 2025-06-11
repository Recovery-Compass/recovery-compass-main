
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const SCLMethodology = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      title: 'Seismic',
      subtitle: 'Foundation Shift',
      description: 'Fundamental transformation of organizational capacity through strategic infrastructure embedding.',
      details: [
        'Comprehensive needs assessment and gap analysis',
        'Strategic framework customization',
        'Leadership alignment and buy-in development',
        'Cultural preparation for sustainable change'
      ],
      icon: '🌊',
      color: '#045295'
    },
    {
      title: 'Crystal',
      subtitle: 'Precision Clarity',
      description: 'Clear, structured implementation with measurable outcomes and transparent progress tracking.',
      details: [
        'Detailed implementation roadmap creation',
        'Performance metrics establishment',
        'Quality assurance protocols',
        'Stakeholder communication systems'
      ],
      icon: '💎',
      color: '#D4AF37'
    },
    {
      title: 'Lava',
      subtitle: 'Force Multiplication',
      description: 'Sustained momentum that transforms initial investment into exponential organizational growth.',
      details: [
        'Continuous optimization and refinement',
        'Success story documentation and sharing',
        'Expanded partnership opportunities',
        'Long-term strategic evolution planning'
      ],
      icon: '🔥',
      color: '#101534'
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
            SCL <span className="text-[#D4AF37]">Methodology</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our Seismic-Crystal-Lava approach ensures force multiplication through 
            strategic transformation that builds sustainable organizational excellence.
          </p>
        </motion.div>

        {/* Phase Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4 p-2 bg-white/5 rounded-full backdrop-blur-sm">
            {phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-6 py-3 rounded-full font-inter font-semibold transition-all duration-300 ${
                  activePhase === index
                    ? 'bg-[#D4AF37] text-[#101534]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {phase.icon} {phase.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Phase Content */}
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">{phases[activePhase].icon}</div>
                    <div>
                      <h3 className="text-3xl font-playfair font-bold text-[#D4AF37]">
                        {phases[activePhase].title}
                      </h3>
                      <p className="text-xl text-gray-300">
                        {phases[activePhase].subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-6">
                    {phases[activePhase].description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-inter font-semibold mb-4 text-[#D4AF37]">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-3">
                    {phases[activePhase].details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visual Flow */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-8">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      index <= activePhase ? 'bg-[#D4AF37] text-[#101534]' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {phase.icon}
                  </div>
                  {index <= activePhase && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                {index < phases.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index < activePhase ? 'bg-[#D4AF37]' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SCLMethodology;
