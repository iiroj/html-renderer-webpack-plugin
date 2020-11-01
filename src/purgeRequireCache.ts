import { Compiler } from "webpack";

const purgeRequireCache = (compiler: Compiler): void => {
  const { context } = compiler;
  for (const id of Object.keys(require.cache)) {
    if (!id.includes("node_modules") && id.includes(context)) {
      delete require.cache[id];
    }
  }
};

export default purgeRequireCache;
