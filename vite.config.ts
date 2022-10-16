import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  outDir: "dist",
  plugins: [react(), tsConfigPaths(), eslint(), svgLoader()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        page: resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
}));
