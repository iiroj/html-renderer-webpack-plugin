# HtmlRendererWebpackPlugin

[![GitHub Actions](https://github.com/iiroj/html-renderer-webpack-plugin/workflows/Tags/badge.svg)](https://github.com/iiroj/html-renderer-webpack-plugin/actions)
[![version](https://img.shields.io/npm/v/html-renderer-webpack-plugin.svg)](https://www.npmjs.com/package/html-renderer-webpack-plugin)
[![code size](https://img.shields.io/github/languages/code-size/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin)
[![dependencies](https://img.shields.io/david/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json)
[![devDependencies](https://img.shields.io/david/dev/iiroj/html-renderer-webpack-plugin.svg)](https://github.com/iiroj/html-renderer-webpack-plugin/blob/master/package.json)

A webpack plugin for emitting html files from a list of paths.

## 👉 [See Real Example Here](https://github.com/iiroj/iiro.fi/blob/398c26e754e56d9541eb8b8f65219f05dc517ccf/server/renderer.tsx) 👈

----

## Installation

```bash
npm install --save-dev html-renderer-webpack-plugin
```

```bash
yarn add --dev html-renderer-webpack-plugin
```


## Usage

This plugin provides a server-like environment for rendering static (React) html pages. It is useful for serverless environments as a static site generator.

Pages are rendered from the supplied `paths: string[] | () => Promise<string[]>` argument, that should include your supported (static) routes. It might be useful to import these from your router configuration. The `paths` options can either be a list of strings, or an async function. The latter is useful for dynamically generating paths during built-time, for example from a directory structure.

The plugin is supplied an async renderer function that, for example, renders your pages using `react-dom`'s `renderToString` and returns a complete HTML string. The default renderer function simply returns a page with Webpack's generated bundles and an empty `<div id="root>` tag.


### Webpack plugin

```javascript
import HtmlRendererWebpackPlugin from 'html-renderer-webpack-plugin';

...

config.output.publicPath = '/';

...
config.plugins.push(new HtmlRendererWebpackPlugin({
  options: {
    isProduction: process.env.NODE_ENV === 'production'
  },
  paths: [
    '/', // --> index.html
    '/about', // --> about.html
    '/portfolio/' // --> portfolio/index.html
  ],
  renderer: './src/renderer.tsx'
}));
```

| Option | type | description |
| :----- | :--- | :---------- |
| `options` | `any` | Pass any values from the webpack config to the  `renderer` function |
| `paths` | `string[] \| () => Promise<string[]>`| The paths to be renderer, like `"/"` and `"/about"` |
| `renderer` | `string \| Renderer` | A file path to the renderer function, or an inline function. See below for more options. |


### Renderer

```javascript
export default async ({ path }) => `<html>
  <head>
    <title>Page for ${path}</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>`

```

| Option | type | description |
| :----- | :--- | :---------- |
| `assets` | `Record<string, string[] | undefined>` | List of emitted asset filenames grouped by extensions |
| `compilationAssets` | `import("webpack").Compilation["assets"]` | the current compilation's assets |
| `filename` | `string` | The filename for the current html file, like `"index.html"` or `"about.html"`
| `options` | `any` | Any value passed from the webpack config |
| `path` | `string`| The current path, like `"/"` or `"/about"` |
| `publicPath` | `string` | The webpack public path prefix, like `""` or `"/public"` |
| `stats` | `any` | The current compilation's JSON stats |


## Babel

Because your renderer function typically imports your `<App />`, you probably need [babel](https://babeljs.io/). The easiest way is to run your webpack config through babel with `webpack --config webpack.config.babel.js`.


## Hot-reloading

The `renderer` option can point to a file (`string`) that will be required before each compilation. This plugin will automatically delete all changed files from the `require.cache`, meaning the emitted html files should always be up-to-date even during `watch` mode.
