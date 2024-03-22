import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

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
    ],
  });
};
