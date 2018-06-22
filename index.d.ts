import { Options } from 'webpack';

export type Renderer = {
  assets?: {
    [key: string]: string[]
  }
  filename: string;
  path: string;
  publicPath: string;
  stats: Options.Stats;
}

export type Options = {
  paths: string[];
  renderer: (props: Renderer) => Promise<string>;
}

export default class WebpackStaticHtmlRenderer<Options> {}