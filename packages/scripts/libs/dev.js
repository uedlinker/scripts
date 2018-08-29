module.exports = () => {
  process.env.NODE_ENV = 'development'
  process.env.BABEL_ENV = 'development'

  process.on('unhandledRejection', err => {
    throw err
  })

  const { execFileSync } = require('child_process')
  const file = require.resolve('webpack-dev-server/bin/webpack-dev-server.js')

  const args = process.argv.slice(3)
  args.unshift('--config', require.resolve('../config/webpack.js'))

  execFileSync(file, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}
