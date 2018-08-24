const absolutePath = require('../../utils/absolutePath')

describe('@uedlinker/create-webpack-config', () => {
  describe('utils/absolutePath', () => {

    test('will throw error if `basePath` is not a string', () => {
      expect(() => {
        absolutePath({ describe: 'The first param is not a string' })
      }).toThrowError()
    })

    test('will throw error if `basePath` is not an absolute path', () => {
      expect(() => {
        absolutePath('./relativePath')
      }).toThrowError()
    })

    test('will return dirrectly when `relativePath` is not a string', () => {
      const relativePath = {}
      expect(absolutePath('/', relativePath)).toBe(relativePath)
    })

    test('will return dirrectly when `relativePath` is an absolute path', () => {
      expect(absolutePath('/absolute', '/relative')).toBe('/relative')
    })

    test('resolve correctly', () => {
      expect(absolutePath('/absolute', './relative')).toBe('/absolute/relative')
    })

  })
})
