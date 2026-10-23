import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Keep the 3D stack in its own lazily-loaded chunk so the hero HTML paints first.
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three';
          if (id.includes('node_modules/gsap') || id.includes('@gsap')) return 'gsap';
          if (id.includes('node_modules/react') || id.includes('react-router') || id.includes('scheduler')) return 'react';
          return undefined;
        },
      },
    },
  },
  server: { port: 5173, strictPort: false },
  preview: { port: 4173 },
});
