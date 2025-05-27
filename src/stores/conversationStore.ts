
import { create } from 'zustand';

export interface ConversationMessage {
  id: string;
  text: string;
  type: 'question' | 'response';
  timestamp: number;
}

export interface ConversationState {
  messages: ConversationMessage[];
  currentDepth: number;
  userContext: {
    preferredSpaces: string[];
    emotionalStates: string[];
    challenges: string[];
    connections: string[];
  };
  isComplete: boolean;
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  updateContext: (key: keyof ConversationState['userContext'], value: string) => void;
  completeConversation: () => void;
  resetConversation: () => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  messages: [],
  currentDepth: 0,
  userContext: {
    preferredSpaces: [],
    emotionalStates: [],
    challenges: [],
    connections: []
  },
  isComplete: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now()
    }],
    currentDepth: message.type === 'question' ? state.currentDepth + 1 : state.currentDepth
  })),
  
  updateContext: (key, value) => set((state) => ({
    userContext: {
      ...state.userContext,
      [key]: [...state.userContext[key], value]
    }
  })),
  
  completeConversation: () => set({ isComplete: true }),
  
  resetConversation: () => set({
    messages: [],
    currentDepth: 0,
    userContext: {
      preferredSpaces: [],
      emotionalStates: [],
      challenges: [],
      connections: []
    },
    isComplete: false
  })
}));
