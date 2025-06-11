
import React from 'react';
import { motion } from 'framer-motion';

const PartnershipHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101534] via-[#045295] to-[#101534]" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, #D4AF37 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, #D4AF37 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Organization Logos */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/48dc4660-99d4-45e5-8dbe-e1e80483d4d9.png" 
              alt="Recovery Compass" 
              className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-inter font-semibold">Recovery Compass</span>
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/5fb9fb69-169a-443a-888d-c72d8e05e597.png" 
              alt="First Day" 
              className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-inter font-semibold">First Day</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-playfair font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Strategic Alliance
          <span className="block text-[#D4AF37]">Framework</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl font-inter text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          "We attract easier; we don't apply harder"
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
