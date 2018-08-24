module.exports = (config, options, envs) => {
  const { appPath } = options

  // All of entry points and loaders are resolved from appPath.
  config.context(appPath)

  return config
}
