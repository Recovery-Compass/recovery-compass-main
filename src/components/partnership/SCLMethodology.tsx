
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const SCLMethodology = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      title: 'Foundation',
      subtitle: 'Strategic Foundation',
      description: 'Comprehensive organizational assessment and strategic framework development.',
      details: [
        'Organizational needs assessment and gap analysis',
        'Strategic framework customization',
        'Leadership alignment and stakeholder engagement',
        'Cultural preparation for sustainable change'
      ],
      icon: '🏗️',
      color: '#045295'
    },
    {
      title: 'Implementation',
      subtitle: 'Precision Execution',
      description: 'Structured implementation with measurable outcomes and transparent progress tracking.',
      details: [
        'Detailed implementation roadmap creation',
        'Performance metrics establishment',
        'Quality assurance protocols',
        'Stakeholder communication systems'
      ],
      icon: '⚙️',
      color: '#D4AF37'
    },
    {
      title: 'Optimization',
      subtitle: 'Sustained Growth',
      description: 'Continuous optimization that transforms initial investment into sustained organizational excellence.',
      details: [
        'Continuous improvement and refinement',
        'Success story documentation and sharing',
        'Expanded partnership opportunities',
        'Long-term strategic evolution planning'
      ],
      icon: '📊',
      color: '#101534'
    }
  ];

  return (
    <section className="py-24 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-8">
            Strategic <span className="text-[#D4AF37]">Framework</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our three-phase approach ensures sustainable transformation through 
            strategic foundation, precise implementation, and continuous optimization.
          </p>
        </motion.div>

        {/* Phase Navigation */}
        <div className="flex justify-center mb-16">
          <div className="flex gap-6 p-3 bg-white/5 rounded-full backdrop-blur-sm">
            {phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-8 py-4 rounded-full font-inter font-semibold transition-all duration-300 text-lg ${
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
            <CardContent className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-7xl">{phases[activePhase].icon}</div>
                    <div>
                      <h3 className="text-4xl font-playfair font-bold text-[#D4AF37]">
                        {phases[activePhase].title}
                      </h3>
                      <p className="text-xl text-gray-300 mt-2">
                        {phases[activePhase].subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {phases[activePhase].description}
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-inter font-semibold mb-6 text-[#D4AF37]">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-4">
                    {phases[activePhase].details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-3 h-3 bg-[#D4AF37] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-lg">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visual Flow */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-12">
            {phases.map((phase, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
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
                  <div className={`w-20 h-2 mx-6 ${
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
