import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AchievementSystem } from './AchievementSystem';
import { PeakExperienceMining } from './PeakExperienceMining';
import { VisionBoardCreator } from './VisionBoardCreator';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sparkles, 
  Crown, 
  Download, 
  Mail, 
  Calendar,
  Star,
  Zap,
  Target,
  ArrowRight,
  Gift
} from 'lucide-react';

interface ActualizationFinaleProps {
  userId: string;
  assessmentData: any;
  onComplete?: () => void;
}

type FinalePhase = 'achievements' | 'peak_mining' | 'vision_creation' | 'value_delivery' | 'premium_offer';

export const ActualizationFinale = ({ 
  userId, 
  assessmentData, 
  onComplete 
}: ActualizationFinaleProps) => {
  const [currentPhase, setCurrentPhase] = useState<FinalePhase>('achievements');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [unlockedValues, setUnlockedValues] = useState<string[]>([]);
  const [sessionData, setSessionData] = useState({
    sessionStart: Date.now(),
    interactionDepth: 'surface' as 'surface' | 'engaged' | 'immersed',
    completionMilestones: {} as any
  });

  useEffect(() => {
    initializeSession();
  }, [userId]);

  const initializeSession = async () => {
    try {
      const { data: existingProfile } = await supabase
        .from('actualization_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingProfile) {
        setUserProfile(existingProfile);
        setUnlockedValues(existingProfile.achievements_unlocked || []);
      }
    } catch (error) {
      console.log('No existing profile, will create new one');
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const profileData = {
        user_id: userId,
        ...updates,
        session_duration: Math.floor((Date.now() - sessionData.sessionStart) / 1000),
        interaction_depth: sessionData.interactionDepth,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('actualization_profiles')
        .upsert(profileData);

      if (error) throw error;
      setUserProfile(prev => ({ ...prev, ...profileData }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAchievementUnlock = (achievement: any) => {
    setUnlockedValues(prev => [...prev, achievement.value]);
    updateSessionData('engaged');
    
    // Auto-advance based on achievement
    if (achievement.id === 'vision_architect') {
      setTimeout(() => setCurrentPhase('peak_mining'), 2000);
    }
  };

  const updateSessionData = (depth: typeof sessionData.interactionDepth) => {
    setSessionData(prev => ({
      ...prev,
      interactionDepth: depth
    }));
  };

  const handlePeakExperienceComplete = (peakData: any) => {
    updateProfile({
      peak_experiences: [peakData],
      completion_milestones: {
        ...sessionData.completionMilestones,
        peak_experiences_shared: 1
      }
    });
    updateSessionData('immersed');
    setCurrentPhase('vision_creation');
  };

  const handleVisionBoardComplete = (visionData: any) => {
    updateProfile({
      future_vision: visionData.vision,
      ideal_environment_description: visionData.environment,
      core_values: visionData.values,
      optimization_focus: visionData.focus,
      vision_board_url: visionData.imageUrl,
      completion_milestones: {
        ...sessionData.completionMilestones,
        vision_components_completed: 5
      }
    });
    setCurrentPhase('value_delivery');
  };

  const handleEmailCapture = async () => {
    if (!email) return;

    try {
      // Store email and trigger value delivery
      await updateProfile({ email_captured: email });
      
      // Here you would typically trigger an email with the blueprint
      console.log('Triggering blueprint email to:', email);
      
      setShowEmailCapture(false);
      setCurrentPhase('premium_offer');
    } catch (error) {
      console.error('Error capturing email:', error);
    }
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 'achievements': return 'Celebrating Your Progress';
      case 'peak_mining': return 'Capturing Your Peak Moments';
      case 'vision_creation': return 'Designing Your Ideal Reality';
      case 'value_delivery': return 'Your Actualization Blueprint';
      case 'premium_offer': return 'Accelerate Your Transformation';
      default: return 'Your Journey Continues';
    }
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'achievements': 
        return 'Recognition of your commitment to growth and self-actualization';
      case 'peak_mining': 
        return 'Deep exploration of your transformative experiences and peak states';
      case 'vision_creation': 
        return 'Visual and experiential design of your ideal future environment';
      case 'value_delivery': 
        return 'Your personalized roadmap to environmental optimization';
      case 'premium_offer': 
        return 'Professional support for implementing your vision';
      default: 
        return 'Continue exploring your potential';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-deep-navy">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-gold" />
            <h1 className="text-4xl font-bold text-gold">Actualization Catalyst</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-moonlight mb-2">
            {getPhaseTitle()}
          </h2>
          
          <p className="text-moonlight/70 max-w-2xl mx-auto">
            {getPhaseDescription()}
          </p>

          {/* Value Indicators */}
          {unlockedValues.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {unlockedValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  <Gift className="w-4 h-4 text-gold" />
                  <Badge className="bg-gold/20 text-gold border-gold/30">
                    {value}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Phase Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentPhase === 'achievements' && (
              <AchievementSystem
                userId={userId}
                currentAssessmentData={assessmentData}
                onAchievementUnlock={handleAchievementUnlock}
              />
            )}

            {currentPhase === 'peak_mining' && (
              <PeakExperienceMining
                onComplete={handlePeakExperienceComplete}
                onSkip={() => setCurrentPhase('vision_creation')}
              />
            )}

            {currentPhase === 'vision_creation' && (
              <VisionBoardCreator
                onComplete={handleVisionBoardComplete}
                assessmentData={assessmentData}
              />
            )}

            {currentPhase === 'value_delivery' && (
              <Card className="bg-navy/50 border-gold/30 p-8">
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-16 h-16 text-gold mx-auto mb-4" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-gold">
                    Your Blueprint is Ready!
                  </h3>
                  
                  <p className="text-moonlight/80 max-w-lg mx-auto">
                    Based on your journey, we've created a personalized actualization blueprint 
                    with specific steps to optimize your environment for peak performance.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="text-center p-4">
                      <Target className="w-8 h-8 text-compass-gold mx-auto mb-2" />
                      <h4 className="font-semibold text-moonlight">Vision Map</h4>
                      <p className="text-sm text-moonlight/70">Detailed environment design</p>
                    </div>
                    <div className="text-center p-4">
                      <Zap className="w-8 h-8 text-compass-gold mx-auto mb-2" />
                      <h4 className="font-semibold text-moonlight">Action Steps</h4>
                      <p className="text-sm text-moonlight/70">72-hour implementation plan</p>
                    </div>
                    <div className="text-center p-4">
                      <Crown className="w-8 h-8 text-compass-gold mx-auto mb-2" />
                      <h4 className="font-semibold text-moonlight">Resources</h4>
                      <p className="text-sm text-moonlight/70">Curated optimization tools</p>
                    </div>
                  </div>

                  {!showEmailCapture ? (
                    <Button
                      onClick={() => setShowEmailCapture(true)}
                      variant="cta"
                      size="lg"
                      className="w-full max-w-md"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Get My Complete Blueprint
                    </Button>
                  ) : (
                    <div className="space-y-4 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email for instant access"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-center"
                      />
                      <Button
                        onClick={handleEmailCapture}
                        variant="cta"
                        className="w-full"
                        disabled={!email}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send My Blueprint
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {currentPhase === 'premium_offer' && (
              <Card className="bg-gradient-to-br from-navy/50 to-deep-navy/50 border-gold/30 p-8">
                <div className="text-center space-y-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Crown className="w-20 h-20 text-gold mx-auto mb-4" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-gold">
                    Ready to Implement Your Vision?
                  </h3>
                  
                  <p className="text-moonlight/80 max-w-2xl mx-auto">
                    Your blueprint is just the beginning. Work with our environment optimization 
                    specialists to transform your space into a peak performance catalyst.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <Card className="bg-navy/30 border-copper/30 p-6">
                      <h4 className="text-xl font-semibold text-moonlight mb-4">
                        Implementation Session
                      </h4>
                      <ul className="text-moonlight/70 space-y-2 text-left">
                        <li>• 90-minute 1:1 design consultation</li>
                        <li>• Custom environment optimization plan</li>
                        <li>• Product and layout recommendations</li>
                        <li>• Follow-up support</li>
                      </ul>
                      <div className="mt-6">
                        <span className="text-2xl font-bold text-gold">$497</span>
                        <span className="text-moonlight/60 line-through ml-2">$897</span>
                      </div>
                    </Card>

                    <Card className="bg-navy/30 border-gold/30 p-6 relative">
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-navy">
                        Most Popular
                      </Badge>
                      <h4 className="text-xl font-semibold text-moonlight mb-4">
                        Transformation Intensive
                      </h4>
                      <ul className="text-moonlight/70 space-y-2 text-left">
                        <li>• Complete environment transformation</li>
                        <li>• 3 months of guided implementation</li>
                        <li>• Weekly check-ins and adjustments</li>
                        <li>• Performance tracking dashboard</li>
                      </ul>
                      <div className="mt-6">
                        <span className="text-2xl font-bold text-gold">$1,997</span>
                        <span className="text-moonlight/60 line-through ml-2">$3,497</span>
                      </div>
                    </Card>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={onComplete}>
                      Continue with Free Blueprint
                    </Button>
                    <Button variant="cta" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Implementation Call
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-moonlight/50">
                    30-day money-back guarantee • Limited spots available
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentPhase !== 'premium_offer' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="tertiary"
              onClick={() => {
                const phases: FinalePhase[] = ['achievements', 'peak_mining', 'vision_creation', 'value_delivery', 'premium_offer'];
                const currentIndex = phases.indexOf(currentPhase);
                if (currentIndex < phases.length - 1) {
                  setCurrentPhase(phases[currentIndex + 1]);
                } else {
                  onComplete?.();
                }
              }}
            >
              Continue Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};