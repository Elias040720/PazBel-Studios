import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface CameraRigProps {
  reducedMotion?: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({ reducedMotion = false }) => {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.5));

  useFrame((state) => {
    if (reducedMotion) {
      state.camera.position.set(0, 0, 5.5);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Gentle reaction to cursor pointer
    const x = state.pointer.x * 0.45;
    const y = state.pointer.y * 0.35;

    targetPos.current.set(x, y, 5.5);

    // Smooth dampening
    currentPos.current.lerp(targetPos.current, 0.05);
    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};
