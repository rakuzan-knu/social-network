import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, '../backend/src'),
      '@common/contracts': path.resolve(__dirname, '../../packages/shared/contracts/src/index.ts'),
      '@common': path.resolve(__dirname, '../backend/src/common'),
      '@shared/contracts': path.resolve(__dirname, '../../packages/shared/contracts/src/index.ts'),
      '@shared/utils': path.resolve(__dirname, '../../packages/shared/utils/src/index.ts'),
      '@shared/crypto': path.resolve(__dirname, '../../packages/shared/crypto/src/index.ts'),
      '@shared/socket': path.resolve(__dirname, '../../packages/shared/socket/src/index.ts'),
      '@shared/stores': path.resolve(__dirname, '../../packages/shared/stores/src/index.ts'),
      '@shared/api-client': path.resolve(
        __dirname,
        '../../packages/shared/api-client/src/index.ts',
      ),
      '@shared/ui-primitives': path.resolve(
        __dirname,
        '../../packages/shared/ui-primitives/src/index.ts',
      ),
    },
  },
  test: {
    name: 'frontend',
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['./src/test/polyfills.ts', './src/test/setup.ts'],
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: undefined,
        minForks: 1,
      },
    },
    fileParallelism: true,
    maxConcurrency: 16,
    server: {
      deps: {
        inline: ['react-router', 'react-router-dom'],
      },
    },
    // Contract tests need a real Node environment and run via test:contract;
    // e2e/ specs belong to Playwright, not Vitest.
    exclude: [...configDefaults.exclude, 'src/contract/**', 'e2e/**'],
    coverage: {
      enabled: process.env.COVERAGE === 'true',
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/**/*.d.ts',
        'src/**/types.ts',
        'src/**/types/**',
        'src/**/*Types.ts',
        'src/**/*types.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.stories.{ts,tsx}',
      ],
      thresholds: {
        lines: 60,
        functions: 40,
        branches: 55,
        statements: 60,
        // Per-layer ratchet: values sit just below the current measured
        // coverage so regressions fail CI while room to improve remains.
        'src/shared/**': { lines: 78, statements: 78, branches: 77, functions: 64 },
        'src/entities/**': { lines: 77, statements: 77, branches: 70, functions: 63 },
        'src/app/**': { lines: 92, statements: 92, branches: 85, functions: 72 },
        'src/pages/**': { lines: 81, statements: 81, branches: 69, functions: 60 },
        'src/widgets/**': { lines: 80, statements: 80, branches: 60, functions: 40 },
        'src/features/**': { lines: 61, statements: 61, branches: 65, functions: 36 },
      },
    },
  },
});
