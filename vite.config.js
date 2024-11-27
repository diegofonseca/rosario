import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',  // Mudando para caminho relativo
  server: {
    port: 3000
  },
  css: {
    postcss: './postcss.config.cjs'
  }
})
