module.exports = (config, options, envs) => {
  const { entryPath, polyfillsPath } = options

  config
    .entry('main')
    .add(require.resolve('whatwg-fetch'))

  if (typeof polyfillsPath === 'string') {
    config
      .entry('main')
      .add(polyfillsPath)
  }

  config
    .entry('main')
    .add(entryPath)

  return config
}
