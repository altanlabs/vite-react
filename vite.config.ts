import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    preview: {
      strictPort: false,
      host: '127.0.0.1',
      allowedHosts: true,
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'ESLINT_ERROR') return;
        warn(warning);
      }
    }
  }
})
