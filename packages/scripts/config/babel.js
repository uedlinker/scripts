const { uedlinkerConfig, loadCustomConfig } = require('@uedlinker/load-config')
const { enableDevelopmentHMR } = uedlinkerConfig

const defaults = {
  presets: [[
    require.resolve('@uedlinker/babel-preset-uedlinker'),
    uedlinkerConfig,
  ]],
}

if (process.env.NODE_ENV === 'development' && enableDevelopmentHMR) {
  defaults.plugins = [require.resolve('react-hot-loader/babel')]
}

const customConfig = loadCustomConfig('babel.config.js', defaults)

module.exports = Object.freeze({ ...defaults, ...customConfig })
