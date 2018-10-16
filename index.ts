import { Compiler, Stats, compilation } from "webpack";
import { RawSource } from "webpack-sources";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

export type RendererArgs = {
  assets?: {
    [key: string]: string[];
  };
  filename?: string;
  path?: string;
  publicPath?: string;
  stats?: Stats;
};

export type Renderer = (args: RendererArgs) => string | Promise<string>;

export type Options = {
  hotPath?: RegExp;
  paths?: Array<string>;
  renderer?: Renderer;
};

export default class HtmlRendererWebpackPlugin {
  hotPath?: RegExp;
  paths: Array<string>;
  renderer: Renderer;

  constructor(options: Options = {}) {
    this.hotPath = options.hotPath;
    this.paths = options.paths || ["/"];
    this.renderer = options.renderer || defaultRenderer;

    this.plugin = this.plugin.bind(this);
  }

  async plugin(compilation: compilation.Compilation, done: Function) {
    const stats = compilation.getStats().toJson();
    const { publicPath } = compilation.outputOptions || "";
    const assets = groupAssetsByExtensions(compilation.assets);

    for (const path of this.paths) {
      const filename = filenameFromPath(path);

      try {
        const html = await this.renderer({
          assets,
          filename,
          path,
          publicPath,
          stats
        });
        compilation.assets[filename] = new RawSource(html);
      } catch (error) {
        compilation.errors.push(error.stack);
      }
    }

    done();
  }

  apply(compiler: Compiler) {
    if (this.hotPath) {
      compiler.hooks.beforeCompile.tap(
        PLUGIN_NAME,
        invalidateRequireCache(this.hotPath)
      );
    }
    compiler.hooks.afterCompile.tapAsync(PLUGIN_NAME, this.plugin);
  }
}

type ObjectOfRawsource = { [key: string]: RawSource };
type ObjectOfArrays = { [key: string]: Array<string> };

export const groupAssetsByExtensions = (assets: ObjectOfRawsource) =>
  Object.keys(assets).reduce((accumulator: ObjectOfArrays, asset: string) => {
    const ext = asset.slice(((asset.lastIndexOf(".") - 1) >>> 0) + 2);
    if (!accumulator[ext]) {
      accumulator[ext] = [];
    }
    accumulator[ext].push(asset);
    return accumulator;
  }, {});

export const filenameFromPath = (path: string) =>
  path.replace(/\/$/, "/index").replace(/^\//, "") + ".html";

export const getScriptTags = (
  publichPath: string = "/",
  files: Array<string>
) => {
  const prefix = publichPath.endsWith("/") ? publichPath : publichPath + "/";
  return files
    .map(
      (file: string) =>
        `<script defer type="text/javascript" src="${prefix}${file}"></script>`
    )
    .join("\n");
};

export const defaultRenderer: Renderer = async ({
  assets,
  publicPath
}: RendererArgs) =>
  "<!doctype html>" +
  "<head>" +
  '<meta charset="utf-8">' +
  "<title>HtmlRendererWebpackPlugin</title>" +
  '<meta name="viewport" content="width=device-width, initial-scale=1">' +
  "</head>" +
  '<div id="root">' +
  "</div>" +
  getScriptTags(publicPath, assets ? assets.js : []);

const invalidateRequireCache = (hotPathRegex: RegExp) => () => {
  for (const id of Object.keys(require.cache)) {
    if (!id.includes("node_modules") && hotPathRegex.test(id)) {
      delete require.cache[id];
    }
  }
};
