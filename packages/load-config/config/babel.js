const loadCustomConfig = require('../utils/loadCustomConfig')
const { stage, enableFlow, enableTypescript } = require('./uedlinker')

const filename = 'babel.config.js'

const defaults = {
  presets: [[
    require.resolve('@uedlinker/babel-preset-uedlinker'),
    { stage, enableFlow, enableTypescript },
  ]],
}

const customConfig = loadCustomConfig(filename, defaults)

module.exports = Object.freeze({ ...defaults, ...customConfig })
