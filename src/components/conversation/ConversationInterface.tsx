
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConversationResponse } from '@/stores/conversationStore';

interface ConversationInterfaceProps {
  questionText: string;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  onSubmit: () => void;
  responses: ConversationResponse[];
  connectionScore: number;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  onComplete: () => void;
}

const ConversationInterface = ({
  questionText,
  currentAnswer,
  setCurrentAnswer,
  onSubmit,
  responses,
  connectionScore,
  isTyping,
  setIsTyping,
  onComplete
}: ConversationInterfaceProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currentAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="conversation-container"
    >
      {/* Connection progress indicator */}
      <ConnectionIndicator score={connectionScore} />

      {/* Previous responses visualization */}
      {responses.length > 0 && (
        <ConversationHistory responses={responses} />
      )}

      {/* Current question */}
      <motion.div
        className="current-question-container mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-montserrat font-light text-moonlight leading-relaxed mb-8 text-center">
          {questionText}
        </h2>

        {/* Answer input */}
        <div className="answer-input-container max-w-2xl mx-auto">
          <motion.textarea
            ref={textareaRef}
            value={currentAnswer}
            onChange={(e) => {
              setCurrentAnswer(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder="Take your time... there's no right answer."
            className="w-full p-6 text-lg bg-navy/40 backdrop-blur-sm border-2 border-teal/20 rounded-2xl 
                     focus:border-teal/40 focus:outline-none focus:ring-4 focus:ring-teal/10 
                     transition-all duration-300 resize-none min-h-[120px] text-moonlight
                     placeholder:text-moonlight/50 font-montserrat"
            style={{ 
              lineHeight: '1.6'
            }}
          />

          {/* Submit button */}
          <motion.div className="mt-4">
            <Button
              onClick={onSubmit}
              disabled={!currentAnswer.trim()}
              className={`px-8 py-3 rounded-full font-montserrat font-medium text-lg transition-all duration-300 ${
                currentAnswer.trim()
                  ? 'bg-teal hover:bg-teal/90 text-navy shadow-lg hover:shadow-xl'
                  : 'bg-moonlight/20 text-moonlight/40 cursor-not-allowed'
              }`}
            >
              {responses.length === 0 ? 'Share' : 'Continue'}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Gentle encouragement */}
      {isTyping && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-moonlight/70 mt-4 font-montserrat"
        >
          ✨ I'm listening...
        </motion.p>
      )}
    </motion.div>
  );
};

// Connection Progress Indicator
const ConnectionIndicator = ({ score }: { score: number }) => {
  return (
    <div className="connection-indicator mb-8 text-center">
      <div className="flex justify-center space-x-2 mb-2">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < score ? 'bg-teal' : 'bg-moonlight/20'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: i < score ? 1 : 0.7 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <p className="text-sm text-moonlight/60 font-montserrat">
        {score < 3 ? 'Getting to know you...' :
         score < 5 ? 'Building understanding...' :
         'Ready to explore together'}
      </p>
    </div>
  );
};

// Conversation History Display
const ConversationHistory = ({ responses }: { responses: ConversationResponse[] }) => {
  return (
    <motion.div
      className="conversation-history mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-montserrat font-medium text-moonlight/80 mb-6 text-center">
        Our conversation so far...
      </h3>
      
      <div className="space-y-6">
        {responses.slice(-3).map((response, index) => (
          <motion.div
            key={index}
            className="response-card bg-navy/40 backdrop-blur-sm rounded-xl p-6 border border-teal/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-moonlight/60 text-sm mb-2 italic font-montserrat">
              "{response.question}"
            </p>
            <p className="text-moonlight text-lg leading-relaxed font-montserrat">
              {response.answer}
            </p>
            <div className="mt-3 flex items-center space-x-3">
              <span className={`text-xs px-2 py-1 rounded-full font-montserrat ${
                response.emotionalTone === 'hopeful' ? 'bg-green-400/20 text-green-300' :
                response.emotionalTone === 'reflective' ? 'bg-blue-400/20 text-blue-300' :
                response.emotionalTone === 'challenged' ? 'bg-orange-400/20 text-orange-300' :
                'bg-purple-400/20 text-purple-300'
              }`}>
                {response.emotionalTone}
              </span>
              {response.environmentalClues.length > 0 && (
                <span className="text-xs text-moonlight/50 font-montserrat">
                  {response.environmentalClues.length} insights emerging
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConversationInterface;
