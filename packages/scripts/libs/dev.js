module.exports = () => {
  process.env.NODE_ENV = 'development'
  process.env.BABEL_ENV = 'development'

  process.on('unhandledRejection', err => {
    throw err
  })

  const path = require('path')
  const { execFileSync } = require('child_process')

  const args = process.argv.slice(3)
  args.unshift('--config', path.resolve(__dirname, '../config/index.js'))

  const webpackPackage = require.resolve('webpack-dev-server')
  const binFile = path.resolve(webpackPackage, '../../bin/webpack-dev-server.js')

  execFileSync(binFile, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}
