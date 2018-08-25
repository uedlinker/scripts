const fs = require('fs')
const path = require('path')
const { isPlainObject, isFunction } = require('lodash')
const createJestConfig = require('@uedlinker/create-jest-config')

const options = require('./uedlinker')

const defaults = createJestConfig(options)

function loadCustomJestConfig () {
  const cwd = process.cwd()
  const filename = path.resolve(cwd, './jest.config.js')

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
          'The exported function in `jest.config.js` should return a plain object'
        )
      }

    } else {
      throw new Error(
        'Should export an object or a function in `jest.config.js`'
      )
    }
  }

  return {}
}

module.exports = { ...defaults, ...loadCustomJestConfig() }
