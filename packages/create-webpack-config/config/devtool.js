module.exports = (config, options, envs) => {
  const { isDevelopment, isProduction } = envs
  const { enableProductionSourceMap } = options

  if (isDevelopment) {
    config.devtool('cheap-module-eval-source-map')
  }
  if (isProduction) {
    config.devtool(enableProductionSourceMap ? 'source-map' : false)
  }

  return config
}
