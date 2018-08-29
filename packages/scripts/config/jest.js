const { loadCustomConfig } = require('@uedlinker/load-config')

const defaults = require('@uedlinker/jest-preset-uedlinker')

const customConfig = loadCustomConfig('jest.config.js', defaults)

module.exports = { ...defaults, ...customConfig }
