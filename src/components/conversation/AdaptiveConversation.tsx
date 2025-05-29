
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useConversationStore, ConversationResponse } from '@/stores/conversationStore';
import { ConversationLogic } from './ConversationLogic';

const AdaptiveConversation = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const conversationLogic = useRef(new ConversationLogic());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    responses,
    currentDepth,
    isComplete,
    addResponse,
    updateContext,
    completeConversation,
    resetConversation
  } = useConversationStore();

  useEffect(() => {
    // Start with the opening question if no responses yet
    if (responses.length === 0 && !isTyping) {
      // Initial state - waiting for first response
    }
  }, [responses.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [responses]);

  const handleSubmitResponse = async () => {
    if (!currentInput.trim()) return;

    const currentQuestion = responses.length === 0 
      ? conversationLogic.current.getStartingQuestion()
      : conversationLogic.current.generateFollowUpQuestion(
          responses[responses.length - 1]?.answer || '',
          {
            previousResponses: responses.map(r => r.answer),
            detectedThemes: [],
            depth: currentDepth
          }
        );

    // Create response object matching ConversationResponse interface
    const response: ConversationResponse = {
      question: currentQuestion,
      answer: currentInput,
      emotionalTone: detectEmotionalTone(currentInput),
      environmentalClues: extractEnvironmentalClues(currentInput),
      timestamp: new Date()
    };

    // Add user response
    addResponse(response);
    
    const userResponse = currentInput;
    setCurrentInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if conversation should complete
    if (conversationLogic.current.shouldCompleteConversation(currentDepth + 1)) {
      completeConversation();
      setIsTyping(false);
      return;
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitResponse();
    }
  };

  const progressValue = Math.min((currentDepth / 6) * 100, 100);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <h2 className="text-2xl font-montserrat font-bold text-bronze">
          Thank you for sharing your story
        </h2>
        <p className="text-moonlight/80 font-montserrat">
          Based on our conversation, I've created your environmental compass. 
          Let me show you what I've learned about the spaces that matter to you.
        </p>
        <Button 
          onClick={() => window.location.href = '/compass-companion'}
          className="bg-teal hover:bg-teal/80 text-white font-montserrat"
        >
          View Your Environmental Compass
        </Button>
      </motion.div>
    );
  }

  // Display current question or starting question
  const currentQuestion = responses.length === 0 
    ? conversationLogic.current.getStartingQuestion()
    : conversationLogic.current.generateFollowUpQuestion(
        responses[responses.length - 1]?.answer || '',
        {
          previousResponses: responses.map(r => r.answer),
          detectedThemes: [],
          depth: currentDepth
        }
      );

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-moonlight/70 font-montserrat">
          <span>Conversation Progress</span>
          <span>{currentDepth}/6</span>
        </div>
        <Progress value={progressValue} className="h-2 bg-navy/50" />
      </div>

      {/* Current Question */}
      <div className="bg-teal/20 border border-teal/30 p-4 rounded-lg">
        <p className="font-montserrat text-moonlight">
          {currentQuestion}
        </p>
      </div>

      {/* Previous Responses */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence>
          {responses.map((response, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-right"
            >
              <div className="inline-block max-w-xs lg:max-w-md p-4 rounded-lg bg-bronze/20 border border-bronze/30 text-moonlight ml-auto">
                <p className="font-montserrat text-sm leading-relaxed">
                  {response.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-left"
          >
            <div className="inline-block bg-teal/10 border border-teal/20 p-4 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-teal rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what comes to mind..."
          disabled={isTyping}
          className="w-full p-4 bg-navy/30 border border-teal/30 rounded-lg text-moonlight placeholder-moonlight/50 font-montserrat resize-none focus:outline-none focus:border-teal/60 focus:ring-1 focus:ring-teal/60"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={resetConversation}
            className="text-moonlight/60 hover:text-moonlight font-montserrat"
          >
            Start Over
          </Button>
          <Button
            onClick={handleSubmitResponse}
            disabled={!currentInput.trim() || isTyping}
            className="bg-teal hover:bg-teal/80 text-white font-montserrat font-semibold px-6"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

// Utility functions
const detectEmotionalTone = (answer: string): 'hopeful' | 'reflective' | 'challenged' | 'content' => {
  const lowerAnswer = answer.toLowerCase();
  
  if (lowerAnswer.includes('hope') || lowerAnswer.includes('excited') || lowerAnswer.includes('looking forward')) {
    return 'hopeful';
  }
  if (lowerAnswer.includes('think') || lowerAnswer.includes('wonder') || lowerAnswer.includes('remember')) {
    return 'reflective';
  }
  if (lowerAnswer.includes('difficult') || lowerAnswer.includes('hard') || lowerAnswer.includes('struggle')) {
    return 'challenged';
  }
  return 'content';
};

const extractEnvironmentalClues = (answer: string): string[] => {
  const clues = [];
  const lowerAnswer = answer.toLowerCase();

  if (lowerAnswer.includes('car') || lowerAnswer.includes('drive')) clues.push('car');
  if (lowerAnswer.includes('room') || lowerAnswer.includes('bedroom')) clues.push('room');
  if (lowerAnswer.includes('outside') || lowerAnswer.includes('nature')) clues.push('nature');
  if (lowerAnswer.includes('control') || lowerAnswer.includes('decide')) clues.push('control');
  if (lowerAnswer.includes('friend') || lowerAnswer.includes('family')) clues.push('support');
  if (lowerAnswer.includes('community') || lowerAnswer.includes('neighborhood')) clues.push('community');

  return clues;
};

export default AdaptiveConversation;
