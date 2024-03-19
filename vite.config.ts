import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      port: 3000,
      proxy: {
        '/v2': {
          protocolRewrite: 'https',
          target: process.env.VITE_BaseURL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [react()],
  });
};
