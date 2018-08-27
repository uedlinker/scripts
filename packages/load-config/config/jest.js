const loadCustomConfig = require('../utils/loadCustomConfig')
const createJestConfig = require('@uedlinker/create-jest-config')

const filename = 'jest.config.js'
const options = require('./uedlinker')
const defaults = createJestConfig(options)

const customConfig = loadCustomConfig(filename, defaults)

module.exports = Object.freeze({ ...defaults, ...customConfig })
