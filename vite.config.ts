import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
