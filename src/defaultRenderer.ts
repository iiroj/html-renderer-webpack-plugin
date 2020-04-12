import getScriptTags from "./getScriptTags";
import { Renderer } from "./types";

const defaultRenderer: Renderer = async ({
  assets,
  publicPath,
}) => `<!doctype html>
<head>
  <meta charset="utf-8">
  <title>HtmlRendererWebpackPlugin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<div id="root"></div>
${getScriptTags(publicPath, (assets && "js" in assets && assets.js) || [])}`;

export default defaultRenderer;
