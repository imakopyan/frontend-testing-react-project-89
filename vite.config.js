/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    // setupFiles: './vitest.setup.js',
    deps: {
      inline: ['@hexlet/chatbot-v2'], // Adjust this as needed
      web: {
        transformCss: true, // Ensure CSS processing is enabled
      },
    },
  },
});
