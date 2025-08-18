import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://worksphere-back.onrender.com"
    : "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": backendUrl,
    },
  },
});
