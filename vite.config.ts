import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      '@': '/src',
      'Components': path.resolve(__dirname, 'src/components'),
      'Utils': path.resolve(__dirname, 'src/utils'),
      'Api': path.resolve(__dirname, 'src/api'),
    }
  }
})
