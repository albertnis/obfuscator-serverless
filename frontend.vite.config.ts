import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src/frontend',
  envDir: process.cwd(),
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'static/[name].js',
        assetFileNames: 'static/[name].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/translate': 'http://localhost:3001',
    },
  },
})
