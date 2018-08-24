const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')
const { isPlainObject, isFunction } = require('lodash')
const createWebpackConfig = require('@uedlinker/create-webpack-config')

const babelConfig = require('./babel')
const uedlinkerConfig = require('./uedlinker')

uedlinkerConfig.babelConfig = babelConfig

const chain = createWebpackConfig(uedlinkerConfig)
const config = chain.toConfig()

const cwd = process.cwd()
const filename = path.resolve(cwd, './webpack.config.js')

if (fs.existsSync(filename)) {
  const customConfig = require(filename)

  if (isPlainObject(customConfig)) {
    module.exports = merge(config, customConfig)

  } else if (isFunction(customConfig)) {
    const computedConfig = customConfig(config, chain)

    if (isPlainObject(computedConfig)) {
      module.exports = merge(config, customConfig)

    } else if (
      computedConfig &&
      computedConfig.toConfig &&
      isFunction(computedConfig.toConfig)
    ) {
      module.exports = computedConfig.toConfig()

    } else {
      throw new Error(
        'The exported function in `webpack.config.js` should ' +
        'return a plain object or an object with a `.toConfig()` method'
      )
    }

  } else {
    throw new Error(
      'Should export an object or a function in `webpack.config.js`'
    )
  }

} else {
  module.exports = config
}
