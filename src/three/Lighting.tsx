import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Soft ambient base */}
      <ambientLight intensity={0.8} color="#0d1424" />

      {/* Cyan key light (from top-left) */}
      <directionalLight position={[-6, 5, 4]} intensity={2.2} color="#00dfff" />

      {/* Violet fill light (from bottom-right) */}
      <directionalLight position={[6, -4, 3]} intensity={2.8} color="#8b4dff" />

      {/* Coral backlight (adds edge rim glow) */}
      <pointLight position={[0, -3, -4]} intensity={3.5} color="#ff647b" distance={15} />

      {/* Front soft light for contrast balance */}
      <directionalLight position={[0, 2, 6]} intensity={1.2} color="#f6f7fb" />
    </>
  );
};
