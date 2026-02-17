import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'YCS-New' with your exact repository name
export default defineConfig({
  plugins: [react()],
  base: '/YCS-New/', 
})