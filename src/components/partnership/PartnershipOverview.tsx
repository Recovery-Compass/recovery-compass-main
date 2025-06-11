
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
            Partnership <span className="text-[#D4AF37]">Overview</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your organizational infrastructure with embedded strategic capabilities 
            that multiply impact while reducing operational complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-[#D4AF37] mb-4">
                    {metric.value}
                  </h3>
                  <p className="text-xl font-inter font-semibold mb-4">
                    {metric.title}
                  </p>
                  <p className="text-base text-gray-400 mb-6">
                    {metric.description}
                  </p>
                  <Progress 
                    value={metric.progress} 
                    className="h-3 bg-white/10"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-8 rounded-lg border border-[#D4AF37]/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-4 h-4 bg-[#D4AF37] rounded-full animate-pulse" />
            <h3 className="text-2xl font-inter font-semibold">Strategic Validation</h3>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our partnership approach is validated through rigorous research and testing, 
            ensuring evidence-based strategies that meet institutional standards and regulatory requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipOverview;
