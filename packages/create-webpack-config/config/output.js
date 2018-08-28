module.exports = (config, options, envs) => {
  const { isDevelopment } = envs
  const { outputPath, productionPublicPath } = options

  config
    .output
    .path(outputPath)
    .filename(
      isDevelopment
        ? 'assets/js/[name].bundle.js'
        : 'assets/js/[name].[contenthash:8].bundle.js'
    )
    .chunkFilename(
      isDevelopment
        ? 'assets/js/[name].chunk.js'
        : 'assets/js/[name].[contenthash:8].chunk.js'
    )
    .pathinfo(isDevelopment)
    .publicPath(
      isDevelopment
        ? '/'
        : (productionPublicPath != null ? productionPublicPath : '/')
    )
    .hashDigestLength(8)

  return config
}
