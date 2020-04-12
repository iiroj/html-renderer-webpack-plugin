export type RendererArgs = Partial<{
  assets: {
    [key: string]: string[] | undefined;
  };
  compilationAssets: {
    [key: string]: import("webpack-sources").CachedSource;
  };
  filename: string;
  options: Record<string, any>;
  path: string;
  publicPath: string;
  stats: any;
}>;

export type Renderer = (args: RendererArgs) => string | Promise<string>;

export type Options = Partial<{
  hot: boolean;
  options: Record<string, any>;
  paths: string[];
  renderer: Renderer | string;
}>;
