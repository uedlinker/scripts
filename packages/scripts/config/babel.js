const fs = require('fs')
const path = require('path')
const { isPlainObject, isFunction } = require('lodash')

const { stage, enableFlow, enableTypescript } = require('./uedlinker')

const defaults = {
  presets: [[
    require.resolve('@uedlinker/babel-preset-uedlinker'),
    { stage, enableFlow, enableTypescript },
  ]],
}

function loadCustomBabelConfig () {
  const cwd = process.cwd()
  const filename = path.resolve(cwd, './babel.config.js')

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
          'The exported function in `babel.config.js` should return a plain object'
        )
      }

    } else {
      throw new Error(
        'Should export an object or a function in `babel.config.js`'
      )
    }
  }

  return {}
}

module.exports = { ...defaults, ...loadCustomBabelConfig() }
