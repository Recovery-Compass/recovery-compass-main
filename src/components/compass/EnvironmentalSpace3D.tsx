
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface EnvironmentalSpace3DProps {
  space: {
    id: string;
    name: string;
    description: string;
    color: string;
    position: [number, number, number];
  };
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const EnvironmentalSpace3D = ({ 
  space, 
  isSelected, 
  isCompleted, 
  onClick 
}: EnvironmentalSpace3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + space.position[0]) * 0.1;
      
      // Pulsing effect when selected
      if (isSelected) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    
    if (groupRef.current && isSelected) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const getSpaceGeometry = () => {
    switch (space.id) {
      case 'bedroom':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'transportation':
        return <cylinderGeometry args={[0.5, 0.8, 1.2, 8]} />;
      case 'relationships':
        return <sphereGeometry args={[0.7, 16, 16]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <group ref={groupRef} position={space.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        {getSpaceGeometry()}
        <meshPhongMaterial 
          color={space.color}
          transparent
          opacity={isCompleted ? 0.9 : 0.7}
          emissive={isSelected ? space.color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {/* Completion indicator */}
      {isCompleted && (
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshPhongMaterial color="#148D8D" emissive="#148D8D" emissiveIntensity={0.3} />
        </mesh>
      )}

      {/* Space label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="#C69C6D"
        anchorX="center"
        anchorY="middle"
      >
        {space.name}
      </Text>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#148D8D" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

export default EnvironmentalSpace3D;
