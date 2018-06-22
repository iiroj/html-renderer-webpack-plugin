const { RawSource } = require('webpack-sources');

const PLUGIN_NAME = 'HtmlRendererWebpackPlugin';

class HtmlRendererWebpackPlugin {
  constructor(options = {}) {
    this.renderer = options.renderer || defaultRenderer;
    this.paths = options.paths || [];

    this.plugin = this.plugin.bind(this);
  }

  async plugin(compilation, done) {
    const stats = compilation.getStats().toJson();
    const { publicPath } = compilation.options.output || '';
    const assets = groupAssetsByExtensions(compilation.assets);

    for (const path of this.paths) {
      const filename = filenameFromPath(path);

      try {
        const html = await this.renderer({ assets, filename, path, publicPath, stats });
        compilation.assets[filename] = new RawSource(html);
      } catch (error) {
        compilation.errors.push(error.stack);
      }
    }

    done();
  }

  apply(compiler) {
    if (compiler.hooks) {
      // Webpack 4
      compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.plugin);
    } else {
      // Webpack 3
      compiler.plugin('emit', this.plugin);
    }
  }
}

const groupAssetsByExtensions = assets =>
  Object.keys(assets).reduce((accumulator, asset) => {
    const ext = asset.slice(((asset.lastIndexOf('.') - 1) >>> 0) + 2);
    if (!accumulator[ext]) {
      accumulator[ext] = [];
    }
    accumulator[ext].push(asset);
    return accumulator;
  }, {});

const filenameFromPath = path => path.replace(/\/$/, '/index').replace(/^\//, '') + '.html';

const getScriptTags = (publichPath, files) =>
  files.map(file => `<script defer type="text/javascript" src="${publichPath}${file}"></script>`).join('\n');

const defaultRenderer = async ({ assets, publicPath }) =>
  '<!doctype html><head><meta charset="utf-8"><title>HtmlRendererWebpackPlugin</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><div id="root"></div>' +
  getScriptTags(publicPath, assets.js || []);

module.exports = HtmlRendererWebpackPlugin;
