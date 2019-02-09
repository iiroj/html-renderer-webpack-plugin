export default (hotPathRegex: RegExp) => () => {
  for (const id of Object.keys(require.cache)) {
    if (!id.includes("node_modules") && hotPathRegex.test(id)) {
      delete require.cache[id];
    }
  }
};
