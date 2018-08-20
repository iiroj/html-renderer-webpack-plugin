<div align="center">
  <h1 align="center">HtmlRendererWebpackPlugin</h1>
  <code>html-renderer-webpack-plugin</code>
  <br/>
  <p>A webpack plugin for rendering static html pages</p>
  <a href="https://www.npmjs.com/package/html-renderer-webpack-plugin"><strong>npm</strong></a> ·
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin"><strong>GitLab</strong></a>
  <br/>
  <br/>
  <a href="https://www.npmjs.com/package/html-renderer-webpack-plugin">
    <img src="https://img.shields.io/npm/v/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin">
    <img src="https://img.shields.io/github/languages/code-size/iiroj/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin/commits/master">
    <img alt="pipeline status" src="https://gitlab.com/iiroj/html-renderer-webpack-plugin/badges/master/pipeline.svg" />
  </a>
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin/commits/master">
    <img alt="coverage report" src="https://gitlab.com/iiroj/html-renderer-webpack-plugin/badges/master/coverage.svg" />
  </a>
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json">
    <img src="https://img.shields.io/david/iiroj/html-renderer-webpack-plugin.svg">
  </a>
  <a href="https://gitlab.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json">
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
