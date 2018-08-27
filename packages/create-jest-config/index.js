const fs = require('fs')
const path = require('path')
const { defaults } = require('jest-config')
const uedlinkerConfig = require('@uedlinker/load-config/config/uedlinker')

module.exports = (options = uedlinkerConfig) => {

  let {
    rootPath = fs.realpathSync(process.cwd()),
    srcPath = 'src',
    outputPath = 'dist',
    staticPath = 'static',
    enableTypescript = false,
  } = options

  // `rootPath` must be an absolute path.
  if (typeof rootPath !== 'string' || !path.isAbsolute(rootPath)) {
    throw new Error(
      `Option \`rootPath\` must be an absolute path. You provide ${JSON.stringify(rootPath)}.`
    )
  }

  // Validate paths.
  if (typeof srcPath !== 'string') {
    throw new Error(
      `Option \`srcPath\` must be a string path. You provide ${JSON.stringify(srcPath)}`
    )
  }
  if (typeof outputPath !== 'string') {
    throw new Error(
      `Option \`outputPath\` must be a string path. You provide ${JSON.stringify(outputPath)}`
    )
  }
  if (typeof staticPath !== 'string') {
    throw new Error(
      `Option \`staticPath\` must be a string path. You provide ${JSON.stringify(staticPath)}`
    )
  }

  // Resolve all absolute paths to relative paths.
  if (path.isAbsolute(srcPath)) {
    srcPath = path.relative(rootPath, srcPath)
  }
  if (path.isAbsolute(outputPath)) {
    outputPath = path.relative(rootPath, outputPath)
  }
  if (path.isAbsolute(staticPath)) {
    staticPath = path.relative(rootPath, staticPath)
  }

  // Jest `rootDir` config
  const rootDir = rootPath

  // Jest `collectCoverageFrom` config
  const collectCoverageFrom = [
    '!**/e2e/**',
    '!**/test/**',
    '!**/tests/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/node_modules/**',
    `${srcPath}/**/*.{js,jsx}`,
  ]

  if (outputPath) collectCoverageFrom.push(`!${outputPath}/**`)
  if (staticPath) collectCoverageFrom.push(`!${staticPath}/**`)
  if (enableTypescript) collectCoverageFrom.push(`${srcPath}/**/*.{ts,tsx}`)

  // Jest `coverageDirectory` config
  const coverageDirectory = 'coverage'

  // Jest `coveragePathIgnorePatterns` config
  const coveragePathIgnorePatterns = [
    '/e2e/',
    '/test/',
    '/tests/',
    '/__mocks__/',
    '/__tests__/',
    '/node_modules/',
  ]

  if (outputPath) coveragePathIgnorePatterns.push(`<rootDir>/${outputPath}/`)
  if (staticPath) coveragePathIgnorePatterns.push(`<rootDir>/${staticPath}/`)

  // Jest `moduleFileExtensions` config
  const moduleFileExtensions = [...defaults.moduleFileExtensions]
  if (enableTypescript) moduleFileExtensions.push('ts', 'tsx')

  // Jest `modulePaths` config
  const modulePaths = [ path.resolve(rootPath, srcPath) ].concat(module.paths)

  // Jest `setupFiles` config
  const setupFiles = [
    require.resolve('whatwg-fetch'),
    path.resolve(__dirname, './setup.js'),
  ]

  // Jest `testMatch` config
  const testMatch = [...defaults.testMatch]

  if (enableTypescript) {
    testMatch.push(
      '**/__tests__/**/*.ts?(x)',
      '**/?(*.)+(spec|test).ts?(x)'
    )
  }

  // Jest `transform` config
  const transform = {
    '^.+\\.jsx?$': path.resolve(__dirname, './transform/babel.js'),
  }

  if (enableTypescript) {
    transform['^.+\\.tsx?$'] = path.resolve(__dirname, './transform/babel.js')
    transform['^(?!.*\\.(js|jsx|ts|tsx|json)$)'] = path.resolve(__dirname, './transform/other.js')
  } else {
    transform['^(?!.*\\.(js|jsx|json)$)'] = path.resolve(__dirname, './transform/other.js')
  }

  // Jest `verbose` config
  const verbose = true

  return {
    rootDir,
    collectCoverageFrom,
    coverageDirectory,
    coveragePathIgnorePatterns,
    moduleFileExtensions,
    modulePaths,
    setupFiles,
    testMatch,
    transform,
    verbose,
  }
}
