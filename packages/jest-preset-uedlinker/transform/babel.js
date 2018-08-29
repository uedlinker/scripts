const babelJest = require('babel-jest')
const { uedlinkerConfig, loadCustomConfig } = require('@uedlinker/load-config')

const defaults = {
  presets: [[
    require.resolve('@uedlinker/babel-preset-uedlinker'),
    uedlinkerConfig,
  ]],
}

const customConfig = loadCustomConfig('babel.config.js', defaults)

module.exports = babelJest.createTransformer({
  babelrc: false,
  ...defaults,
  ...customConfig,
})
