module.exports = () => {
  process.env.NODE_ENV = 'production'
  process.env.BABEL_ENV = 'production'

  process.on('unhandledRejection', err => {
    throw err
  })

  const path = require('path')
  const { execFileSync } = require('child_process')

  const args = process.argv.slice(3)
  args.unshift('--config', path.resolve(__dirname, '../config/webpack.js'))

  const webpackPackage = require.resolve('webpack')
  const binFile = path.resolve(webpackPackage, '../../bin/webpack.js')

  execFileSync(binFile, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}
