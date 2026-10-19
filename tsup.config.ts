import { defineConfig } from "tsup";

const shared = { target: "es2019" };

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.tsx", element: "src/element.ts" },
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react", "react/jsx-runtime"],
  },
  {
    // <script src="ko-loader.global.js"> for plain HTML sites; registers <ko-loader>, exposes window.KoLoader.
    ...shared,
    entry: { "ko-loader": "src/element.ts" },
    format: ["iife"],
    globalName: "KoLoader",
    minify: true,
  },
]);
