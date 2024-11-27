import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/rosario/',  // Corrigindo para o nome correto do repositório
  server: {
    port: 3000
  },
  css: {
    postcss: './postcss.config.cjs'
  }
})
