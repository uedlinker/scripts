module.exports = (config, options, envs) => {
  const { env } = envs

  // Set mode value.
  //
  // `mode` = 'development' equivalent to：
  // {
  //   devtool: 'eval',
  //   plugins: [
  //     new webpack.NamedModulesPlugin(),
  //     new webpack.NamedChunksPlugin(),
  //     new webpack.DefinePlugin({
  //       'process.env.NODE_ENV': JSON.stringify('development')
  //     }),
  //   ]
  // }
  //
  // `mode` = 'production' equivalent to：
  // {
  //   plugins: [
  //     new UglifyJsPlugin(/* ... */),
  //     new webpack.DefinePlugin({
  //       'process.env.NODE_ENV': JSON.stringify('production')
  //     }),
  //     new webpack.optimize.ModuleConcatenationPlugin(),
  //     new webpack.NoEmitOnErrorsPlugin(),
  //   ]
  // }
  config.mode(env)

  return config
}
