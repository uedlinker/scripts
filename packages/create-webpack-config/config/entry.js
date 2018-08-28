module.exports = (config, options, envs) => {
  const { entryPath, polyfillsPath, enableFetchPolyfill } = options

  if (typeof polyfillsPath === 'string') {
    config
      .entry('main')
      .add(polyfillsPath)
  }

  // Add `whatwg-fetch` after user custom polyfill to
  // giving user chance add polyfills for `whatwg-fetch`.
  if (enableFetchPolyfill) {
    config
      .entry('main')
      .add(require.resolve('whatwg-fetch'))
  }

  config
    .entry('main')
    .add(entryPath)

  return config
}
