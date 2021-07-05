import { resolve } from "path";
import { Compilation, sources, Compiler } from "webpack";

import defaultRenderer from "./defaultRenderer";
import filenameFromPath from "./filenameFromPath";
import groupAssetsByExtensions from "./groupAssetsByExtensions";
import HtmlRendererWebpackPluginError from "./HtmlRendererWebpackPluginError";
import { Renderer, Options } from "./types";

const PLUGIN_NAME = "HtmlRendererWebpackPlugin";

class HtmlRendererWebpackPlugin {
  private readonly options?: Record<string, any>;
  private readonly paths: string[] | (() => Promise<string[]>);
  private readonly renderer: string | Renderer;
  private src?: string;

  public constructor({
    options,
    paths = ["/"],
    renderer = defaultRenderer,
  }: Options = {}) {
    this.options = options;
    this.paths = paths;
    this.renderer = renderer;

    if (typeof renderer === "string") {
      const resolved = resolve(process.cwd(), renderer);
      this.src = resolved;
    }
  }

  private requireRenderer = () => {
    if (!this.src) return;

    /** Delete the file from `require.cache` first to make sure it's fresh */
    delete require.cache[this.src];

    const required = require(this.src);

    /** CJS module.exports */
    if (typeof required === "function") {
      return required;
    }

    /** Transpiled ESM default export */
    if (typeof required === "object" && "default" in required) {
      return required.default;
    }
  };

  private watchRun = (compiler: Compiler): void => {
    if (!this.src) return;

    /**
     * Delete require.cache for each modified file to make sure
     * they are fresh when imported to the renderer function
     */
    compiler.modifiedFiles?.forEach((file) => {
      delete require.cache[file];
    });

    /**
     * Add the renderer file to webpack's file dependencies
     * so that watch mode triggers compilation on changes
     */
    compiler.hooks.afterCompile.tap({ name: PLUGIN_NAME }, (compilation) => {
      compilation.fileDependencies.add(this.src!);
    });
  };

  private processAssets = async (compilation: Compilation): Promise<void> => {
    const stats = compilation.getStats().toJson();

    /** @todo webpack 5 supports a function as the `publicPath` option */
    const publicPath =
      typeof compilation.outputOptions.publicPath === "string"
        ? compilation.outputOptions.publicPath
        : "";

    const assets = groupAssetsByExtensions(compilation.assets);

    /** `this.renderer` might be an async function, or a file path */
    const renderer =
      typeof this.renderer === "function"
        ? this.renderer
        : this.requireRenderer();

    /** `this.paths` might be an async function returning path strings */
    const paths =
      typeof this.paths === "function" ? await this.paths() : this.paths;

    /** Run renderer for each path */
    for (const path of paths) {
      const filename = filenameFromPath(path);

      try {
        const html = await renderer({
          assets,
          compilationAssets: compilation.assets,
          filename,
          options: this.options,
          path,
          publicPath,
          stats,
        });

        compilation.emitAsset(filename, new sources.RawSource(html, false));
      } catch (error) {
        compilation.errors.push(
          new HtmlRendererWebpackPluginError(
            error.stack || error.message || error
          )
        );
      }
    }
  };

  public apply(compiler: Compiler): void {
    /**
     * Watch mode should purge `require.cache` for changed files
     * and also trigger compilation when the renderer itself changes
     */
    compiler.hooks.watchRun.tap({ name: PLUGIN_NAME }, this.watchRun);

    /**
     * After the webpack compiler has processed the assets of a compilation,
     * this plugin runs and emits the html files.
     */
    compiler.hooks.thisCompilation.tap({ name: PLUGIN_NAME }, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        () => this.processAssets(compilation)
      );
    });
  }
}

export default HtmlRendererWebpackPlugin;
