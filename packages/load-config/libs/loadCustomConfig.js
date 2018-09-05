const fs = require('fs')
const path = require('path')
const isFunction = require('lodash.isfunction')
const isPlainObject = require('lodash.isplainobject')

const cwd = fs.realpathSync(process.cwd())

module.exports = (filename, ...params) => {
  if (
    !filename ||
    typeof filename !== 'string' ||
    filename.indexOf('.') === -1 ||
    path.extname(filename).toLowerCase() !== '.js'
  ) {
    throw new Error(
      'The first param `filename` must be a string with `.js` suffix when use `loadConfig` function.'
    )
  }

  filename = path.resolve(cwd, filename)

  if (fs.existsSync(filename)) {
    const customConfig = require(filename)

    if (isPlainObject(customConfig)) {
      return customConfig

    } else if (isFunction(customConfig)) {
      const computedConfig = customConfig(...params)

      if (isPlainObject(computedConfig)) {
        return computedConfig

      } else {
        throw new Error(
          `The exported function in \`${filename}\` should return a plain object.`
        )
      }

    } else {
      throw new Error(
        `Should export an object or a function in \`${filename}\``
      )
    }
  }

  return {}
}
