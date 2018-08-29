const fs = require('fs')
const { execSync } = require('child_process')

module.exports = (config, options, envs) => {
  const { isDevelopment } = envs
  const { staticPath, enableDevelopmentHMR } = options

  const host = '0.0.0.0'
  const port = 3000

  if (isDevelopment) {
    config
      .devServer
      .clientLogLevel('none')
      .compress(true)
      .historyApiFallback({ disableDotRule: true })
      .host(host)
      .noInfo(true)
      .overlay({
        warnings: true,
        errors: true,
      })
      .port(port)
      // Same as output.publicPath in development env.
      .publicPath('/')
      .set('after', () => {
        execSync('ps cax | grep "Google Chrome"')
        execSync(
          `osascript chrome.applescript "${encodeURI(
            `http://localhost:${port}`
          )}"`,
          {
            cwd: __dirname,
            stdio: 'ignore',
          }
        )
      })

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
