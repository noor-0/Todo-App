import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // send /api requests to the Node server during development
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
