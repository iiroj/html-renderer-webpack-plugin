const filenameFromPath = (path: string): string =>
  path.replace(/\/$/, "/index").replace(/^\//, "") + ".html";

export default filenameFromPath;
