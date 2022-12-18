import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src/functions',
  envDir: process.cwd(),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      name: 'server',
      entry: path.resolve(__dirname, 'server.js'),
    },
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
        assetFileNames: '[name]asset.js',
        chunkFileNames: '[name]chunk.js',
      },
    },
  },
})
