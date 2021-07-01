import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

const input = "./src/index.ts";

const external = ["path", ...Object.keys(pkg.peerDependencies)];

export default [
  {
    input,
    output: {
      dir: ".",
      exports: "named",
      footer: "module.exports = HtmlRendererWebpackPlugin;",
      format: "cjs",
    },
    external,
    plugins: [
      typescript({
        declaration: true,
        declarationDir: ".",
      }),
    ],
  },
  {
    input,
    output: {
      file: "index.mjs",
      exports: "named",
      format: "esm",
    },
    external,
    plugins: [typescript()],
  },
];
