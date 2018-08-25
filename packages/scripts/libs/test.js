module.exports = () => {
  process.env.NODE_ENV = 'test'
  process.env.BABEL_ENV = 'test'

  process.on('unhandledRejection', err => {
    throw err
  })

  const path = require('path')
  const jest = require('jest')

  const args = process.argv.slice(3)
  args.unshift('--config', path.resolve(__dirname, '../config/jest.js'))

  jest.run(args)
}
