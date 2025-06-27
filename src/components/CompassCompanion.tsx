import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Home, Users, Heart, ArrowRight, Phone, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompassCompanion = () => {
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleQuickExit = () => {
    localStorage.clear();
    window.location.href = 'https://www.google.com';
  };

  const handleTakeAssessment = () => {
    navigate('/assessment');
  };

  const navigationAreas = [
    {
      id: 'assessment',
      title: 'Environmental Assessment',
      description: 'Understand your environment and identify support needs',
      icon: Compass,
      color: 'unified-card hover:bg-bronze/10',
      iconColor: 'text-bronze',
      action: handleTakeAssessment
    },
    {
      id: 'housing',
      title: 'Housing & Safety',
      description: 'Find safe places to live and resources for immediate safety needs',
      icon: Home,
      color: 'unified-card hover:bg-teal/10',
      iconColor: 'text-teal'
    },
    {
      id: 'community',
      title: 'Community & Support',
      description: 'Connect with people who understand and supportive communities',
      icon: Users,
      color: 'unified-card hover:bg-gold/10',
      iconColor: 'text-gold'
    },
    {
      id: 'growth',
      title: 'Personal Growth',
      description: 'Tools and resources for healing at your own pace',
      icon: Heart,
      color: 'unified-card hover:bg-navy/20',
      iconColor: 'text-moonlight'
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
    <div className="min-h-screen bg-navy font-montserrat">
      {/* Safety header */}
      <header className="bg-navy/95 backdrop-blur-sm border-b border-bronze/20 sticky top-0 z-50 p-4">
        <div className="content-container flex justify-end items-center">
          <Button
            onClick={() => setShowExitConfirm(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-montserrat-semibold rounded-md"
          >
            Exit Safely
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="content-container py-8">
        {/* Welcome section */}
        <div className="text-center mb-12">
          <motion.h1 
            className="section-heading font-montserrat-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            You're not alone in this journey
          </motion.h1>
          
          <motion.p 
            className="text-xl text-moonlight/80 max-w-3xl mx-auto mb-8 font-montserrat-regular leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find the support and resources you need, when you're ready. 
            Everything here is confidential and at your own pace.
          </motion.p>
          
          <motion.div 
            className="unified-card max-w-lg mx-auto border-teal/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 text-teal">
              <Shield className="w-6 h-6" />
              <span className="font-montserrat-semibold">Your privacy is protected</span>
            </div>
            <p className="text-moonlight/70 mt-2 font-montserrat-regular">
              No personal information is required or stored
            </p>
          </motion.div>
        </div>

        {/* Navigation areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {navigationAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <Card className={`${area.color} transition-all duration-300 cursor-pointer h-full card-shadow hover:transform hover:scale-105`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${area.iconColor} mx-auto mb-4 rounded-xl bg-moonlight/10 flex items-center justify-center`}>
                    <area.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-moonlight font-montserrat-bold text-xl">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-moonlight/80 text-center mb-6 font-montserrat-regular leading-relaxed">
                    {area.description}
                  </CardDescription>
                  <Button 
                    className="w-full btn-secondary font-montserrat-semibold"
                    onClick={area.action || (() => setSelectedArea(area.id))}
                  >
                    {area.id === 'assessment' ? 'Start Assessment' : 'Explore'} 
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Crisis resources */}
        <motion.div 
          className="unified-card border-red-500/30 bg-red-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-2xl font-montserrat-bold text-red-400 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3" />
            Crisis Support - Available 24/7
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {crisisResources.map((resource, index) => (
              <div key={index} className="unified-card border-red-500/20 bg-red-500/10">
                <h3 className="font-montserrat-semibold text-moonlight mb-2 text-lg">
                  {resource.name}
                </h3>
                <p className="text-xl font-montserrat-bold text-red-400 mb-3">
                  {resource.number}
                </p>
                <p className="text-moonlight/70 font-montserrat-regular">
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
          <blockquote className="text-moonlight/60 font-montserrat-regular italic text-lg">
            "Every journey begins with a single step. You've already taken yours by being here."
          </blockquote>
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
              className="unified-card border-teal/30 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-montserrat-semibold mb-4 text-moonlight">
                Leave safely?
              </h3>
              <p className="text-moonlight/70 mb-6 font-montserrat-regular">
                This will take you to Google and clear any information from this session.
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={handleQuickExit}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-montserrat-semibold"
                >
                  Yes, exit now
                </Button>
                <Button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 btn-secondary font-montserrat-semibold"
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
              className="unified-card border-teal/30 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-montserrat-semibold text-moonlight">
                  {navigationAreas.find(area => area.id === selectedArea)?.title}
                </h3>
                <Button
                  onClick={() => setSelectedArea(null)}
                  className="text-moonlight/60 hover:text-moonlight bg-transparent hover:bg-moonlight/10 p-2 font-montserrat"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-moonlight/80 font-montserrat-regular">
                  Resources and support for {navigationAreas.find(area => area.id === selectedArea)?.title.toLowerCase()} 
                  are being prepared. This section will connect you with:
                </p>
                
                <ul className="space-y-2 text-moonlight/70 font-montserrat-regular">
                  <li>• Local resources and services</li>
                  <li>• Peer support networks</li>
                  <li>• Professional assistance options</li>
                  <li>• Self-guided tools and information</li>
                </ul>
                
                <div className="unified-card border-teal/30 mt-6">
                  <p className="text-teal font-montserrat-semibold mb-2">
                    Coming Soon
                  </p>
                  <p className="text-moonlight/70 font-montserrat-regular">
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
