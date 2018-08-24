const checkEnvironment = require('../../utils/checkEnvironment')

describe('@uedlinker/create-webpack-config', () => {
  describe('utils/checkEnvironment', () => {

    // `NODE_ENV` is 'test' in Jest.
    test('should throw error if not specifing `NODE_ENV` environment', () => {
      expect(() => {
        checkEnvironment()
      }).toThrowError()
    })

    test('match development', () => {
      process.env.NODE_ENV = 'development'
      expect(checkEnvironment()).toEqual({
        env: 'development',
        isDevelopment: true,
        isProduction: false,
      })
    })

    test('match production', () => {
      process.env.NODE_ENV = 'production'
      expect(checkEnvironment()).toEqual({
        env: 'production',
        isDevelopment: false,
        isProduction: true,
      })
    })

  })
})
