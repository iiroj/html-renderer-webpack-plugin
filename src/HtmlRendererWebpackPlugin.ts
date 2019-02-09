import { Compiler, compilation } from "webpack";
import { RawSource } from "webpack-sources";

import filenameFromPath from "./filenameFromPath";
import groupAssetsByExtensions from "./groupAssetsByExtensions";
import defaultRenderer from "./defaultRenderer";
import invalidateRequireCache from "./invalidateRequireCache";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

export declare type RendererArgs = {
  assets?: {
    [key: string]: string[];
  };
  compilationAssets?: {
    [key: string]: import("webpack-sources").CachedSource;
  };
  filename?: string;
  path?: string;
  publicPath?: string;
  stats?: import("webpack").Stats;
};

export declare type Renderer = (args: RendererArgs) => string | Promise<string>;

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
          compilationAssets: compilation.assets,
          filename,
          path,
          publicPath,
          stats
        });
        compilation.assets[filename] = new RawSource(html);
      } catch (error) {
        compilation.errors.push(error);
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
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.plugin);
  }
}
