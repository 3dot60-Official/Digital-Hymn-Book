import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from .env file and process.env
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This makes the environment variable available to the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
