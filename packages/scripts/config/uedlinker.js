const fs = require('fs')
const path = require('path')
const { isPlainObject, isFunction } = require('lodash')

const appPath = fs.realpathSync(process.cwd())

const defaults = {
  stage: 3,
  enableFlow: false,
  enableSass: true,
  enableTypescript: false,

  appPath,
  srcPath: path.resolve(appPath, './src'),
  entryPath: path.resolve(appPath, './src/index'),
  outputPath: path.resolve(appPath, './dist'),
  staticPath: path.resolve(appPath, './static'),
  templatePath: void 0,
  polyfillsPath: void 0,

  productionPublicPath: '/',
  enableProductionAnalysis: false,
  enableProductionSourceMap: false,
}

function loadCustomUedlinkerConfig () {
  const cwd = process.cwd()
  const filename = path.resolve(cwd, './uedlinker.config.js')

  if (fs.existsSync(filename)) {
    const customConfig = require(filename)

    if (isPlainObject(customConfig)) {
      return customConfig

    } else if (isFunction(customConfig)) {
      const computedConfig = customConfig(defaults)

      if (isPlainObject(computedConfig)) {
        return computedConfig

      } else {
        throw new Error(
          'The exported function in `uedlinker.config.js` should return a plain object'
        )
      }

    } else {
      throw new Error(
        'Should export an object or a function in `uedlinker.config.js`'
      )
    }
  }

  return {}
}

module.exports = { ...defaults, ...loadCustomUedlinkerConfig() }
