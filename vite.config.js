import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/rosario-app/', // Add this line for GitHub Pages
  server: {
    port: 3000
  },
  css: {
    postcss: './postcss.config.cjs'
  }
})
