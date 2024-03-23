import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { splitVendorChunkPlugin } from 'vite';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      port: 3000,
      proxy: {
        '/api': {
          protocolRewrite: 'https',
          target: process.env.VITE_BaseURL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
      }),
      splitVendorChunkPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // creating a chunk to react routes deps. Reducing the vendor chunk size
            if (id.includes('react-router-dom') || id.includes('react-router')) {
              return '@react-router';
            }
            if (id.includes('tanstack')) {
              return '@tanstack';
            }
            if (id.includes('firebase')) {
              return '@firebase';
            }
            if (id.includes('framer')) {
              return '@framer';
            }
            if (id.includes('mantine')) {
              return '@mantine';
            }
          },
        },
      },
    },
  });
};
