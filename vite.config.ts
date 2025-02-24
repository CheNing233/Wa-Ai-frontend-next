import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

// Load env variables
dotenv.config({
  path: [
    ".env.development",
    ".env.development.local",
    ".env.production",
    ".env.production.local",
    ".env"
  ]
});

const API_URL = process.env.API_URL || "http://localhost:8080";
const WS_URL = process.env.WS_URL || "ws://localhost:8080";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: false,
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/ws": {
        target: WS_URL,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, "")
      }
    }
  },
  define: {
    __WA_FRONTEND_PACKAGE_NAME__: JSON.stringify(process.env.npm_package_name),
    __WA_FRONTEND_PACKAGE_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [react(), tsconfigPaths()]
});
