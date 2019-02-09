export default function purgeRequireCache(compiler: any, done: any) {
  const context = compiler.context;

  for (const id of Object.keys(require.cache)) {
    if (!id.includes("node_modules") && id.includes(context)) {
      delete require.cache[id];
    }
  }

  return done();
}
