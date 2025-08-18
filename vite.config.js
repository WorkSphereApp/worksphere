import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
build: {
    outDir: "dist",   // ✅ default, Render will serve this
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", "https://worksphere-back.onrender.com",
    },
  },
});
