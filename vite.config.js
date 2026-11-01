import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Same-origin /api in dev, mirroring the Vercel rewrite in prod, so auth cookies stay first-party
    proxy: { '/api': 'http://localhost:3001' },
  },
})
