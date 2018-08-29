const fs = require('fs')
const path = require('path')
const absolutePath = require('./absolutePath')

module.exports = (options = {}) => {

  // Use current working directory as the default root path.
  const defaultRootPath = fs.realpathSync(process.cwd())
  const { rootPath = defaultRootPath } = options

  // `rootPath` must be an absolute path.
  if (typeof rootPath !== 'string' || !path.isAbsolute(rootPath)) {
    throw new Error(
      `Option \`rootPath\` must be an absolute path. You provide ${JSON.stringify(rootPath)}.`
    )
  }

  let {
    srcPath = 'src',
    entryPath = 'src/index',
    outputPath = 'dist',
    staticPath = 'static',
    templatePath = path.resolve(__dirname, '../template.html'),
    polyfillsPath,

    enableTypescript = false,
    enableSass = true,
    enableLess = false,
    enableStylus = false,
    enableImages = true,
    enableFonts = true,
    enableMedia = true,

    enableDevelopmentHMR = true,

    productionPublicPath = '/',
    enableProductionAnalysis = false,
    enableProductionSourceMap = false,
    enableProductionPWA = false,

    enableFetchPolyfill = true,
  } = options

  const defaultBabelConfig = {
    presets: [[
      require.resolve('@uedlinker/babel-preset-uedlinker'),
      { stage: 3, enableFlow: false, enableTypescript: false, enableBabelPolyfill: true },
    ]],
  }

  if (enableDevelopmentHMR) {
    defaultBabelConfig.plugins = [require.resolve('react-hot-loader/babel')]
  }

  const { babelConfig = defaultBabelConfig } = options

  // Resolve all relative paths to absolute paths based on the `rootPath`
  srcPath = absolutePath(rootPath, srcPath)
  entryPath = absolutePath(rootPath, entryPath)
  outputPath = absolutePath(rootPath, outputPath)
  staticPath = absolutePath(rootPath, staticPath)
  templatePath = absolutePath(rootPath, templatePath)
  polyfillsPath = absolutePath(rootPath, polyfillsPath)

  return {
    rootPath,
    srcPath,
    entryPath,
    outputPath,
    staticPath,
    templatePath,
    polyfillsPath,
    enableTypescript,
    enableSass,
    enableLess,
    enableStylus,
    enableImages,
    enableFonts,
    enableMedia,
    enableDevelopmentHMR,
    productionPublicPath,
    enableProductionAnalysis,
    enableProductionSourceMap,
    enableProductionPWA,
    enableFetchPolyfill,
    babelConfig,
  }
}
