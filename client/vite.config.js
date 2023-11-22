import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_APP_');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/graphql': {
          target: 'http://localhost:3001',
          secure: false,
          changeOrigin: true
        }
      }
    },
   define: {
      'process.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(env.VITE_APP_CLOUDINARY_CLOUD_NAME),
      'process.env.BACKEND_BASEURL': JSON.stringify(env.VITE_APP_BACKEND_BASEURL),
      'process.env.CLOUDINARY_API_KEY': JSON.stringify(env.VITE_APP_CLOUDINARY_API_KEY)
    }
  }
})
