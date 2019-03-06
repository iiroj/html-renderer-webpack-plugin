import { Compiler, compilation } from "webpack";
import { CachedSource, RawSource } from "webpack-sources";

import defaultRenderer from "./defaultRenderer";
import filenameFromPath from "./filenameFromPath";
import groupAssetsByExtensions from "./groupAssetsByExtensions";
import purgeRequireCache from "./purgeRequireCache";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

export class HtmlRendererWebpackPluginError extends Error {
  constructor(message: string) {
    super(`HtmlRendererWebpackPlugin Error:\n\n${message}`);
  }
}

export declare type RendererArgs = Partial<{
  assets: {
    [key: string]: string[] | undefined;
  };
  compilationAssets: {
    [key: string]: CachedSource;
  };
  filename: string;
  path: string;
  publicPath: string;
  stats: any;
}>;

export declare type Renderer = (args: RendererArgs) => string | Promise<string>;

export declare type Options = Partial<{
  hot: boolean;
  paths: Array<string>;
  renderer: Renderer;
}>;

export default class HtmlRendererWebpackPlugin {
  private readonly hot: boolean;
  private readonly paths: Array<string>;
  private readonly renderer: Renderer;

  public constructor(options: Options = {}) {
    this.hot = typeof options.hot !== "undefined" ? options.hot : true;
    this.paths = options.paths || ["/"];
    this.renderer = options.renderer || defaultRenderer;
  }

  private plugin = async (
    compilation: compilation.Compilation,
    done: Function
  ) => {
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
        compilation.errors.push(
          new HtmlRendererWebpackPluginError(
            error.stack || error.message || error
          )
        );
      }
    }

    done();
  };

  public apply(compiler: Compiler) {
    if (this.hot) {
      compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, purgeRequireCache);
    }

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.plugin);
  }
}
