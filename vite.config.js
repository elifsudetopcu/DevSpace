import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // 0.0.0.0: aynı ağdaki iPhone erişebilir
    port: 5173,
    strictPort: true,  // port doluysa sessizce değiştirmez, hata verir
  },
  preview: {
    host: true,
    port: 4173,
  },
})