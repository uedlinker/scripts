const fs = require('fs')
const path = require('path')
const resolveOptions = require('../../utils/resolveOptions')

describe('@uedlinker/create-webpack-config', () => {
  describe('utils/resolveOptions', () => {

    test('will throw error if config appPath is not an absolute path', () => {
      expect(() => {
        resolveOptions({ appPath: './relative' })
      }).toThrowError()
    })

    test('will return default options if not specifing any other options', () => {
      const defaults = resolveOptions()
      expect(defaults).toMatchObject(expect.objectContaining({
        appPath: expect.any(String),
        srcPath: expect.any(String),
        entryPath: expect.any(String),
        outputPath: expect.any(String),
        staticPath: expect.any(String),
        templatePath: expect.any(String),
        productionPublicPath: '/',
        enableProductionSourceMap: false,
        enableProductionAnalysis: false,
        enableTypescript: false,
        enableSass: true,
      }))
      expect(defaults).not.toMatchObject(expect.objectContaining({
        polyfillsPath: expect.anything(),
      }))
    })

    test('resolve options correctly', () => {
      const options = resolveOptions({
        srcPath: '/absolutePath',
        polyfillsPath: './relativePath',
        enableSass: false,
      })
      expect(options.srcPath).toBe('/absolutePath')
      expect(options.polyfillsPath).toBe(
        path.resolve(fs.realpathSync(process.cwd()), './relativePath')
      )
      expect(options.enableSass).toBe(false)
    })

  })
})
