import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Target, Zap, Crown, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  value: string;
}

interface AchievementSystemProps {
  userId: string;
  onAchievementUnlock?: (achievement: Achievement) => void;
  currentAssessmentData?: any;
}

const achievementTemplates: Omit<Achievement, 'unlocked' | 'progress'>[] = [
  {
    id: 'vision_architect',
    title: 'Vision Architect',
    description: 'Completed your first environmental assessment',
    icon: Target,
    maxProgress: 1,
    rarity: 'common',
    value: 'Basic insights unlocked'
  },
  {
    id: 'flow_designer',
    title: 'Flow Designer', 
    description: 'Used BreathSync to access peak state',
    icon: Zap,
    maxProgress: 1,
    rarity: 'rare',
    value: 'Peak state mastery'
  },
  {
    id: 'peak_explorer',
    title: 'Peak Explorer',
    description: 'Shared your most transformative experience',
    icon: Star,
    maxProgress: 3,
    rarity: 'epic',
    value: 'Deep self-knowledge'
  },
  {
    id: 'actualization_catalyst',
    title: 'Actualization Catalyst',
    description: 'Completed comprehensive vision mapping',
    icon: Crown,
    maxProgress: 5,
    rarity: 'legendary',
    value: 'Full blueprint access'
  }
];

export const AchievementSystem = ({ 
  userId, 
  onAchievementUnlock,
  currentAssessmentData 
}: AchievementSystemProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState<Achievement | null>(null);

  useEffect(() => {
    initializeAchievements();
    checkForNewAchievements();
  }, [userId, currentAssessmentData]);

  const initializeAchievements = async () => {
    try {
      const { data: profile } = await supabase
        .from('actualization_profiles')
        .select('achievements_unlocked, completion_milestones')
        .eq('user_id', userId)
        .single();

      const unlockedIds = profile?.achievements_unlocked || [];
      setUnlockedAchievements(unlockedIds);

      const achievementsList: Achievement[] = achievementTemplates.map(template => ({
        ...template,
        unlocked: unlockedIds.includes(template.id),
        progress: getAchievementProgress(template.id, profile?.completion_milestones || {})
      }));

      setAchievements(achievementsList);
    } catch (error) {
      console.error('Error loading achievements:', error);
      // Initialize with default state if no profile exists yet
      const achievementsList: Achievement[] = achievementTemplates.map(template => ({
        ...template,
        unlocked: false,
        progress: 0
      }));
      setAchievements(achievementsList);
    }
  };

  const getAchievementProgress = (achievementId: string, milestones: any): number => {
    switch (achievementId) {
      case 'vision_architect':
        return milestones.assessment_completed ? 1 : 0;
      case 'flow_designer':
        return milestones.breathsync_completed ? 1 : 0;
      case 'peak_explorer':
        return milestones.peak_experiences_shared || 0;
      case 'actualization_catalyst':
        return milestones.vision_components_completed || 0;
      default:
        return 0;
    }
  };

  const checkForNewAchievements = async () => {
    const achievementsToCheck = achievements.filter(a => !a.unlocked);
    
    for (const achievement of achievementsToCheck) {
      const shouldUnlock = checkAchievementCriteria(achievement);
      if (shouldUnlock) {
        await unlockAchievement(achievement);
      }
    }
  };

  const checkAchievementCriteria = (achievement: Achievement): boolean => {
    switch (achievement.id) {
      case 'vision_architect':
        return currentAssessmentData && Object.keys(currentAssessmentData).length > 0;
      case 'flow_designer':
        return sessionStorage.getItem('breathsync_completed') === 'true';
      case 'peak_explorer':
        return achievement.progress >= 1;
      case 'actualization_catalyst':
        return achievement.progress >= achievement.maxProgress;
      default:
        return false;
    }
  };

  const unlockAchievement = async (achievement: Achievement) => {
    try {
      const newUnlockedList = [...unlockedAchievements, achievement.id];
      
      await supabase
        .from('actualization_profiles')
        .upsert({
          user_id: userId,
          achievements_unlocked: newUnlockedList
        });

      setUnlockedAchievements(newUnlockedList);
      setAchievements(prev => 
        prev.map(a => 
          a.id === achievement.id 
            ? { ...a, unlocked: true }
            : a
        )
      );

      setShowCelebration(achievement);
      onAchievementUnlock?.(achievement);

      // Auto-hide celebration after 5 seconds
      setTimeout(() => setShowCelebration(null), 5000);
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-slate-500 to-slate-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-gold to-amber-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getRarityBadgeColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 text-slate-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-gold/20 text-gold';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-compass-gold mb-2">Your Actualization Journey</h3>
          <p className="text-moonlight/70">
            Unlock achievements as you explore your highest potential
          </p>
        </div>

        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Card className={`p-6 bg-navy/30 border transition-all duration-300 ${
                achievement.unlocked 
                  ? `border-gold/50 bg-gradient-to-r ${getRarityColor(achievement.rarity)}/10` 
                  : 'border-copper/20 hover:border-copper/40'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked 
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-semibold ${
                        achievement.unlocked ? 'text-gold' : 'text-moonlight'
                      }`}>
                        {achievement.title}
                      </h4>
                      <Badge className={getRarityBadgeColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      {achievement.unlocked && (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          <Trophy className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-moonlight/70 text-sm mb-3">
                      {achievement.description}
                    </p>
                    
                    {!achievement.unlocked && achievement.maxProgress > 1 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-moonlight/60">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {achievement.unlocked && (
                      <div className="text-sm text-gold font-medium">
                        🎁 Value Unlocked: {achievement.value}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCelebration(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-navy to-deep-navy p-8 rounded-2xl border border-gold/30 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gold mb-2">
                Achievement Unlocked!
              </h3>
              
              <h4 className="text-xl font-semibold text-moonlight mb-2">
                {showCelebration.title}
              </h4>
              
              <p className="text-moonlight/70 mb-4">
                {showCelebration.description}
              </p>
              
              <Badge className={`${getRarityBadgeColor(showCelebration.rarity)} mb-4`}>
                {showCelebration.rarity.toUpperCase()}
              </Badge>
              
              <div className="text-gold font-medium mb-6">
                🎁 {showCelebration.value}
              </div>
              
              <Button 
                onClick={() => setShowCelebration(null)}
                className="w-full"
                variant="cta"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continue Your Journey
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};