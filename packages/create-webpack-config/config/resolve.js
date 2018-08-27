module.exports = (config, options, envs) => {
  const { srcPath, enableTypescript } = options

  config
    .resolve
    .modules
    .add('node_modules')
    .add(srcPath)
    // Finally, resolve modules based on current file path,
    // in this way, users do not need to install dependencies by themselves.
    .merge(module.paths)

  config
    .resolve
    .extensions
    .merge(['.js', '.jsx', '.json'])

  if (enableTypescript) {
    config
      .resolve
      .extensions
      .merge(['.ts', 'tsx'])
  }

  return config
}
