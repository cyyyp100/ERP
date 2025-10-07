import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'jj-events-shared': resolve(rootDir, '../shared/src')
    }
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: [resolve(rootDir, '../shared')]
    }
  },
  preview: {
    port: 4173,
    host: true
  }
});
