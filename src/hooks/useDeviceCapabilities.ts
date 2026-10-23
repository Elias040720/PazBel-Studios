import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  hasWebGL: boolean;
  isTouch: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    return {
      hasWebGL: true,
      isTouch: false,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  });

  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    const updateMatches = () => {
      const width = window.innerWidth;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setCapabilities({
        hasWebGL: checkWebGL(),
        isTouch,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    updateMatches();
    window.addEventListener('resize', updateMatches);
    return () => window.removeEventListener('resize', updateMatches);
  }, []);

  return capabilities;
}
