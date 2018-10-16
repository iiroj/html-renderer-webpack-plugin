import { Compiler, Stats, compilation } from 'webpack';
export declare type RendererArgs = {
    assets?: {
        [key: string]: string[];
    };
    filename: string;
    path: string;
    publicPath: string;
    stats: Stats;
};
export declare type Renderer = (args: RendererArgs) => string | Promise<string>;
export declare type Options = {
    hotPath?: RegExp;
    paths?: Array<string>;
    renderer?: Renderer;
};
export default class HtmlRendererWebpackPlugin {
    hotPath?: RegExp;
    paths: Array<string>;
    renderer: Renderer;
    constructor(options?: Options);
    plugin(compilation: compilation.Compilation, done: Function): Promise<void>;
    apply(compiler: Compiler): void;
}
declare type ObjectOfArrays = {
    [key: string]: Array<string>;
};
export declare const groupAssetsByExtensions: (assets: Object) => {};
export declare const filenameFromPath: (path: string) => string;
export declare const getScriptTags: (publichPath: string | undefined, files: string[]) => string;
export declare const defaultRenderer: Renderer;
export {};
