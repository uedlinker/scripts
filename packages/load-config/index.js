const jestConfig = require('./config/jest')
const babelConfig = require('./config/babel')
const webpackConfig = require('./config/webpack')
const uedlinkerConfig = require('./config/uedlinker')

module.exports = type => {
  switch (type) {
    case 'jest': return jestConfig
    case 'babel': return babelConfig
    case 'webpack': return webpackConfig
    case 'uedlinker': return uedlinkerConfig
  }
}

exports.loadCustomConfig = require('./utils/loadCustomConfig')
