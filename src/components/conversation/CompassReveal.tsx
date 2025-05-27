
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { EnvironmentalInsight, ConversationResponse } from '@/stores/conversationStore';

interface CompassRevealProps {
  insights: EnvironmentalInsight[];
  conversationStory: ConversationResponse[];
}

const CompassReveal = ({ insights, conversationStory }: CompassRevealProps) => {
  const [revealStage, setRevealStage] = useState<'intro' | 'building' | 'complete'>('intro');

  useEffect(() => {
    const timer1 = setTimeout(() => setRevealStage('building'), 2000);
    const timer2 = setTimeout(() => setRevealStage('complete'), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="compass-reveal-container"
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-montserrat font-light text-bronze mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Your Environmental Story
        </motion.h2>
        
        <motion.p
          className="text-xl text-moonlight/80 max-w-2xl mx-auto font-montserrat"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          From our conversation, here's what I see about the world around you...
        </motion.p>
      </div>

      {/* Compass visualization */}
      <div className="compass-container mb-12 relative">
        <CompassVisualization
          insights={insights}
          revealStage={revealStage}
        />
      </div>

      {/* Story-based insights */}
      <StoryBasedInsights
        insights={insights}
        conversationStory={conversationStory}
      />
    </motion.div>
  );
};

// Simplified Compass Visualization (2D)
const CompassVisualization = ({ insights, revealStage }: { 
  insights: EnvironmentalInsight[]; 
  revealStage: 'intro' | 'building' | 'complete';
}) => {
  const categoryColors = {
    safety: '#3b82f6',
    support: '#10b981', 
    community: '#8b5cf6',
    growth: '#D4AF37',
    resources: '#148D8D',
    wellness: '#C69C6D'
  };

  return (
    <div className="w-80 h-80 mx-auto relative">
      {/* Central compass */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: revealStage === 'intro' ? 0 : 1, 
          opacity: revealStage === 'intro' ? 0 : 1 
        }}
        transition={{ duration: 1 }}
      >
        <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center">
          <span className="text-white text-2xl">🧭</span>
        </div>
      </motion.div>

      {/* Insight spokes */}
      {insights.map((insight, index) => {
        const angle = (index / insights.length) * Math.PI * 2;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const length = 60 + (insight.strength / 10) * 40;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: revealStage === 'complete' ? 1 : 0,
              opacity: revealStage === 'complete' ? 1 : 0
            }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: categoryColors[insight.category] || '#148D8D' }}
            />
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-moonlight/70 font-montserrat capitalize whitespace-nowrap">
              {insight.category}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

// Story-Based Insights Display
const StoryBasedInsights = ({ insights, conversationStory }: {
  insights: EnvironmentalInsight[];
  conversationStory: ConversationResponse[];
}) => {
  return (
    <div className="story-insights max-w-4xl mx-auto">
      <h3 className="text-2xl font-montserrat font-light text-moonlight mb-8 text-center">
        What Your Story Reveals
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className="insight-card bg-navy/40 backdrop-blur-sm rounded-xl p-6 border border-teal/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className={`w-4 h-4 rounded-full mr-3 ${
                insight.category === 'safety' ? 'bg-blue-400' :
                insight.category === 'support' ? 'bg-green-400' :
                insight.category === 'community' ? 'bg-purple-400' :
                insight.category === 'growth' ? 'bg-bronze' :
                'bg-teal'
              }`} />
              <h4 className="text-lg font-montserrat font-medium text-moonlight capitalize">
                {insight.category}
              </h4>
              <div className="ml-auto">
                <span className="text-sm text-moonlight/60 font-montserrat">
                  {insight.strength}/10
                </span>
              </div>
            </div>

            <p className="text-moonlight/80 mb-4 leading-relaxed font-montserrat">
              {insight.story}
            </p>

            {insight.interventionOpportunity && (
              <p className="text-sm text-teal font-montserrat font-medium">
                💡 {insight.interventionOpportunity}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button className="bg-gradient-to-r from-teal to-teal/80 text-white px-8 py-3 rounded-full text-lg font-montserrat font-medium hover:shadow-lg transition-all duration-300">
          Explore Next Steps Together
        </Button>
      </motion.div>
    </div>
  );
};

export default CompassReveal;
