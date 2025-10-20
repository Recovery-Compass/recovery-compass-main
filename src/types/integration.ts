// Integration-related type definitions

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  active: boolean;
  events: WebhookEvent[];
  createdAt: Date;
  lastTriggeredAt?: Date;
}

export type WebhookEvent =
  | 'assessment.completed'
  | 'achievement.unlocked'
  | 'vision.created'
  | 'user.registered';

export interface WebhookData {
  id: string;
  timestamp: string;
  source: 'google-sheets' | 'csv-upload' | 'excel-file';
  data: unknown[];
  status: 'pending' | 'processing' | 'completed' | 'error';
  recordCount: number;
}

export interface IntegrationStatus {
  connected: boolean;
  lastSync?: Date;
  errorMessage?: string;
  syncCount: number;
}

export interface MakeScenario {
  id: string;
  name: string;
  description: string;
  active: boolean;
  triggerType: string;
}
