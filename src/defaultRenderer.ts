import getScriptTags from "./getScriptTags";

export default async ({
  assets,
  publicPath
}: import("./HtmlRendererWebpackPlugin").RendererArgs) =>
  "<!doctype html>" +
  "<head>" +
  '<meta charset="utf-8">' +
  "<title>HtmlRendererWebpackPlugin</title>" +
  '<meta name="viewport" content="width=device-width, initial-scale=1">' +
  "</head>" +
  '<div id="root">' +
  "</div>" +
  getScriptTags(publicPath, assets ? assets.js : []);
