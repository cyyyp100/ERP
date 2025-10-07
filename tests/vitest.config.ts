import { defineConfig } from 'vitest/config';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      'jj-events-shared': resolve(rootDir, '../shared/src')
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
});
