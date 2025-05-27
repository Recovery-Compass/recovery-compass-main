
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useConversationStore, detectEmotionalTone, extractEnvironmentalClues } from '@/stores/conversationStore';

interface ConversationInterfaceProps {
  onComplete: () => void;
}

const ConversationInterface = ({ onComplete }: ConversationInterfaceProps) => {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    currentQuestion,
    responses,
    connectionScore,
    readyForCompass,
    addResponse,
    generateNextQuestion
  } = useConversationStore();

  // Opening questions - human to human
  const openingQuestions = [
    "What's one place where you feel most like yourself?",
    "Tell me about a moment today when you felt at peace.",
    "If you could show someone the real you, where would you take them?",
    "What's something in your space that makes you smile?",
    "When do you feel most at home in your own skin?"
  ];

  const currentQuestionText = currentQuestion === 0 
    ? openingQuestions[Math.floor(Math.random() * openingQuestions.length)]
    : generateNextQuestion();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currentAnswer]);

  // Check if ready for compass reveal
  useEffect(() => {
    if (readyForCompass && responses.length >= 6) {
      setTimeout(() => onComplete(), 2000);
    }
  }, [readyForCompass, responses.length, onComplete]);

  const handleSubmitResponse = () => {
    if (!currentAnswer.trim()) return;

    const response = {
      question: currentQuestionText,
      answer: currentAnswer,
      emotionalTone: detectEmotionalTone(currentAnswer),
      environmentalClues: extractEnvironmentalClues(currentAnswer),
      timestamp: new Date()
    };

    addResponse(response);
    setCurrentAnswer('');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitResponse();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="conversation-container max-w-4xl mx-auto"
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
          {currentQuestionText}
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
            onKeyPress={handleKeyPress}
            placeholder="Take your time... there's no right answer."
            className="w-full p-6 text-lg bg-navy/30 border-2 border-teal/30 rounded-2xl 
                     focus:border-teal/60 focus:outline-none focus:ring-4 focus:ring-teal/20 
                     transition-all duration-300 resize-none min-h-[120px] text-moonlight 
                     placeholder-moonlight/50 font-montserrat backdrop-blur-sm"
          />

          {/* Submit button */}
          <motion.div className="flex justify-center mt-6">
            <Button
              onClick={handleSubmitResponse}
              disabled={!currentAnswer.trim()}
              className={`px-8 py-3 rounded-full font-montserrat font-semibold text-lg transition-all duration-300 ${
                currentAnswer.trim()
                  ? 'bg-teal hover:bg-teal/80 text-white shadow-lg hover:shadow-xl'
                  : 'bg-moonlight/20 text-moonlight/40 cursor-not-allowed'
              }`}
              whileHover={currentAnswer.trim() ? { scale: 1.05 } : {}}
              whileTap={currentAnswer.trim() ? { scale: 0.95 } : {}}
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
              i < score ? 'bg-teal' : 'bg-moonlight/30'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: i < score ? 1 : 0.7 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <p className="text-sm text-moonlight/70 font-montserrat">
        {score < 3 ? 'Getting to know you...' :
         score < 5 ? 'Building understanding...' :
         'Ready to explore together'}
      </p>
    </div>
  );
};

// Conversation History Display
const ConversationHistory = ({ responses }: { responses: any[] }) => {
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
                response.emotionalTone === 'hopeful' ? 'bg-bronze/20 text-bronze' :
                response.emotionalTone === 'reflective' ? 'bg-teal/20 text-teal' :
                response.emotionalTone === 'challenged' ? 'bg-red-500/20 text-red-400' :
                'bg-moonlight/20 text-moonlight'
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
