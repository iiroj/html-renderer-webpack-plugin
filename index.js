"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_sources_1 = require("webpack-sources");
var PLUGIN_NAME = 'HtmlRendererWebpackPlugin';
var HtmlRendererWebpackPlugin = /** @class */ (function () {
    function HtmlRendererWebpackPlugin(options) {
        if (options === void 0) { options = {}; }
        this.hotPath = options.hotPath;
        this.paths = options.paths || ['/'];
        this.renderer = options.renderer || exports.defaultRenderer;
        this.plugin = this.plugin.bind(this);
    }
    HtmlRendererWebpackPlugin.prototype.plugin = function (compilation, done) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, publicPath, assets, _i, _a, path, filename, html, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stats = compilation.getStats().toJson();
                        publicPath = (compilation.outputOptions || '').publicPath;
                        assets = exports.groupAssetsByExtensions(compilation.assets);
                        _i = 0, _a = this.paths;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        path = _a[_i];
                        filename = exports.filenameFromPath(path);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.renderer({ assets: assets, filename: filename, path: path, publicPath: publicPath, stats: stats })];
                    case 3:
                        html = _b.sent();
                        compilation.assets[filename] = new webpack_sources_1.RawSource(html);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        compilation.errors.push(error_1.stack);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        done();
                        return [2 /*return*/];
                }
            });
        });
    };
    HtmlRendererWebpackPlugin.prototype.apply = function (compiler) {
        if (this.hotPath) {
            compiler.hooks.beforeCompile.tap(PLUGIN_NAME, invalidateRequireCache(this.hotPath));
        }
        compiler.hooks.afterCompile.tapAsync(PLUGIN_NAME, this.plugin);
    };
    return HtmlRendererWebpackPlugin;
}());
exports.default = HtmlRendererWebpackPlugin;
exports.groupAssetsByExtensions = function (assets) {
    return Object.keys(assets).reduce(function (accumulator, asset) {
        var ext = asset.slice(((asset.lastIndexOf('.') - 1) >>> 0) + 2);
        if (!accumulator[ext]) {
            accumulator[ext] = [];
        }
        accumulator[ext].push(asset);
        return accumulator;
    }, {});
};
exports.filenameFromPath = function (path) { return path.replace(/\/$/, '/index').replace(/^\//, '') + '.html'; };
exports.getScriptTags = function (publichPath, files) {
    if (publichPath === void 0) { publichPath = '/'; }
    var prefix = publichPath.endsWith('/') ? publichPath : publichPath + '/';
    return files.map(function (file) { return "<script defer type=\"text/javascript\" src=\"" + prefix + file + "\"></script>"; }).join('\n');
};
exports.defaultRenderer = function (_a) {
    var assets = _a.assets, publicPath = _a.publicPath;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, '<!doctype html><head><meta charset="utf-8"><title>HtmlRendererWebpackPlugin</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><div id="root"></div>' +
                    exports.getScriptTags(publicPath, assets ? assets.js : [])];
        });
    });
};
var invalidateRequireCache = function (hotPathRegex) { return function () {
    for (var _i = 0, _a = Object.keys(require.cache); _i < _a.length; _i++) {
        var id = _a[_i];
        if (!id.includes('node_modules') && hotPathRegex.test(id)) {
            delete require.cache[id];
        }
    }
}; };
