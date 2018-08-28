const fs = require('fs')
const loadCustomConfig = require('../utils/loadCustomConfig')

const filename = 'uedlinker.config.js'

const defaults = {
  // ES syntax stage. Valid values: [null, 'none', 0, 1, 3, 3, 4].
  // If value is null or 'none', will disable syntax in stages.
  stage: 3,

  enableFlow: false,
  enableTypescript: false,
  enableSass: true,
  enableLess: false,
  enableStylus: false,
  enableImages: true,
  enableFonts: true,
  enableMedia: true,

  // `rootPath` must be an absolute path.
  rootPath: fs.realpathSync(process.cwd()),

  // The following paths could be relative or absolute.
  // If they are relative, they will be based on `rootPath`.

  // Source code path.
  // Your codes those will be compiled by Babel, should be placed in this directory.
  srcPath: 'src',
  // Entry path. It will be used by Webpack as entry.
  entryPath: 'src/index',
  // All compiled files will be placed in this directory.
  outputPath: 'dist',
  // All static files should be placed in this directory.
  // And files in `staticPath` will be copied to `outputPath`.
  staticPath: 'static',
  // HTML template file path.
  // Default is require('@uedlinker/create-webpack-config/template.html').
  // You can set a new path to replace the default.
  templatePath: void 0,
  // Custom polyfills path.
  // We inject `@babel/polyfill` according to your browserslist config and
  // `whatwg-fetch` (fetch polyfill) in development and production environment.
  // We inject `whatwg-fetch`(fetch polyfill) and `raf`(requestAnimationFrame polyfill) in test environment.
  // If you specified your own polyfills path, it does not cover the defaults,
  // so there is unnecessary to require the default polyfills agian.
  polyfillsPath: void 0,

  // Babel polyfills would not require all, it is on demand.
  enableBabelPolyfill: true,
  // Whether require `whatwg-fetch` as polyfill by default.
  enableFetchPolyfill: true,

  // Configs in development environment.
  enableDevelopmentHMR: true,

  // Configs in production environment.
  productionPublicPath: '/',
  enableProductionAnalysis: false,
  enableProductionSourceMap: false,

  // Configs in test environment.
  enableTestRaf: true,
  enableTestEnzyme: true,
}

const customConfig = loadCustomConfig(filename, defaults)

module.exports = Object.freeze({ ...defaults, ...customConfig })
