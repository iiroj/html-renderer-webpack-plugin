<div align="center">
  <h1 align="center">HtmlRendererWebpackPlugin</h1>
  <code>html-renderer-webpack-plugin</code>
  <br/>
  <p>A webpack plugin for rendering static html pages</p>
  <a href="https://www.npmjs.com/package/html-renderer-webpack-plugin"><strong>npm</strong></a> ·
  <a href="https://github.com/iiroj/html-renderer-webpack-plugin"><strong>GitHub</strong></a> ·
  <a href="https://www.gitlab.com/iiroj/html-renderer-webpack-plugin"><strong>GitLab</strong></a>
  <br/>
  <br/>
  <a href="https://www.npmjs.com/package/html-renderer-webpack-plugin">
    <img src="https://img.shields.io/npm/v/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://travis-ci.com/iiroj/html-renderer-webpack-plugin">
    <img src="https://travis-ci.com/iiroj/html-renderer-webpack-plugin.svg?branch=master" />
  </a>
  <a href="https://github.com/iiroj/html-renderer-webpack-plugin">
    <img src="https://img.shields.io/github/languages/code-size/iiroj/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json">
    <img src="https://img.shields.io/david/iiroj/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json">
    <img src="https://img.shields.io/david/dev/iiroj/html-renderer-webpack-plugin.svg">
  </a>
  <br/>
  <br/>
</div>

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
type Renderer = {
  assets?: {
    [key: string]: string[]
  }
  filename: string;
  path: string;
  publicPath: string;
  stats: Options.Stats;
};

type renderer: (props: Renderer) => Promise<string>;
```

where

#### assets

An object with all webpack's compiled assets, seperated by their file extensions into arrays.

#### filename

A string of the current path's filename.

#### path

A string of the current path. This is useful for routing.

#### publicPath

The public path prefix as set in webpack's `config.options.publicPath`.

#### stats

The webpack's `stats` object. This is useful for [webpack-flush-chunk](https://github.com/faceyspacey/webpack-flush-chunks).

## Babel

Because your renderer function typically imports your `<App />`, you probably need [babel](https://babeljs.io/). The easiest way is to run your webpack config through babel with `webpack --config webpack.config.babel.js`.

## Working with Hot Reloading

### TL;DR

* In your `renderer` function, require your main React component instead of importing:
  - `const App = require('src/components/App').default`
* Add a `hotPath?: RegExp` option to `html-renderer-webpack-plugin` to watch for file changes in your preferred location:
  - `hotPath: /\/src\//`
* After compilation, `require.cache` will be invalidated and using `require` will result in updated code.

### Longer Explanation

A typical feature of a dev environment includes some [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/). When using `html-renderer-webpack-plugin`, you might want to ensure that when the client bundle gets hot-updated, also the HTML files are rendered with the content.

By default, when using `import` to require you application code, for example `import App from 'src/components/App`, the resulting module will be cached in the node process. Thus, after recompiling your html files after a webpack HMR update, the html file will still contain the old version, because it is cached in the `require.cache`.

To overcome this limitation, you can supply a `hotPath?: RegExp` option to this plugin. After a webpack compilation, it will use this RegExp to invalidate any matching paths in the `require.cache` (`node_modules` will always be ignored). Then, if you use `const App = require('src/components/App').default` inside your renderer function, it will be freshly required the next time the HTML file is created. This will result in "hot-reloading" working properly for statically rendered content.
