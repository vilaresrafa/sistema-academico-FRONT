import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/disciplinas': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/turmas': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/alunos': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/inscricoes': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
