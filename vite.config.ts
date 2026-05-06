import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'

const spaFallback = () => ({
  name: 'spa-fallback',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      const path = req.url?.split('?')[0] || '/'
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (req.method === 'GET' && acceptsHtml && !path.startsWith('/api') && !path.includes('.') && path !== '/') {
        req.url = '/'
      }
      next()
    })
  },
  configurePreviewServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      const path = req.url?.split('?')[0] || '/'
      const acceptsHtml = req.headers.accept?.includes('text/html')
      if (req.method === 'GET' && acceptsHtml && !path.startsWith('/api') && !path.includes('.') && path !== '/') {
        req.url = '/'
      }
      next()
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    spaFallback(),
    react(),
    cloudflare({
      experimental: {
        headersAndRedirectsDevModeSupport: true,
      },
    }),
  ],
})
