export default (publichPath: string = "/", files: Array<string>) => {
  const prefix = publichPath.endsWith("/") ? publichPath : publichPath + "/";

  return files
    .map(
      (file: string) =>
        `<script defer type="text/javascript" src="${prefix}${file}"></script>`
    )
    .join("\n");
};
