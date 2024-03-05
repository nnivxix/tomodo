import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import indexeddb from "fake-indexeddb";

globalThis.indexedDB = indexeddb;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
  },
});
