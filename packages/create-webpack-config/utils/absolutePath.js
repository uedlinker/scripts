const path = require('path')

module.exports = (basePath, relativePath) => {
  if (typeof basePath !== 'string') {
    throw new TypeError(
      `The first param must be a string when use \`absolutePath\` function. ` +
      `You provide a(n) ${typeof basePath} value: ${JSON.stringify(basePath)}.`
    )
  }

  if (!path.isAbsolute(basePath)) {
    throw new TypeError(
      `The first param must be an absolute path when use \`absolutePath\` function. ` +
      `You provide: ${JSON.stringify(basePath)}.`
    )
  }

  // If `relativePath` is not a string, return directly.
  // Will check by Webpack.
  if (typeof relativePath !== 'string') return relativePath

  // If `relativePath` is an absolute path, return directly.
  if (path.isAbsolute(relativePath)) return relativePath

  // Otherwise, return resolved absolute path based on `basePath`
  return path.resolve(basePath, relativePath)
}
