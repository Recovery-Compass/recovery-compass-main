
import React from 'react';
import { motion } from 'framer-motion';

const PartnershipHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101534] via-[#045295] to-[#101534]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
        {/* Prominent Organization Logos */}
        <motion.div
          className="flex items-center justify-center gap-24 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-8">
            <img 
              src="/lovable-uploads/4e38c969-3506-42f1-9bd6-adf7b7aca9b1.png" 
              alt="Recovery Compass" 
              className="w-64 h-64 object-contain"
            />
            <span className="text-3xl font-inter font-semibold">Recovery Compass</span>
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="flex flex-col items-center gap-8">
            <img 
              src="/lovable-uploads/5fb9fb69-169a-443a-888d-c72d8e05e597.png" 
              alt="First Day" 
              className="w-64 h-64 object-contain"
            />
            <span className="text-3xl font-inter font-semibold">First Day</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-playfair font-bold mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Strategic Partnership
          <span className="block text-[#D4AF37] mt-6">Framework</span>
        </motion.h1>

        {/* Tagline */}
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
  );
};

export default PartnershipHero;
