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

    enableSass = true,
    enableTypescript = false,

    productionPublicPath = '/',
    enableProductionAnalysis = false,
    enableProductionSourceMap = false,

    babelConfig = {
      presets: [[
        require.resolve('@uedlinker/babel-preset-uedlinker'),
        { stage: 3, enableFlow: false, enableTypescript: false },
      ]],
    },
  } = options

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

    enableSass,
    enableTypescript,

    productionPublicPath,
    enableProductionAnalysis,
    enableProductionSourceMap,

    babelConfig,
  }
}
