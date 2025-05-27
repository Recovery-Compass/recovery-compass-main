
import { EnvironmentalVector } from './types';

export const environmentalData: EnvironmentalVector[] = [
  {
    name: 'Physical Safety',
    score: 7.2,
    angle: 0,
    description: 'Your sense of physical security in your environment',
    interventions: ['Safety planning', 'Environmental modifications', 'Support network activation'],
    riskLevel: 'medium'
  },
  {
    name: 'Social Support',
    score: 8.5,
    angle: 45,
    description: 'Quality and availability of supportive relationships',
    interventions: ['Peer support groups', 'Family therapy', 'Community connections'],
    riskLevel: 'low'
  },
  {
    name: 'Resource Access',
    score: 6.1,
    angle: 90,
    description: 'Availability of essential resources and services',
    interventions: ['Resource mapping', 'Advocacy services', 'Navigation support'],
    riskLevel: 'high'
  },
  {
    name: 'Trigger Proximity',
    score: 4.3,
    angle: 135,
    description: 'Distance from known environmental triggers',
    interventions: ['Trigger identification', 'Environmental changes', 'Coping strategies'],
    riskLevel: 'high'
  },
  {
    name: 'Community Connection',
    score: 7.8,
    angle: 180,
    description: 'Sense of belonging and community engagement',
    interventions: ['Community activities', 'Volunteer opportunities', 'Cultural connections'],
    riskLevel: 'low'
  },
  {
    name: 'Healthcare Access',
    score: 5.9,
    angle: 225,
    description: 'Availability and quality of healthcare services',
    interventions: ['Care coordination', 'Insurance navigation', 'Provider connections'],
    riskLevel: 'medium'
  },
  {
    name: 'Economic Stability',
    score: 5.2,
    angle: 270,
    description: 'Financial security and economic resources',
    interventions: ['Financial planning', 'Employment support', 'Benefits assistance'],
    riskLevel: 'high'
  },
  {
    name: 'Recovery Capital',
    score: 8.1,
    angle: 315,
    description: 'Internal and external resources supporting recovery',
    interventions: ['Strength identification', 'Skill building', 'Asset development'],
    riskLevel: 'low'
  }
];
