// User-related type definitions

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'individual' | 'partner' | 'organization' | 'admin';

export interface UserProfile {
  userId: string;
  archetype?: Archetype;
  branch?: 'safety' | 'optimization';
  preferences: UserPreferences;
}

export type Archetype =
  | 'Steady Builder'
  | 'Secure Creator'
  | 'Visionary Architect'
  | 'Community Builder'
  | 'Recovery Seeker';

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailUpdates: boolean;
  privacySettings: PrivacySettings;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  shareProgress: boolean;
  shareInsights: boolean;
}
