import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: './Client',
  plugins: [react()],
  build: {
    outDir: '../dist',
  }
})