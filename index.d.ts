import { Plugin, Stats } from "webpack";

export = HtmlRendererWebpackPlugin;

declare class HtmlRendererWebpackPlugin extends Plugin {
  constructor(options?: HtmlRendererWebpackPlugin.Options);
}

declare namespace HtmlRendererWebpackPlugin {
  interface Renderer {
    assets?: {
      [key: string]: string[];
    };
    filename: string;
    path: string;
    publicPath: string;
    stats: Stats;
  }

  interface Options {
    hotPath?: RegExp;
    paths: string[];
    renderer?: (props: Renderer) => string | Promise<string>;
  }
}
