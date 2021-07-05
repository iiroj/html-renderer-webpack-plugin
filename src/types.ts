export type RendererArgs = Partial<{
  assets: Record<string, string[] | undefined>;
  compilationAssets: import("webpack").Compilation["assets"];
  filename: string;
  options: Record<string, any>;
  path: string;
  publicPath: string;
  stats: any;
}>;

export type Renderer = (args: RendererArgs) => string | Promise<string>;

export type Options = Partial<{
  options: any;
  paths: string[] | (() => Promise<string[]>);
  renderer: Renderer | string;
}>;
