const fs = require('fs')
const path = require('path')
const absolutePath = require('./absolutePath')

module.exports = (options = {}) => {

  // Use current working directory as the default app path.
  const defaultAppPath = fs.realpathSync(process.cwd())
  const { appPath = defaultAppPath } = options

  // `appPath` must be an absolute path.
  if (!path.isAbsolute(appPath)) {
    throw new Error('The `appPath` must be an absolute path.')
  }

  let {
    // Directory of source files, default is `src` directory under the appPath.
    srcPath = './src',
    // Entry file, default is the index file under the srcPath.
    entryPath = './src/index',
    // Output path, default is `dist` directory under the appPath.
    outputPath = './dist',
    // Static directory, default is `static` directory under the appPath.
    // All files in this directory will be copied to the outputPath.
    staticPath = './static',
    // HTML template path
    templatePath = path.resolve(__dirname, '../template.html'),
    // User's polyfills path.
    polyfillsPath,
    // `publicPath` in production environment.
    // Default value is '/' in both production and development envs.
    // Can't change development's `publicPath` through options.
    productionPublicPath = '/',
    // Whether enable production source map, default false.
    enableProductionSourceMap = false,
    // Whether enable production analysis, default false,
    enableProductionAnalysis = false,
    // Whether support TypeScript syntax, default false.
    enableTypescript = false,
    // Whether support Sass files, default true.
    enableSass = true,
  } = options

  // Resolve all relative paths to absolute paths based on the `appPath`
  srcPath = absolutePath(appPath, srcPath)
  entryPath = absolutePath(appPath, entryPath)
  outputPath = absolutePath(appPath, outputPath)
  staticPath = absolutePath(appPath, staticPath)
  templatePath = absolutePath(appPath, templatePath)
  polyfillsPath = absolutePath(appPath, polyfillsPath)

  return {
    appPath,
    srcPath,
    entryPath,
    outputPath,
    staticPath,
    templatePath,
    polyfillsPath,
    productionPublicPath,
    enableProductionSourceMap,
    enableProductionAnalysis,
    enableTypescript,
    enableSass,
  }
}
