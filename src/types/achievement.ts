// Achievement-related type definitions

export interface Vision {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: VisionCategory;
  targetDate?: Date;
  status: VisionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type VisionCategory = 
  | 'health'
  | 'relationships'
  | 'career'
  | 'personal-growth'
  | 'environment'
  | 'creativity';

export type VisionStatus =
  | 'active'
  | 'completed'
  | 'archived';

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  points: number;
  unlockedAt: Date;
  icon?: string;
}

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
}

export interface PeakExperience {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: Date;
  lessons: string[];
  emotionalTone: string;
  category: string;
}
