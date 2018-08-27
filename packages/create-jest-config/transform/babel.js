const babelJest = require('babel-jest')
const babelConfig = require('@uedlinker/load-config/config/babel')

module.exports = babelJest.createTransformer({
  babelrc: false,
  ...babelConfig,
})
