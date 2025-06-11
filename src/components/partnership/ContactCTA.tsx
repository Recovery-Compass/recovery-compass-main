
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Mail, Phone, Download } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Ready to <span className="text-[#D4AF37]">Transform</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a strategic partnership discussion to explore how Recovery Compass 
            can multiply First Day's organizational impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#045295]/10 backdrop-blur-sm border-[#D4AF37]/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Primary CTA */}
                <div className="text-center">
                  <h3 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-4">
                    Schedule Partnership Discussion
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Book a 45-minute strategic alignment session with our partnership team.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101534] font-inter font-semibold px-8 py-4 text-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Call
                    </Button>
                  </motion.div>
                </div>

                {/* Secondary Options */}
                <div className="space-y-4">
                  <h3 className="text-xl font-playfair font-bold text-white mb-4">
                    Alternative Contact Methods
                  </h3>
                  
                  <motion.div
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-inter font-semibold text-white">Direct Email</div>
                      <div className="text-sm text-gray-400">partnerships@recoverycompass.org</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-inter font-semibold text-white">Strategic Hotline</div>
                      <div className="text-sm text-gray-400">(555) 123-ALLIANCE</div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <Download className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <div className="font-inter font-semibold text-white">Download PDF</div>
                      <div className="text-sm text-gray-400">Complete proposal document</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">
                  Partnership discussions are confidential and non-binding. 
                  <span className="text-[#D4AF37]"> We attract easier; we don't apply harder.</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Validation Badge */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-[#D4AF37]/30">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-sm text-gray-300 font-inter">
              Academically validated by Cal State LA Research Partnership
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
