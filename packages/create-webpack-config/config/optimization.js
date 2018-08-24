module.exports = (config, options, envs) => {

  config
    .optimization
    .splitChunks({
      chunks: 'all',
      name: 'vendors',
    })
    .runtimeChunk(true)

  return config
}
