import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CameraRig } from './CameraRig';
import { PBExperience } from './PBExperience';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

export interface ExperienceCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({ className, style }) => {
  const reducedMotion = useReducedMotion();
  const { hasWebGL } = useDeviceCapabilities();

  if (!hasWebGL) {
    // High fidelity 2D chromatic fallback
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          ...style,
        }}
      >
        <div
          style={{
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'var(--gradient-pb-spectrum)',
            filter: 'blur(40px)',
            opacity: 0.35,
          }}
        />
        <img
          src="/brand/pazbel-original.jpeg"
          alt="PazBel Monograma"
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '24px',
            mixBlendMode: 'screen',
            boxShadow: '0 0 50px rgba(0, 223, 255, 0.2)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        pointerEvents: 'auto',
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.75]} // Clamp DPR to prevent high DPI thermal throttling
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <PBExperience reducedMotion={reducedMotion} />
          <CameraRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
