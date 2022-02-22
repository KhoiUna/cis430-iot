import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "device.html"),
      },
    },
  },
  css: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
