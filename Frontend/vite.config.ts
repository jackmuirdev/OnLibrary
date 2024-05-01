import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: '../backend/wwwroot',
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
});
