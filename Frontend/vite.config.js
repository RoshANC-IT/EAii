import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for the 'src' directory
    },
  },
  build: {
    // Manual chunking to separate vendor dependencies
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Vendor chunks for third-party libraries
            return 'vendor';
          }
        },
      },
    },
    // Optional: Increase the chunk size warning limit (in KB)
    chunkSizeWarningLimit: 1000, // Change to a higher limit like 1000 KB
  },
});
