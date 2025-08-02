// Assessment data types for IPE-compliant system
export interface QuestionMetadata {
  id: string;
  question: string;
  options: string[];
  kpiTag: WFDKPICategory;
  adaptiveTriggers?: AdaptiveTrigger[];
  tier: 'foundation' | 'growth' | 'actualization';
  privacyLevel: 'public' | 'private' | 'clinical';
}

export type WFDKPICategory = 
  | 'future-orientation'
  | 'engagement-depth' 
  | 'environmental-agency'
  | 'growth-edge'
  | 'self-advocacy'
  | 'creative-expression'
  | 'relational-capacity'
  | 'resource-optimization';

export interface AdaptiveTrigger {
  responsePattern: number | number[];
  followUpQuestionId: string;
  branchingLogic?: 'immediate' | 'delayed' | 'conditional';
}

export interface AssessmentResponse {
  questionId: string;
  answer: number;
  kpiCategory: WFDKPICategory;
  timestamp: Date;
  adaptiveContext?: {
    triggeredBy: string;
    branchPath: string[];
  };
}

export interface AssessmentSession {
  sessionId: string;
  userId: string;
  responses: AssessmentResponse[];
  branch: 'safety' | 'optimization';
  completedAt?: Date;
  kpiMetrics: KPIMetrics;
  archetypeData: ArchetypeData;
}

export interface KPIMetrics {
  [key: string]: {
    score: number;
    category: WFDKPICategory;
    insights: string[];
  };
}

export interface ArchetypeData {
  primaryArchetype: string;
  strengthAreas: string[];
  growthOpportunities: string[];
  recommendedPathways: string[];
  viralShareData: {
    tagline: string;
    visualElements: string[];
    remixPrompts: string[];
  };
}

export interface SafetyResource {
  type: 'crisis' | 'support' | 'referral';
  title: string;
  description: string;
  contactMethod: string;
  available24_7: boolean;
  anonymous: boolean;
}