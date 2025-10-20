import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Image, 
  Target,
  Heart,
  Zap,
  Crown,
  ArrowRight,
  Sparkles,
  Eye,
  Plus,
  X
} from 'lucide-react';

interface VisionData {
  vision: string;
  environment: string;
  values: string[];
  focus: string;
  imageUrl?: string;
}

interface VisionBoardCreatorProps {
  onComplete: (visionData: VisionData) => void;
  _assessmentData?: any;
}

const focusAreas = [
  { id: 'growth', label: 'Personal Growth', icon: Target, color: 'from-emerald-400 to-emerald-600' },
  { id: 'performance', label: 'Peak Performance', icon: Zap, color: 'from-blue-400 to-blue-600' },
  { id: 'creativity', label: 'Creative Expression', icon: Palette, color: 'from-purple-400 to-purple-600' },
  { id: 'leadership', label: 'Leadership', icon: Crown, color: 'from-gold to-amber-500' },
  { id: 'wellness', label: 'Holistic Wellness', icon: Heart, color: 'from-pink-400 to-pink-600' }
];

const suggestedValues = [
  'Authenticity', 'Excellence', 'Growth', 'Innovation', 'Connection',
  'Freedom', 'Purpose', 'Balance', 'Adventure', 'Wisdom',
  'Compassion', 'Integrity', 'Creativity', 'Impact', 'Joy'
];

const environmentPrompts = [
  "A space filled with natural light streaming through large windows",
  "Surrounded by plants and living elements that energize you",
  "Organized, minimalist environment with intentional design",
  "Cozy, warm space with textures and colors that inspire calm",
  "High-tech, efficient workspace optimized for productivity",
  "Open, airy space that promotes flow and movement",
  "Private sanctuary for deep work and reflection"
];

