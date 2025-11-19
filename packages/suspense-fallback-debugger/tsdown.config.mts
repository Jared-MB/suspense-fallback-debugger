import { defineConfig } from "tsdown";
import pluginBabel from "@rollup/plugin-babel";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/dev.ts",
    "./src/suspense/context.tsx",
    "./src/components/dropdown-menu.tsx",
    "./src/internal/index.ts",
  ],

  minify: true,
  external: ["react", "react-dom"],
  plugins: [
    pluginBabel({
      babelHelpers: "bundled",
      parserOpts: {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      },
      plugins: ["babel-plugin-react-compiler"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
});
