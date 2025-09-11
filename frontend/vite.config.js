import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/// <reference types="vitest" />
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./src/test/setup.js'],
    environment: 'jsdom',
    globals: true,
  },
});