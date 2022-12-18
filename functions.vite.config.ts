import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src/functions',
  envDir: process.cwd(),
  server: {
    port: 3000,
    proxy: {
      '/translate': 'http://localhost:3001',
    },
  },
  build: {
    lib: {
      entry: {
        server: path.resolve(__dirname, 'src/functions/server/server.js'),
        translate: path.resolve(
          __dirname,
          'src/functions/translate/translate.ts'
        ),
      },
    },
    rollupOptions: {
      external: ['@aws-sdk/client-translate'],
      output: {
        globals: {
          ['@aws-sdk/client-translate']: 'Translate',
        },
      },
    },
  },
})
