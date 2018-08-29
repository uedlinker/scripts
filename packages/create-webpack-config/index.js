const Config = require('webpack-chain')
const { uedlinkerConfig } = require('@uedlinker/load-config')

const resolveOptions = require('./utils/resolveOptions')
const checkEnvironment = require('./utils/checkEnvironment')

module.exports = (options = uedlinkerConfig) => {
  const envs = checkEnvironment()
  options = resolveOptions(options)
  const config = new Config()

  ;[
    require('./config/context'),
    require('./config/devServer'),
    require('./config/devtool'),
    require('./config/entry'),
    require('./config/mode'),
    require('./config/node'),
    require('./config/optimization'),
    require('./config/output'),
    require('./config/plugins'),
    require('./config/resolve'),
    require('./config/rules'),
  ].forEach(create => {
    create(config, options, envs)
  })

  return config
}
