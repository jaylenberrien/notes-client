import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import VitePluginGhPages from 'vite-plugin-gh-pages';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/notes/'
})
