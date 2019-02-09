import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/HtmlRendererWebpackPlugin.ts",
  output: {
    file: pkg.main,
    format: "cjs"
  },
  external: [...Object.keys(pkg.dependencies), "fs", "path"],
  plugins: [
    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.build.json"
    })
  ]
};
