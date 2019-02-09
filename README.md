# HtmlRendererWebpackPlugin

[![version](https://img.shields.io/npm/v/html-renderer-webpack-plugin.svg)](https://www.npmjs.com/package/html-renderer-webpack-plugin)
[![code size](https://img.shields.io/github/languages/code-size/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin)
[![dependencies](https://img.shields.io/david/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json)
[![devDependencies](https://img.shields.io/david/dev/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json)

A webpack plugin for rendering static html pages.

## Installation

```bash
npm install --save-dev html-renderer-webpack-plugin
```

```bash
yarn add --dev html-renderer-webpack-plugin
```

## Usage

```javascript
import HtmlRendererWebpackPlugin from 'html-renderer-webpack-plugin';
import MySSRRenderer from './src/renderer';

...

config.output.publicPath = '/';

...
config.plugins.push(new HtmlRendererWebpackPlugin({
  paths: [
    '/', // --> index.html
    '/about', // --> about.html
    '/portfolio/' // --> portfolio/index.html
  ],
  renderer: MySSRRenderer
}));
```

This plugin provides a server-like environment for rendering static (React) html pages. It is useful for serverless environments as a static site generator.

Pages are rendered from a supplied `paths: string[]` array that should include your supported (static) routes. It might be useful to import these from your router configuration.

The plugin is supplied an async renderer function that, for example, renders your pages using `react-dom`'s `renderToString` and returns a complete HTML string. The default renderer function simply returns a page with javascript bundles and an empty `<div id="root>` tag.

### Renderer

The renderer function should be of type:

```javascript
type RendererArgs = {
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
```

where

#### assets

An object with all of webpack's compiled asset filenames, seperated by their file extensions into arrays.

#### compilationAssets

The raw contents of webpack's compilation.assets.

#### filename

A string of the current path's filename.

#### path

A string of the current path. This is useful for routing.

#### publicPath

The public path prefix as set in webpack's `config.options.publicPath`.

#### stats

The webpack's `stats.toJson()` object. This is useful for [webpack-flush-chunk](https://github.com/faceyspacey/webpack-flush-chunks).

## Babel

Because your renderer function typically imports your `<App />`, you probably need [babel](https://babeljs.io/). The easiest way is to run your webpack config through babel with `webpack --config webpack.config.babel.js`.

## Working with Hot Reloading

### TL;DR

* In your `renderer` function, require your main React component instead of importing:
  - `const App = require('src/components/App').default`
* After watch mode recompilation, `require.cache` will be invalidated and using `require` will result in updated code.

### Longer Explanation

A typical feature of a dev environment includes some [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/). When using `html-renderer-webpack-plugin`, you might want to ensure that when the client bundle gets hot-updated, also the HTML files are rendered with the content.

By default, when using `import` to require you application code, for example `import App from 'src/components/App`, the resulting module will be cached in the node process. Thus, after recompiling your html files after a webpack HMR update, the html file will still contain the old version, because it is cached in the `require.cache`.

To overcome this limitation, this plugin hooks into Webpack's `watchRun` hook, that runs in watch mode when files change. It will then invalidate every require used in changed files from the `require.cache`. Thus, if you use `const App = require('src/components/App').default` inside your renderer function, it will be freshly required the next time the HTML file is created. This will result in "hot-reloading" working properly for statically rendered content.

You can disable this behaviour by supplying the `hot: false` option in the plugin constructor.
