import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // This is the standard Vite port
    strictPort: true, 
    open: true,      // This forces Chrome to open automatically
    host: '127.0.0.1' // This forces the 127.0.0.1 address you remember
  }
})