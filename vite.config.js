import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  define: {
    // Define global app config object
    'process.env': {
      // Define environment variables
      CONFIG_API_URL: JSON.stringify('http://localhost:4000'),
    },
  },
  server: {
    proxy: {
      // Proxy requests to your backend server
      '/api': {
        target: 'http://roadstat-1958f9dd23afe0b9.elb.us-east-1.amazonaws.com:3000',
        // target: 'http://localhost:3000', // Change this to your backend server's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
      },
    },
  },
})
