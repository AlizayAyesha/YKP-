import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {seoPrerender} from './vite-plugin-seo-prerender';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoPrerender()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8788',
          timeout: 120000
        },
        '/uploads': 'http://127.0.0.1:8788'
      }
    },
  };
});
