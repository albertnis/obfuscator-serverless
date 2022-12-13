import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src/frontend',
  envDir: process.cwd(),
  server: {
    port: 3000,
  },
})
