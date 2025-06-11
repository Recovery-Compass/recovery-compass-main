
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PartnershipOverview = () => {
  const metrics = [
    {
      title: 'Monthly Investment',
      value: '$2,750',
      description: 'Complete strategic infrastructure',
      progress: 100,
      icon: '💰'
    },
    {
      title: 'Efficiency Gain',
      value: '40%',
      description: 'Operational optimization',
      progress: 40,
      icon: '📈'
    },
    {
      title: 'Deployment Timeline',
      value: '30 Days',
      description: 'Rapid implementation',
      progress: 85,
      icon: '🚀'
    },
    {
      title: 'Response Time',
      value: '24 Hours',
      description: 'Strategic support availability',
      progress: 95,
      icon: '⚡'
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
            Partnership <span className="text-[#D4AF37]">Overview</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your organizational infrastructure with embedded strategic capabilities 
            that multiply impact while reducing operational complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#D4AF37] mb-2">
                    {metric.value}
                  </h3>
                  <p className="text-lg font-inter font-semibold mb-2">
                    {metric.title}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    {metric.description}
                  </p>
                  <Progress 
                    value={metric.progress} 
                    className="h-2 bg-white/10"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-8 rounded-lg border border-[#D4AF37]/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
            <h3 className="text-xl font-inter font-semibold">Academic Validation</h3>
          </div>
          <p className="text-gray-300">
            Cal State LA partnership validates our methodologies through rigorous academic research, 
            ensuring evidence-based approaches that meet institutional standards and regulatory requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipOverview;
