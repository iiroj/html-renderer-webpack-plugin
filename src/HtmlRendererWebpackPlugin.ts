import { FSWatcher } from "chokidar";
import path from "path";
import { Compiler, compilation } from "webpack";
import { CachedSource, RawSource } from "webpack-sources";

import defaultRenderer from "./defaultRenderer";
import filenameFromPath from "./filenameFromPath";
import groupAssetsByExtensions from "./groupAssetsByExtensions";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

const chokidarOptions = {
  ignoreInitial: true,
  disableGlobbing: true,
  persistent: true
};

export class HtmlRendererWebpackPluginError extends Error {
  public constructor(message: string) {
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
  options: Record<string, any>;
  path: string;
  publicPath: string;
  stats: any;
}>;

export declare type Renderer = (args: RendererArgs) => string | Promise<string>;

export declare type Options = Partial<{
  hot: boolean;
  options: Record<string, any>;
  paths: string[];
  renderer: Renderer | string;
}>;

export default class HtmlRendererWebpackPlugin {
  private readonly options?: Record<string, any>;
  private readonly paths: string[];
  private readonly renderer: Renderer;
  private src?: string;

  public constructor({
    options,
    paths = ["/"],
    renderer = defaultRenderer
  }: Options = {}) {
    this.options = options;
    this.paths = paths;
    this.renderer =
      typeof renderer === "function"
        ? renderer
        : this.createRequireAsyncRenderer(renderer);
  }

  private createRequireAsyncRenderer = (src: string) => {
    const resolved = path.resolve(process.cwd(), src);
    this.src = resolved;
    return async (args: RendererArgs) => {
      const { default: renderer } = await import(resolved);
      return renderer(args);
    };
  };

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
          options: this.options,
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
    if (this.src) {
      compiler.hooks.afterCompile.tap(PLUGIN_NAME, compilation => {
        compilation.fileDependencies.add(this.src!);
      });

      let watcher: FSWatcher;

      compiler.hooks.watchRun.tap(PLUGIN_NAME, async () => {
        const chokidar = await import("chokidar");
        watcher = chokidar.watch(this.src!, chokidarOptions);
        watcher.on("change", () => {}); // trigger compilation
      });

      compiler.hooks.watchClose.tap(PLUGIN_NAME, () => {
        if (watcher) watcher.close();
      });
    }

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.plugin);
  }
}
