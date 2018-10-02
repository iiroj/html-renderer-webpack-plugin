const { RawSource } = require('webpack-sources');

const PLUGIN_NAME = 'HtmlRendererWebpackPlugin';

class HtmlRendererWebpackPlugin {
  constructor(options = {}) {
    this.hotPath = options.hotPath;
    this.paths = options.paths || [];
    this.renderer = options.renderer || defaultRenderer;

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

    if (this.hotPath) {
      invalidateRequireCache(this.hotPath);
    }

    done();
  }

  apply(compiler) {
    if (compiler.hooks) {
      // Webpack 4
      compiler.hooks.afterCompile.tapAsync(PLUGIN_NAME, this.plugin);
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

const getScriptTags = (publichPath, files) => {
  let prefix = publichPath ? publichPath : '';
  if (publichPath && !publichPath.endsWith('/')) {
    prefix = prefix + '/';
  }
  return files.map(file => `<script defer type="text/javascript" src="${prefix}${file}"></script>`).join('\n');
};

const defaultRenderer = async ({ assets, publicPath }) =>
  '<!doctype html><head><meta charset="utf-8"><title>HtmlRendererWebpackPlugin</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><div id="root"></div>' +
  getScriptTags(publicPath, assets.js || []);

const invalidateRequireCache = hotPathRegex => {
  for (const id of Object.keys(require.cache)) {
    if (!id.includes('node_modules') && hotPathRegex.test(id)) {
      delete require.cache[id];
    }
  }
};

module.exports = HtmlRendererWebpackPlugin;

module.exports.groupAssetsByExtensions = groupAssetsByExtensions;
module.exports.filenameFromPath = filenameFromPath;
module.exports.getScriptTags = getScriptTags;
module.exports.defaultRenderer = defaultRenderer;
