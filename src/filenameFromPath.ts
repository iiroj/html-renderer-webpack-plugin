export default (path: string) =>
  path.replace(/\/$/, "/index").replace(/^\//, "") + ".html";
