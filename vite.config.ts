/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["./src/**/**.test.tsx"],
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "./src/test/setup.ts")],
    reporters: "dot"
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: "./src/background.ts",
        content: "./src/content.ts",
        options: "./src/options.tsx"
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          return assetInfo.name;
        }
      }
    }
  }
});
