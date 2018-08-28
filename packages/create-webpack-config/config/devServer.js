const fs = require('fs')

module.exports = (config, options, envs) => {
  const { isDevelopment } = envs
  const { staticPath, enableDevelopmentHMR } = options

  if (isDevelopment) {
    config
      .devServer
      .clientLogLevel('none')
      .compress(true)
      .historyApiFallback(true)
      .host('0.0.0.0')
      .noInfo(true)
      .open(true)
      .openPage('')
      .overlay({
        warnings: true,
        errors: true,
      })
      .port(3000)
      // Same as output.publicPath in development env.
      .publicPath('/')
      .useLocalIp(true)

    if (enableDevelopmentHMR) {
      config
        .devServer
        .hot(true)
    }

    if (fs.existsSync(staticPath) && fs.statSync(staticPath).isDirectory()) {
      config
        .devServer
        .contentBase(staticPath)
        .watchContentBase(true)
    }
  }

  return config
}
