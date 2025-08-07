import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
import packageJson from './package.json'

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    include: ['src', '!src/*.test.tsx', '!src/*.test.ts'],
    tsconfigPath: "./tsconfig.app.json",
    outDir: "dist/types",
    exclude: ['src/**.test.tsx', 'src/**.test.ts', "node_modules", "dist"],
    rollupTypes: true,
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', '.idea', '.git'],
    reporters: process.env.CI ? ['dot'] : ['default'],
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
        maxThreads: 1,
        minThreads: 1,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    isolate: true,
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      name: packageJson.name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
    },
  }
})
