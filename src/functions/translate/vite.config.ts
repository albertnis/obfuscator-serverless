import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '.',
  envDir: process.cwd(),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      name: 'translate',
      entry: path.resolve(__dirname, 'translate.ts'),
    },
    rollupOptions: {
      external: ['@aws-sdk/client-translate'],
      output: {
        format: 'umd',
        globals: {
          ['@aws-sdk/client-translate']: 'Translate',
        },
      },
    },
  },
})
