
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AssessmentOverlayProps {
  space: {
    id: string;
    name: string;
    description: string;
    color: string;
  };
  question: {
    id: string;
    text: string;
    type: 'scale' | 'choice' | 'text';
    range?: [number, number];
    options?: string[];
  };
  questionNumber: number;
  totalQuestions: number;
  onResponse: (response: any) => void;
  onClose: () => void;
}

const AssessmentOverlay = ({
  space,
  question,
  questionNumber,
  totalQuestions,
  onResponse,
  onClose
}: AssessmentOverlayProps) => {
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = () => {
    if (response !== null && response !== '') {
      onResponse(response);
      setResponse(null);
    }
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <div className="px-4">
              <Slider
                value={[response || 5]}
                onValueChange={(value) => setResponse(value[0])}
                min={question.range?.[0] || 1}
                max={question.range?.[1] || 10}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-moonlight/60 px-4">
              <span>Low</span>
              <span className="text-teal font-semibold">
                {response || 5}
              </span>
              <span>High</span>
            </div>
          </div>
        );

      case 'choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setResponse(option)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  response === option
                    ? 'bg-teal text-navy'
                    : 'bg-navy/40 text-moonlight hover:bg-navy/60'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={response || ''}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Share what feels comfortable to you..."
            className="w-full h-24 p-3 bg-navy/40 border border-teal/30 rounded-lg 
                     text-moonlight placeholder-moonlight/50 resize-none
                     focus:border-teal/60 focus:outline-none"
          />
        );

      default:
        return null;
    }
  };

  const isResponseValid = () => {
    if (question.type === 'text') {
      return response && response.trim().length > 0;
    }
    return response !== null && response !== undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-navy/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-navy/95 border border-teal/30 rounded-xl p-6 max-w-md w-full mx-4 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-bronze font-montserrat font-semibold text-lg">
              {space.name}
            </h3>
            <p className="text-moonlight/70 text-sm">
              Question {questionNumber} of {totalQuestions}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-moonlight/60 hover:text-moonlight transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-navy/60 rounded-full h-2 mb-6">
          <div
            className="bg-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-6">
          <h4 className="text-moonlight font-montserrat text-lg mb-4 leading-relaxed">
            {question.text}
          </h4>
          {renderQuestionInput()}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-moonlight/30 text-moonlight hover:bg-moonlight/10"
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isResponseValid()}
            className={`flex-1 font-montserrat ${
              isResponseValid()
                ? 'bg-teal hover:bg-teal/90 text-navy'
                : 'bg-moonlight/20 text-moonlight/40 cursor-not-allowed'
            }`}
          >
            {questionNumber === totalQuestions ? 'Complete' : 'Next'}
          </Button>
        </div>

        {/* Encouragement */}
        <p className="text-moonlight/60 text-sm text-center mt-4 italic">
          Take your time - there are no wrong answers
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentOverlay;
