import { QuestionMetadata } from '@/types/assessment';

// IPE-compliant question bank with adaptive branching and KPI mapping
export const ASSESSMENT_QUESTIONS: Record<string, QuestionMetadata> = {
  // Foundation Question - determines initial branching
  'foundation-01': {
    id: 'foundation-01',
    question: "What would make you feel most alive in your living space?",
    options: [
      "Safety and security first",
      "Better organization and flow", 
      "More beauty and inspiration",
      "Deeper connection with nature",
      "Creating something that didn't exist before"
    ],
    kpiTag: 'environmental-agency',
    tier: 'foundation',
    privacyLevel: 'public',
    adaptiveTriggers: [
      { responsePattern: 0, followUpQuestionId: 'safety-deep-01', branchingLogic: 'immediate' },
      { responsePattern: [1, 2], followUpQuestionId: 'optimization-flow-01', branchingLogic: 'immediate' },
      { responsePattern: [3, 4], followUpQuestionId: 'actualization-creative-01', branchingLogic: 'immediate' }
    ]
  },

  // Safety Branch - Deep Dive
  'safety-deep-01': {
    id: 'safety-deep-01',
    question: "When you imagine feeling completely secure at home, what comes to mind first?",
    options: [
      "Knowing my belongings are safe",
      "Having reliable shelter and utilities",
      "Feeling emotionally stable in my space",
      "Having privacy when I need it",
      "Knowing I won't be displaced"
    ],
    kpiTag: 'self-advocacy',
    tier: 'foundation',
    privacyLevel: 'private',
    adaptiveTriggers: [
      { responsePattern: [0, 1], followUpQuestionId: 'safety-practical-01' },
      { responsePattern: [2, 3, 4], followUpQuestionId: 'safety-emotional-01' }
    ]
  },

  'safety-practical-01': {
    id: 'safety-practical-01',
    question: "What practical change would have the biggest impact on your sense of security?",
    options: [
      "Better locks or security measures",
      "More reliable heating/cooling",
      "Improved lighting throughout",
      "Better storage for my things",
      "Emergency preparedness setup"
    ],
    kpiTag: 'resource-optimization',
    tier: 'foundation',
    privacyLevel: 'public'
  },

  'safety-emotional-01': {
    id: 'safety-emotional-01',
    question: "How do you nurture your emotional well-being in your space?",
    options: [
      "I create quiet, private corners",
      "I use calming colors and textures",
      "I display meaningful objects",
      "I control who has access",
      "I practice mindfulness rituals here"
    ],
    kpiTag: 'relational-capacity',
    tier: 'growth',
    privacyLevel: 'private'
  },

  // Optimization Branch - Flow and Function
  'optimization-flow-01': {
    id: 'optimization-flow-01',
    question: "When you move through your space effortlessly, what enables that flow?",
    options: [
      "Everything has its place",
      "Paths are clear and logical", 
      "Lighting adapts to activities",
      "Technology works seamlessly",
      "The space anticipates my needs"
    ],
    kpiTag: 'engagement-depth',
    tier: 'growth',
    privacyLevel: 'public',
    adaptiveTriggers: [
      { responsePattern: [0, 1], followUpQuestionId: 'optimization-organization-01' },
      { responsePattern: [2, 3, 4], followUpQuestionId: 'optimization-smart-01' }
    ]
  },

  'optimization-organization-01': {
    id: 'optimization-organization-01',
    question: "What area of your space would benefit most from better organization?",
    options: [
      "Kitchen and food prep areas",
      "Work and creative spaces",
      "Bedroom and rest areas",
      "Storage and utility areas",
      "Transition zones and entryways"
    ],
    kpiTag: 'resource-optimization',
    tier: 'growth',
    privacyLevel: 'public'
  },

  'optimization-smart-01': {
    id: 'optimization-smart-01',
    question: "How would you love technology to enhance your daily rhythms?",
    options: [
      "Automate lighting and climate",
      "Streamline entertainment and media",
      "Optimize energy and resources",
      "Create ambient soundscapes",
      "Support health and wellness tracking"
    ],
    kpiTag: 'future-orientation',
    tier: 'growth',
    privacyLevel: 'public'
  },

  // Actualization Branch - Creative and Transformational
  'actualization-creative-01': {
    id: 'actualization-creative-01',
    question: "What would you love to create or manifest in your space?",
    options: [
      "A sanctuary for deep thinking",
      "A studio for artistic expression",
      "A gathering place for meaningful connections",
      "A garden or living ecosystem",
      "A space that inspires others"
    ],
    kpiTag: 'creative-expression',
    tier: 'actualization',
    privacyLevel: 'public',
    adaptiveTriggers: [
      { responsePattern: [0, 1], followUpQuestionId: 'actualization-personal-01' },
      { responsePattern: [2, 3, 4], followUpQuestionId: 'actualization-community-01' }
    ]
  },

  'actualization-personal-01': {
    id: 'actualization-personal-01',
    question: "How do you envision your space supporting your highest potential?",
    options: [
      "By reflecting my authentic values",
      "By inspiring daily growth practices",
      "By providing space for contemplation",
      "By supporting my creative process",
      "By being a laboratory for new ideas"
    ],
    kpiTag: 'future-orientation',
    tier: 'actualization',
    privacyLevel: 'private'
  },

  'actualization-community-01': {
    id: 'actualization-community-01',
    question: "How would you love your space to serve others and create positive impact?",
    options: [
      "Host meaningful gatherings and conversations",
      "Showcase sustainable living practices",
      "Provide a model others can adapt",
      "Create beauty that uplifts the neighborhood",
      "Offer a sanctuary for those who need it"
    ],
    kpiTag: 'relational-capacity',
    tier: 'actualization',
    privacyLevel: 'public'
  }
};

// Fallback questions for edge cases
export const UNIVERSAL_QUESTIONS: QuestionMetadata[] = [
  {
    id: 'universal-01',
    question: "What time of day do you feel most at peace in your space?",
    options: ["Early morning", "Midday", "Evening", "Late night", "It varies"],
    kpiTag: 'engagement-depth',
    tier: 'foundation',
    privacyLevel: 'public'
  },
  {
    id: 'universal-02', 
    question: "What element would most enhance your space's energy?",
    options: ["Natural light", "Plants or nature", "Art or beauty", "Music or sound", "Scents or textures"],
    kpiTag: 'environmental-agency',
    tier: 'growth',
    privacyLevel: 'public'
  }
];