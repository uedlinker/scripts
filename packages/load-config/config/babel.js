const loadCustomConfig = require('../utils/loadCustomConfig')
const {
  stage, enableFlow, enableTypescript, enableBabelPolyfill, enableDevelopmentHMR,
} = require('./uedlinker')

const filename = 'babel.config.js'

const defaults = {
  presets: [[
    require.resolve('@uedlinker/babel-preset-uedlinker'),
    { stage, enableFlow, enableTypescript, enableBabelPolyfill },
  ]],
}

if (enableDevelopmentHMR) {
  defaults.plugins = [require.resolve('react-hot-loader/babel')]
}

const customConfig = loadCustomConfig(filename, defaults)

module.exports = Object.freeze({ ...defaults, ...customConfig })
