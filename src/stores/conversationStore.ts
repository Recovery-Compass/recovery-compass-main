
import { create } from 'zustand';

export interface ConversationResponse {
  question: string;
  answer: string;
  emotionalTone: 'hopeful' | 'reflective' | 'challenged' | 'content';
  environmentalClues: string[];
  timestamp: Date;
}

export interface EnvironmentalInsight {
  category: 'safety' | 'support' | 'resources' | 'growth' | 'community' | 'wellness';
  strength: number;
  story: string;
  interventionOpportunity?: string;
}

export interface ConversationState {
  currentQuestion: number;
  responses: ConversationResponse[];
  environmentalInsights: EnvironmentalInsight[];
  conversationPersonality: 'contemplative' | 'energetic' | 'grounded' | 'creative';
  readyForCompass: boolean;
  connectionScore: number;
  isComplete: boolean;
  addResponse: (response: ConversationResponse) => void;
  generateNextQuestion: () => string;
  updateInsights: () => void;
  resetConversation: () => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  currentQuestion: 0,
  responses: [],
  environmentalInsights: [],
  conversationPersonality: 'contemplative',
  readyForCompass: false,
  connectionScore: 0,
  isComplete: false,

  addResponse: (response: ConversationResponse) => {
    const state = get();
    set({
      responses: [...state.responses, response],
      currentQuestion: state.currentQuestion + 1,
      connectionScore: state.connectionScore + 1
    });
    get().updateInsights();
    
    // Check if ready for compass reveal
    const newState = get();
    if (newState.responses.length >= 6 && newState.connectionScore >= 4) {
      set({ readyForCompass: true });
    }
  },

  generateNextQuestion: () => {
    const state = get();
    return generateAdaptiveQuestion(state.responses, state.conversationPersonality);
  },

  updateInsights: () => {
    const state = get();
    const insights = extractEnvironmentalInsights(state.responses);
    set({ 
      environmentalInsights: insights,
      isComplete: state.responses.length >= 6
    });
  },

  resetConversation: () => set({
    currentQuestion: 0,
    responses: [],
    environmentalInsights: [],
    conversationPersonality: 'contemplative',
    readyForCompass: false,
    connectionScore: 0,
    isComplete: false
  })
}));

// Adaptive Question Generation Logic
const generateAdaptiveQuestion = (
  responses: ConversationResponse[],
  personality: string
): string => {
  const lastResponse = responses[responses.length - 1];
  const environmentalClues = lastResponse?.environmentalClues || [];
  const emotionalTone = lastResponse?.emotionalTone;

  // Extract key themes from previous answers
  const themes = extractThemes(responses);

  // Generate contextual follow-up questions
  if (responses.length === 1) {
    // Follow up on the first response with curiosity
    if (environmentalClues.includes('car')) {
      return "What is it about your car that makes it special to you?";
    }
    if (environmentalClues.includes('room') || environmentalClues.includes('bedroom')) {
      return "Tell me more about that space - what makes it yours?";
    }
    if (environmentalClues.includes('nature') || environmentalClues.includes('outside')) {
      return "When you're in that place, how does your body feel different?";
    }
    return "What drew you to that particular place or moment?";
  }

  if (responses.length === 2) {
    // Build on themes, explore connection
    if (themes.includes('control')) {
      return "Where else in your life do you feel that same sense of control?";
    }
    if (themes.includes('peace')) {
      return "Who in your life understands that peaceful feeling you described?";
    }
    if (themes.includes('safety')) {
      return "What does safety mean to you in your daily life?";
    }
    return "How do the people around you respond to this side of you?";
  }

  if (responses.length === 3) {
    // Explore support and community
    if (emotionalTone === 'hopeful') {
      return "Who celebrates your wins with you?";
    }
    if (emotionalTone === 'reflective') {
      return "What would surprise people who think they know you?";
    }
    return "When things get tough, what keeps you going?";
  }

  if (responses.length === 4) {
    // Explore challenges and resources
    return "What's one thing you wish was easier in your daily life?";
  }

  if (responses.length === 5) {
    // Explore growth and future
    return "If you could change one thing about your environment, what would it be?";
  }

  // Final questions focus on vision and hope
  return "What's something you're curious about for your future?";
};

// Environmental Insight Extraction
const extractEnvironmentalInsights = (responses: ConversationResponse[]): EnvironmentalInsight[] => {
  const insights: EnvironmentalInsight[] = [];

  responses.forEach(response => {
    const { environmentalClues, emotionalTone, answer } = response;

    // Safety insights
    if (environmentalClues.includes('car') || environmentalClues.includes('control')) {
      insights.push({
        category: 'safety',
        strength: emotionalTone === 'content' ? 8 : 6,
        story: `Finds safety and control in personal spaces like ${extractSpaceFromAnswer(answer)}`,
        interventionOpportunity: 'Explore expanding safe spaces in other environments'
      });
    }

    // Support insights
    if (answer.toLowerCase().includes('friend') || answer.toLowerCase().includes('family')) {
      insights.push({
        category: 'support',
        strength: emotionalTone === 'hopeful' ? 8 : 5,
        story: 'Has meaningful connections that provide support',
        interventionOpportunity: 'Strengthen existing support networks'
      });
    }

    // Community insights
    if (environmentalClues.includes('nature') || environmentalClues.includes('community')) {
      insights.push({
        category: 'community',
        strength: 7,
        story: 'Connects with broader environment and community spaces',
        interventionOpportunity: 'Explore community engagement opportunities'
      });
    }

    // Growth insights
    if (emotionalTone === 'hopeful' || answer.toLowerCase().includes('future')) {
      insights.push({
        category: 'growth',
        strength: 8,
        story: 'Shows capacity for hope and future-oriented thinking',
        interventionOpportunity: 'Support goal-setting and future planning'
      });
    }
  });

  return insights;
};

// Utility functions
export const detectEmotionalTone = (answer: string): 'hopeful' | 'reflective' | 'challenged' | 'content' => {
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

export const extractEnvironmentalClues = (answer: string): string[] => {
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

const extractThemes = (responses: ConversationResponse[]): string[] => {
  const allClues = responses.flatMap(r => r.environmentalClues);
  return [...new Set(allClues)];
};

const extractSpaceFromAnswer = (answer: string): string => {
  const lowerAnswer = answer.toLowerCase();
  if (lowerAnswer.includes('car')) return 'their car';
  if (lowerAnswer.includes('room')) return 'their room';
  if (lowerAnswer.includes('outside')) return 'outdoor spaces';
  return 'personal spaces';
};
