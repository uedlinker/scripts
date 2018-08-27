module.exports = () => {
  process.env.NODE_ENV = 'production'
  process.env.BABEL_ENV = 'production'

  process.on('unhandledRejection', err => {
    throw err
  })

  const { execFileSync } = require('child_process')
  const file = require.resolve('webpack/bin/webpack.js')

  const args = process.argv.slice(3)
  args.unshift('--config', require.resolve('@uedlinker/load-config/config/webpack.js'))

  execFileSync(file, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}
