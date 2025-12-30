import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Allow JSX in .js files (for compatibility with existing codebase)
      include: "**/*.{jsx,js}",
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/wp-json": {
        target: "https://pmapi.bluewindlab.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build",
    sourcemap: true,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "form-vendor": ["react-hook-form", "react-google-recaptcha"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
