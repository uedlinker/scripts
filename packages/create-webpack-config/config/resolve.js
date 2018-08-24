module.exports = (config, options, envs) => {
  const { srcPath, enableTypescript } = options

  // Take srcPath precedence over `node_modules`.
  // Files and directories under the srcPath have their own alias.
  config
    .resolve
    .modules
    .add(srcPath)
    .add('node_modules')

  // Resolve extensions.
  config
    .resolve
    .extensions
    .merge(['.js', '.jsx', '.json'])

  // If enable TypeScript.
  if (enableTypescript) {
    config
      .resolve
      .extensions
      .merge(['.ts', 'tsx'])
  }

  return config
}
