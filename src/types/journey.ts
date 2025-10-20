// Journey and adventure-related type definitions

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  completedAt?: Date;
}

export type StepStatus = 'not-started' | 'in-progress' | 'completed' | 'skipped';

export interface AdventureInsight {
  id: string;
  userId: string;
  organizationType: string;
  organizationSize: string;
  primaryChallenge: string;
  role: string;
  aiResponse: string;
  createdAt: Date;
}

export interface Pathway {
  id: string;
  name: string;
  description: string;
  type: 'individual' | 'partnership' | 'organization';
  recommended: boolean;
}

export interface UserProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  currentPathway?: string;
}
