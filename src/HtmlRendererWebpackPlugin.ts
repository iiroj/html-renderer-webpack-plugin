import { Compiler, compilation } from "webpack";
import { RawSource } from "webpack-sources";

import defaultRenderer from "./defaultRenderer";
import filenameFromPath from "./filenameFromPath";
import groupAssetsByExtensions from "./groupAssetsByExtensions";
import purgeRequireCache from "./purgeRequireCache";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

export declare type RendererArgs = {
  assets: {
    [key: string]: string[];
  };
  compilationAssets: {
    [key: string]: import("webpack-sources").CachedSource;
  };
  filename: string;
  path: string;
  publicPath: string;
  stats: ReturnType<import("webpack").Stats["toJson"]>;
};

export declare type Renderer = (
  args: Partial<RendererArgs>
) => string | Promise<string>;

export declare type Options = {
  hot?: boolean;
  paths?: Array<string>;
  renderer?: Renderer;
};

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
        compilation.errors.push(error);
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
