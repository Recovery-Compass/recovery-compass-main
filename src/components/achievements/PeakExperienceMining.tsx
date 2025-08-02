import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Star, 
  Heart, 
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Mic,
  Play,
  Pause
} from 'lucide-react';

interface PeakExperience {
  moment: string;
  environment: string;
  emotions: string[];
  insights: string;
  impact: string;
}

interface PeakExperienceMiningProps {
  onComplete: (peakData: PeakExperience) => void;
  onSkip: () => void;
}

const emotionOptions = [
  'Flow', 'Clarity', 'Joy', 'Power', 'Peace', 'Excitement', 
  'Confidence', 'Gratitude', 'Wonder', 'Freedom', 'Purpose', 'Love'
];

const conversationalQuestions = [
  {
    id: 'moment',
    question: "Tell me about a moment when you felt truly alive and at your best. What was happening?",
    placeholder: "Describe the experience that made you feel most like your authentic self...",
    icon: Star
  },
  {
    id: 'environment',
    question: "What was your physical environment like during this peak moment?",
    placeholder: "The lighting, sounds, space, people around you, time of day...",
    icon: Target
  },
  {
    id: 'insights',
    question: "What did this experience teach you about what you need to thrive?",
    placeholder: "What insights about yourself or your needs did you discover?",
    icon: Lightbulb
  },
  {
    id: 'impact',
    question: "How did this experience change your perspective or direction in life?",
    placeholder: "What shifted for you after this moment?",
    icon: Zap
  }
];

export const PeakExperienceMining = ({ onComplete, onSkip }: PeakExperienceMiningProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleNext = () => {
    if (currentQuestion < conversationalQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete the experience
      const peakData: PeakExperience = {
        moment: responses.moment || '',
        environment: responses.environment || '',
        emotions: selectedEmotions,
        insights: responses.insights || '',
        impact: responses.impact || ''
      };
      onComplete(peakData);
    }
  };

  const currentQ = conversationalQuestions[currentQuestion];
  const canProceed = responses[currentQ.id]?.trim().length > 10;

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, you'd integrate with speech-to-text here
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {conversationalQuestions.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
              index <= currentQuestion
                ? 'border-gold bg-gold text-navy'
                : 'border-copper/30 bg-navy text-copper'
            }`}
          >
            {index < currentQuestion ? (
              <Star className="w-5 h-5" />
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-navy/50 border-gold/30 p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <currentQ.icon className="w-8 h-8 text-gold" />
              <Badge className="bg-gold/20 text-gold border-gold/30">
                Peak Experience Mining
              </Badge>
            </div>
            
            <h3 className="text-2xl font-semibold text-moonlight mb-4">
              {currentQ.question}
            </h3>
            
            <p className="text-moonlight/70">
              Take your time. There are no wrong answers - only your authentic experience.
            </p>
          </div>

          <div className="space-y-6">
            {/* Response Area */}
            <div className="relative">
              <Textarea
                value={responses[currentQ.id] || ''}
                onChange={(e) => handleResponseChange(currentQ.id, e.target.value)}
                placeholder={currentQ.placeholder}
                className="min-h-[120px] text-lg bg-navy/30 border-copper/30 focus:border-gold/50 resize-none"
              />
              
              {/* Voice Input Option */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRecording}
                className="absolute bottom-3 right-3 text-copper hover:text-gold"
              >
                {isRecording ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Recording...
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-1" />
                    Voice
                  </>
                )}
              </Button>
            </div>

            {/* Emotion Selection (for first question) */}
            {currentQuestion === 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-moonlight">
                  What emotions were present in this moment?
                </h4>
                <div className="flex flex-wrap gap-3">
                  {emotionOptions.map((emotion) => (
                    <Button
                      key={emotion}
                      variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleEmotionToggle(emotion)}
                      className="rounded-full"
                    >
                      {selectedEmotions.includes(emotion) && (
                        <Heart className="w-3 h-3 mr-1 fill-current" />
                      )}
                      {emotion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Character Counter */}
            <div className="text-right text-sm text-moonlight/60">
              {responses[currentQ.id]?.length || 0} characters
              {(responses[currentQ.id]?.length || 0) < 10 && (
                <span className="text-amber-400 ml-2">
                  (Share a bit more to unlock insights)
                </span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onSkip}>
          Skip This Step
        </Button>

        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            variant="cta"
            className="min-w-[120px]"
          >
            {currentQuestion === conversationalQuestions.length - 1 ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Insight Preview */}
      {responses[currentQ.id]?.length > 50 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-gold/10 to-amber-500/10 border-gold/30 p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-gold mb-1">Insight Emerging</h5>
                <p className="text-moonlight/80 text-sm">
                  Your response reveals patterns about optimal environments for peak performance. 
                  Continue to unlock personalized recommendations.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};