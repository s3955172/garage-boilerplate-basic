import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve, dirname, join } from 'path'

const vitestPkg = require.resolve('vitest/package.json')
const vitePkg = require.resolve('vite/package.json', { paths: [dirname(vitestPkg)] })
const viteEnvFile = join(dirname(vitePkg), 'dist/client/env.mjs')

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': resolve(__dirname, './src'),
      '/@vite/env': viteEnvFile,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/components/ui/**', // shadcn components — not hand-authored
        '**/*.d.ts',
        '**/*.config.*',
        'src/app/**', // pages tested via E2E, not unit tests
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '/@vite/env': viteEnvFile,
    },
  },
})
