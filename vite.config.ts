import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  outDir: "dist",
  mode,
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsConfigPaths(),
    eslint(),
    svgLoader(),
  ],
  build: {
    target: "es2022",
    sourcemap: mode === "production",
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
