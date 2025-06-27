
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Home, Users, Heart, ArrowRight, Phone, ExternalLink } from 'lucide-react';

const CompassCompanion = () => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleQuickExit = () => {
    // Clear any stored data and redirect
    localStorage.clear();
    window.location.href = 'https://www.google.com';
  };

  const navigationAreas = [
    {
      id: 'housing',
      title: 'Housing & Safety',
      description: 'Find safe places to live and resources for immediate safety needs',
      icon: Home,
      color: 'bg-teal/10 border-teal/30 hover:bg-teal/20',
      iconColor: 'text-teal'
    },
    {
      id: 'community',
      title: 'Community & Support',
      description: 'Connect with people who understand and supportive communities',
      icon: Users,
      color: 'bg-gold/10 border-gold/30 hover:bg-gold/20',
      iconColor: 'text-gold'
    },
    {
      id: 'growth',
      title: 'Personal Growth',
      description: 'Tools and resources for healing at your own pace',
      icon: Heart,
      color: 'bg-bronze/10 border-bronze/30 hover:bg-bronze/20',
      iconColor: 'text-bronze'
    }
  ];

  const crisisResources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7 free and confidential support'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 support via text'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: '24/7 confidential support'
    }
  ];

  return (
    <div className="min-h-screen bg-navy relative">
      {/* Safety header with just exit button */}
      <header className="bg-navy/95 backdrop-blur-sm border-b border-teal/20 sticky top-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex justify-end items-center">
          <Button
            onClick={() => setShowExitConfirm(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-montserrat font-medium"
          >
            Exit Safely
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold text-moonlight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            You're not alone in this journey
          </motion.h2>
          <motion.p 
            className="text-lg text-moonlight/80 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find the support and resources you need, when you're ready. 
            Everything here is confidential and at your own pace.
          </motion.p>
          
          <motion.div 
            className="bg-teal/10 border border-teal/30 rounded-lg p-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 text-teal">
              <Shield className="w-5 h-5" />
              <span className="font-montserrat font-medium">Your privacy is protected</span>
            </div>
            <p className="text-sm text-moonlight/70 mt-1">
              No personal information is required or stored
            </p>
          </motion.div>
        </div>

        {/* Navigation areas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {navigationAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <Card className={`${area.color} border-2 transition-all duration-300 cursor-pointer h-full`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${area.iconColor} mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center`}>
                    <area.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-moonlight font-montserrat text-xl">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-moonlight/80 text-center mb-4">
                    {area.description}
                  </CardDescription>
                  <Button 
                    className="w-full bg-white/10 text-moonlight hover:bg-white/20 border-0"
                    onClick={() => setSelectedArea(area.id)}
                  >
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Crisis resources */}
        <motion.div 
          className="bg-navy/40 border border-red-500/30 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h3 className="text-xl font-montserrat font-bold text-red-400 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Crisis Support - Available 24/7
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-montserrat font-medium text-moonlight mb-1">
                  {resource.name}
                </h4>
                <p className="text-lg font-bold text-red-400 mb-2">
                  {resource.number}
                </p>
                <p className="text-sm text-moonlight/70">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-moonlight/60 font-montserrat italic">
            "Every journey begins with a single step. You've already taken yours by being here."
          </p>
        </motion.div>
      </main>

      {/* Exit confirmation modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-navy border border-teal/30 rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-montserrat font-medium mb-4 text-moonlight">
                Leave safely?
              </h3>
              <p className="text-moonlight/70 mb-6 font-montserrat">
                This will take you to Google and clear any information from this session.
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleQuickExit}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-montserrat"
                >
                  Yes, exit now
                </Button>
                <Button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 bg-moonlight/20 text-moonlight hover:bg-moonlight/30 font-montserrat"
                >
                  Stay here
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected area detail modal */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-navy border border-teal/30 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-montserrat font-medium text-moonlight">
                  {navigationAreas.find(area => area.id === selectedArea)?.title}
                </h3>
                <Button
                  onClick={() => setSelectedArea(null)}
                  className="text-moonlight/60 hover:text-moonlight bg-transparent hover:bg-moonlight/10 p-2"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-moonlight/80">
                  Resources and support for {navigationAreas.find(area => area.id === selectedArea)?.title.toLowerCase()} 
                  are being prepared. This section will connect you with:
                </p>
                
                <ul className="space-y-2 text-moonlight/70">
                  <li>• Local resources and services</li>
                  <li>• Peer support networks</li>
                  <li>• Professional assistance options</li>
                  <li>• Self-guided tools and information</li>
                </ul>
                
                <div className="bg-teal/10 border border-teal/30 rounded-lg p-4 mt-6">
                  <p className="text-teal font-montserrat font-medium mb-2">
                    Coming Soon
                  </p>
                  <p className="text-moonlight/70 text-sm">
                    This area is currently in development. Check back soon for comprehensive resources.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompassCompanion;
