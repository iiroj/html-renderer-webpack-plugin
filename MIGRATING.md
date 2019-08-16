# Migrating from v4 to v5

Starting from version `5.0.0`, the renderer function should be supplied to `HTMLRendererWebpackPlugin` as a path, instead of imported function. The old way still works, but lacks hot-reloading support. Supplying a path allows the plugin to always emit up-to-date HTML files, and triggers a webpack build when the renderer file itself changes (in Webpack's watch mode).

The migration is straightforward:

```tsx
// v4
import HtmlRendererWebpackPlugin from 'html-renderer-webpack-plugin'
import MySSRRenderer from './src/renderer' // .tsx omitted

new HtmlRendererWebpackPlugin({
      paths: staticRoutes,
      renderer: MySSRRenderer
})
```

```tsx
// v5
import HtmlRendererWebpackPlugin from 'html-renderer-webpack-plugin'

new HtmlRendererWebpackPlugin({
      paths: staticRoutes,
      renderer: './src/renderer.tsx' // file extension included for watcher
})
```
