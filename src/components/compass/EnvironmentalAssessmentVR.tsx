import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import EnvironmentalSpace3D from './EnvironmentalSpace3D';
import AssessmentOverlay from './AssessmentOverlay';

interface EnvironmentalAssessmentVRProps {
  onComplete: () => void;
}

const environmentalSpaces = [
  {
    id: 'bedroom',
    name: 'Sanctuary Space',
    description: 'Your personal retreat - where you rest and recharge',
    color: '#4A90E2',
    position: [-2, 0, 0] as [number, number, number]
  },
  {
    id: 'transportation',
    name: 'Movement Flow',
    description: 'Vehicles and transit - your mobile environment',
    color: '#F5A623',
    position: [0, 0, 0] as [number, number, number]
  },
  {
    id: 'relationships',
    name: 'Connection Field',
    description: 'Social spaces - where you connect with others',
    color: '#7ED321',
    position: [2, 0, 0] as [number, number, number]
  }
];

const assessmentQuestions = [
  {
    id: 'control',
    text: 'In this space, how much control do you feel over your environment?',
    type: 'scale' as const,
    range: [1, 10] as [number, number]
  },
  {
    id: 'safety',
    text: 'How safe and secure does this environment feel to you?',
    type: 'scale' as const,
    range: [1, 10] as [number, number]
  },
  {
    id: 'agency',
    text: 'Can you shape or modify this space to meet your needs?',
    type: 'choice' as const,
    options: ['Completely', 'Somewhat', 'A little', 'Not at all']
  },
  {
    id: 'support',
    text: 'What supportive elements exist in this space?',
    type: 'text' as const
  }
];

const EnvironmentalAssessmentVR = ({ onComplete }: EnvironmentalAssessmentVRProps) => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isAssessing, setIsAssessing] = useState(false);
  const [completedSpaces, setCompletedSpaces] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSpaceSelect = (spaceId: string) => {
    setSelectedSpace(spaceId);
    setIsAssessing(true);
    setCurrentQuestion(0);
    setResponses({});
  };

  const handleResponseSubmit = (response: any) => {
    const questionId = assessmentQuestions[currentQuestion].id;
    const newResponses = { ...responses, [questionId]: response };
    setResponses(newResponses);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment for this space
      const spaceData = {
        spaceId: selectedSpace,
        responses: newResponses,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage for demo
      const existingData = JSON.parse(localStorage.getItem('compassAssessments') || '[]');
      existingData.push(spaceData);
      localStorage.setItem('compassAssessments', JSON.stringify(existingData));

      setCompletedSpaces([...completedSpaces, selectedSpace!]);
      setIsAssessing(false);
      setSelectedSpace(null);

      // If all spaces completed, trigger main completion
      if (completedSpaces.length + 1 >= environmentalSpaces.length) {
        setTimeout(() => onComplete(), 1500);
      }
    }
  };

  const currentSpace = environmentalSpaces.find(s => s.id === selectedSpace);
  const currentQuestionData = assessmentQuestions[currentQuestion];

  return (
    <div className="w-full h-[600px] relative">
      {/* 3D Environment */}
      <div className="w-full h-full rounded-lg overflow-hidden bg-navy/20">
        <Canvas ref={canvasRef} shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={8}
          />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.8} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <Environment preset="city" />
          
          {/* Environmental Spaces */}
          {environmentalSpaces.map((space) => (
            <EnvironmentalSpace3D
              key={space.id}
              space={space}
              isSelected={selectedSpace === space.id}
              isCompleted={completedSpaces.includes(space.id)}
              onClick={() => handleSpaceSelect(space.id)}
            />
          ))}
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshLambertMaterial color="#1a1f2e" transparent opacity={0.3} />
          </mesh>
        </Canvas>
      </div>

      {/* Assessment Overlay */}
      <AnimatePresence>
        {isAssessing && currentSpace && currentQuestionData && (
          <AssessmentOverlay
            space={currentSpace}
            question={currentQuestionData}
            questionNumber={currentQuestion + 1}
            totalQuestions={assessmentQuestions.length}
            onResponse={handleResponseSubmit}
            onClose={() => {
              setIsAssessing(false);
              setSelectedSpace(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isAssessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 right-4 bg-navy/80 backdrop-blur-sm rounded-lg p-4 border border-teal/30"
        >
          <div className="text-center">
            <h3 className="text-moonlight font-montserrat font-semibold mb-2">
              Environmental Assessment
            </h3>
            <p className="text-moonlight/80 text-sm mb-3">
              Click on any space to begin a gentle assessment of that environment
            </p>
            <div className="flex justify-center gap-2">
              {environmentalSpaces.map((space) => (
                <div
                  key={space.id}
                  className={`w-3 h-3 rounded-full ${
                    completedSpaces.includes(space.id)
                      ? 'bg-teal'
                      : 'bg-moonlight/30'
                  }`}
                />
              ))}
            </div>
            <p className="text-moonlight/60 text-xs mt-2">
              {completedSpaces.length} of {environmentalSpaces.length} spaces assessed
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EnvironmentalAssessmentVR;
