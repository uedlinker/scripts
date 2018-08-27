module.exports = (config, options, envs) => {
  const { rootPath } = options

  // All of entry points and loaders are resolved from `rootPath`.
  config.context(rootPath)

  return config
}
