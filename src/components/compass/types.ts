
export interface EnvironmentalVector {
  name: string;
  score: number;
  angle: number;
  description: string;
  interventions: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface InteractiveCompass3DProps {
  onVectorClick: (vector: EnvironmentalVector) => void;
  selectedVector: EnvironmentalVector | null;
}
