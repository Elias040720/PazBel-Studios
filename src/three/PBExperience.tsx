import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface PBExperienceProps {
  reducedMotion?: boolean;
}

export const PBExperience: React.FC<PBExperienceProps> = ({ reducedMotion = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (meshRef.current) {
      // Gentle continuous rotation
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.y += delta * 0.2;
    }

    if (groupRef.current) {
      // Interactive tilt based on pointer
      const targetRotationY = state.pointer.x * 0.4;
      const targetRotationX = -state.pointer.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Chromatic Monogram Sculpture */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.3, 0.36, 160, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#1e1833"
          emissive="#0d091a"
          roughness={0.12}
          metalness={0.88}
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          reflectivity={0.95}
          iridescence={0.85}
          iridescenceIOR={1.6}
        />
      </mesh>

      {/* Orbiting thin metallic ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00dfff"
          emissive="#00dfff"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};
