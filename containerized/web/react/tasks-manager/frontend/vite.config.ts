import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls during development to the backend on port 3000
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        // Backend routes are mounted at "/tasks" (no "/api" prefix)
        // Map "/api/*" -> "/*" so "/api/tasks" -> "/tasks"
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
