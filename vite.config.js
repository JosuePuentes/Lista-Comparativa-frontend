import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://5000-icrfzze1worka8reaaze3-a7388b69.manusvm.computer',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