export const VisionBoardCreator = ({ onComplete, _assessmentData }: VisionBoardCreatorProps) => {
  const [step, setStep] = useState(1);
  const [visionData, setVisionData] = useState<VisionData>({
    vision: '',
    environment: '',
    values: [],
    focus: ''
  });
  const [customValue, setCustomValue] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const updateVisionData = (key: keyof VisionData, value: any) => {
    setVisionData(prev => ({ ...prev, [key]: value }));
  };

  const handleValueToggle = (value: string) => {
    const currentValues = visionData.values;
    if (currentValues.includes(value)) {
      updateVisionData('values', currentValues.filter(v => v !== value));
    } else if (currentValues.length < 5) {
      updateVisionData('values', [...currentValues, value]);
    }
  };

  const addCustomValue = () => {
    if (customValue.trim() && !visionData.values.includes(customValue.trim()) && visionData.values.length < 5) {
      updateVisionData('values', [...visionData.values, customValue.trim()]);
      setCustomValue('');
    }
  };

  const removeValue = (value: string) => {
    updateVisionData('values', visionData.values.filter(v => v !== value));
  };

  const selectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    updateVisionData('environment', prompt);
  };

  const canProceedStep = (currentStep: number) => {
    switch (currentStep) {
      case 1: return visionData.vision.length > 20;
      case 2: return visionData.values.length >= 3;
      case 3: return visionData.focus !== '';
      case 4: return visionData.environment.length > 10;
      default: return true;
    }
  };

  const handleComplete = () => {
    // In a real implementation, you'd process the vision board creation here
    const completedVisionData = {
      ...visionData,
      imageUrl: '/placeholder-vision-board.jpg' // Simulated generated image
    };
    onComplete(completedVisionData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="bg-navy/50 border-gold/30 p-8">
            <div className="text-center mb-8">
              <Eye className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-moonlight mb-2">
                Envision Your Future Self
              </h3>
              <p className="text-moonlight/70">
                Imagine yourself 2 years from now, living at your highest potential. What does that look like?
              </p>
            </div>

            <Textarea
              value={visionData.vision}
              onChange={(e) => updateVisionData('vision', e.target.value)}
              placeholder="I see myself as someone who... living in a way that... making an impact through... feeling deeply..."
              className="min-h-[150px] text-lg bg-navy/30 border-copper/30 focus:border-gold/50"
            />

            <div className="mt-4 text-right text-sm text-moonlight/60">
              {visionData.vision.length} characters
              {visionData.vision.length < 20 && (
                <span className="text-amber-400 ml-2">
                  (Paint a vivid picture to unlock insights)
                </span>
              )}
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="bg-navy/50 border-gold/30 p-8">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-moonlight mb-2">
                Your Core Values
              </h3>
              <p className="text-moonlight/70">
                Select the values that guide your highest self (choose 3-5)
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {suggestedValues.map((value) => (
                  <Button
                    key={value}
                    variant={visionData.values.includes(value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleValueToggle(value)}
                    disabled={!visionData.values.includes(value) && visionData.values.length >= 5}
                    className="rounded-full"
                  >
                    {value}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Add your own value"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
                />
                <Button 
                  onClick={addCustomValue}
                  disabled={!customValue.trim() || visionData.values.length >= 5}
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {visionData.values.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-moonlight">Selected Values:</h4>
                  <div className="flex flex-wrap gap-2">
                    {visionData.values.map((value) => (
                      <Badge 
                        key={value}
                        className="bg-gold/20 text-gold border-gold/30 pr-1"
                      >
                        {value}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeValue(value)}
                          className="ml-1 h-auto p-0 w-4 h-4 text-gold hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="bg-navy/50 border-gold/30 p-8">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-moonlight mb-2">
                Your Optimization Focus
              </h3>
              <p className="text-moonlight/70">
                What area of life are you most excited to elevate?
              </p>
            </div>

            <div className="grid gap-4">
              {focusAreas.map((area) => (
                <motion.div
                  key={area.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`p-6 cursor-pointer transition-all border-2 ${
                      visionData.focus === area.id
                        ? 'border-gold bg-gradient-to-r from-gold/10 to-amber-500/10'
                        : 'border-copper/30 bg-navy/30 hover:border-copper/50'
                    }`}
                    onClick={() => updateVisionData('focus', area.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${area.color}`}>
                        <area.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-moonlight">{area.label}</h4>
                      </div>
                      {visionData.focus === area.id && (
                        <div className="ml-auto">
                          <Badge className="bg-gold text-navy">Selected</Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="bg-navy/50 border-gold/30 p-8">
            <div className="text-center mb-8">
              <Palette className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-moonlight mb-2">
                Your Ideal Environment
              </h3>
              <p className="text-moonlight/70">
                Describe or select the physical space that would support your vision
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-moonlight mb-3">Quick Inspiration:</h4>
                <div className="grid gap-2">
                  {environmentPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant={selectedPrompt === prompt ? "default" : "outline"}
                      onClick={() => selectPrompt(prompt)}
                      className="text-left justify-start h-auto p-3 whitespace-normal"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-moonlight mb-3">Or describe your own:</h4>
                <Textarea
                  value={visionData.environment}
                  onChange={(e) => updateVisionData('environment', e.target.value)}
                  placeholder="Describe the physical space, lighting, colors, textures, and elements that would help you thrive..."
                  className="min-h-[120px] bg-navy/30 border-copper/30 focus:border-gold/50"
                />
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="bg-gradient-to-br from-navy/50 to-deep-navy/50 border-gold/30 p-8">
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-16 h-16 text-gold mx-auto mb-4" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gold mb-2">
                Your Vision Board is Ready!
              </h3>
              <p className="text-moonlight/70">
                Your personalized environment design is being generated...
              </p>
            </div>

            {/* Vision Summary */}
            <div className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-moonlight mb-2">Future Vision</h4>
                  <p className="text-moonlight/70 text-sm bg-navy/30 p-3 rounded">
                    {visionData.vision.substring(0, 150)}...
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-moonlight mb-2">Core Values</h4>
                  <div className="flex flex-wrap gap-1">
                    {visionData.values.map(value => (
                      <Badge key={value} className="bg-gold/20 text-gold text-xs">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-moonlight mb-2">Optimization Focus</h4>
                <Badge className="bg-compass-gold/20 text-compass-gold">
                  {focusAreas.find(f => f.id === visionData.focus)?.label}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-moonlight mb-2">Ideal Environment</h4>
                <p className="text-moonlight/70 text-sm bg-navy/30 p-3 rounded">
                  {visionData.environment.substring(0, 200)}...
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={handleComplete}
                variant="cta"
                size="lg"
                className="w-full max-w-md"
              >
                <Image className="w-5 h-5 mr-2" />
                Generate My Vision Board
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3, 4, 5].map((stepNum) => (
          <div
            key={stepNum}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              stepNum <= step
                ? 'border-gold bg-gold text-navy'
                : 'border-copper/30 bg-navy text-copper'
            }`}
          >
            {stepNum < step ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <span className="font-semibold text-sm">{stepNum}</span>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => step > 1 ? setStep(step - 1) : null}
          disabled={step === 1}
        >
          Previous
        </Button>

        {step < 5 && (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceedStep(step)}
            variant="cta"
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};