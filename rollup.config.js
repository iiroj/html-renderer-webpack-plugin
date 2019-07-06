import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/HtmlRendererWebpackPlugin.ts",
  output: {
    exports: "named",
    file: pkg.main,
    format: "cjs"
  },
  external: [...Object.keys(pkg.dependencies), "fs", "path"],
  plugins: [
    typescript({
      typescript: require("typescript"),
      tsconfig: "./tsconfig.build.json"
    })
  ],
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") console.warn(warning.message);
  }
};
