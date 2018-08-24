const fs = require('fs')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (config, options, envs) => {
  const { isProduction, isDevelopment } = envs
  const {
    outputPath, staticPath, templatePath,
    enableProductionSourceMap, enableProductionAnalysis,
  } = options

  // Custom environment variables.
  // Those starting with `uedlinker_` are effective.
  const customEnvs = {}
  const customEnvRe = /^UEDLINKER_/
  for (let key in process.env) {
    if (customEnvRe.test(key)) {
      customEnvs[`process.env.${key}`] = JSON.stringify(process.env[key])
    }
  }

  // Define custom envs.
  config
    .plugin('define')
    .use(webpack.DefinePlugin, [customEnvs])

  // Webpack Bar
  config
    .plugin('bar')
    .use(WebpackBar)

  // Plugins in poroduction env.
  if (isProduction) {
    config

      .plugin('clean')
      .use(CleanWebpackPlugin, [[outputPath]])
      .end()

    if (fs.existsSync(staticPath) && fs.statSync(staticPath).isDirectory()) {
      config
        .plugin('copy')
        .use(CopyWebpackPlugin, [[{
          from: staticPath,
        }]])
        .end()
    }

    config
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin, [{
        filename: isDevelopment
          ? 'assets/css/[name].css'
          : 'assets/css/[name].[chunkhash].css',
        chunkFilename: isDevelopment
          ? 'assets/css/[name].css'
          : 'assets/css/[name].[chunkhash].css',
      }])
      .end()

      .plugin('optimize-css-assets')
      .use(OptimizeCSSAssetsPlugin, [{
        cssProcessorOptions: {
          map: enableProductionSourceMap && {
            inline: false,
          },
        },
      }])

    if (enableProductionAnalysis) {
      config
        .plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
  }

  config
    .plugin('html')
    .use(HtmlWebpackPlugin, [{
      template: templatePath,
      minify: isProduction && {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }])

  return config
}
