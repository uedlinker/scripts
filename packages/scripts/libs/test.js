module.exports = () => {
  process.env.NODE_ENV = 'test'
  process.env.BABEL_ENV = 'test'

  process.on('unhandledRejection', err => {
    throw err
  })

  const jest = require('jest')

  const args = process.argv.slice(3)
  args.unshift('--config', require.resolve('../config/jest.js'))

  jest.run(args)
}
