module.exports = (config, options, envs) => {
  const { entryPath, polyfillsPath } = options

  // Add `@babel/polyfill` and `whatwg-fetch` polyfills.
  config
    .entry('main')
    .add('@babel/polyfill')
    .add('whatwg-fetch')

  // If user configs polyfillsPath, add polyfillsPath to entry.
  if (typeof polyfillsPath === 'string') {
    config
      .entry('main')
      .add(polyfillsPath)
  }

  // Finally, add entryPath.
  config
    .entry('main')
    .add(entryPath)

  return config
}
