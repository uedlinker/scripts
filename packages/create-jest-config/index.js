const path = require('path')
const { defaults } = require('jest-config')

module.exports = (options = {}) => {
  const defaultAppPath = process.cwd()
  const { appPath = defaultAppPath } = options

  if (typeof appPath !== 'string' || !path.isAbsolute(appPath)) {
    throw new Error(
      `Option \`appPath\` must be an absolute path. You provide ${appPath}.`
    )
  }

  let {
    enableTypescript = false,
    srcPath = 'src',
    outputPath = 'dist',
    staticPath = 'static',
  } = options

  if (typeof srcPath !== 'string') {
    throw new Error(
      `Option \`srcPath\` must be a string path. You provide ${srcPath}`
    )
  }
  if (typeof outputPath !== 'string') {
    throw new Error(
      `Option \`outputPath\` must be a string path. You provide ${outputPath}`
    )
  }
  if (typeof staticPath !== 'string') {
    throw new Error(
      `Option \`staticPath\` must be a string path. You provide ${staticPath}`
    )
  }

  if (path.isAbsolute(srcPath)) {
    srcPath = path.relative(appPath, srcPath)
  }
  if (path.isAbsolute(outputPath)) {
    outputPath = path.relative(appPath, outputPath)
  }
  if (path.isAbsolute(staticPath)) {
    staticPath = path.relative(appPath, staticPath)
  }

  const collectCoverageFrom = [
    (srcPath ? `${srcPath}/**/*.{js,jsx}` : '**/*.{js,jsx}'),
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/e2e/**',
    '!**/tests/**',
    '!**/test/**',
  ]

  const coveragePathIgnorePatterns = [
    '/node_modules/',
    '/__mocks__/',
    '/__tests__/',
    '/e2e/',
    '/tests/',
    '/test/',
  ]

  const moduleFileExtensions = [...defaults.moduleFileExtensions]

  const modulePaths = [
    path.resolve(appPath, srcPath),
  ]

  const setupFiles = [
    require.resolve('whatwg-fetch'),
    path.resolve(__dirname, './setup.js'),
  ]

  const testMatch = [...defaults.testMatch]

  const transform = {
    '^.+\\.jsx?$': path.resolve(__dirname, './transformBabel.js'),
  }

  if (outputPath) {
    collectCoverageFrom.push(`!${outputPath}/**`)
    coveragePathIgnorePatterns.push(`<rootDir>/${outputPath}/`)
  }

  if (staticPath) {
    collectCoverageFrom.push(`!${staticPath}/**`)
    coveragePathIgnorePatterns.push(`<rootDir>/${staticPath}/`)
  }

  if (enableTypescript) {
    collectCoverageFrom.push(
      (srcPath ? `${srcPath}/**/*.{ts,tsx}` : '**/*.{ts,tsx}')
    )
    moduleFileExtensions.push('ts', 'tsx')
    testMatch.push(
      '**/__tests__/**/*.ts?(x)',
      '**/?(*.)+(spec|test).ts?(x)'
    )
    transform['^.+\\.tsx?$'] = path.resolve(__dirname, './transformBabel.js')
    transform['^(?!.*\\.(js|jsx|ts|tsx|json)$)'] = path.resolve(__dirname, './transformOtherFile.js')
  } else {
    transform['^(?!.*\\.(js|jsx|json)$)'] = path.resolve(__dirname, './transformOtherFile.js')
  }

  return {
    rootDir: appPath,
    collectCoverageFrom,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns,
    moduleFileExtensions,
    modulePaths,
    setupFiles,
    testMatch,
    transform,
    verbose: true,
  }
}
