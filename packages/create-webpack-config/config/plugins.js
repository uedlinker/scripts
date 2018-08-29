const fs = require('fs')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const OfflinePlugin = require('offline-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (config, options, envs) => {
  const { isProduction, isDevelopment } = envs
  const {
    rootPath, outputPath, staticPath, templatePath, enableProductionPWA,
    enableProductionSourceMap, enableProductionAnalysis, enableDevelopmentHMR,
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

  config
    .plugin('define')
    .use(webpack.DefinePlugin, [customEnvs])

  if (isDevelopment) {
    config
      .plugin('bar')
      .use(WebpackBar)

    if (enableDevelopmentHMR) {
      config
        .plugin('hmr')
        .use(webpack.HotModuleReplacementPlugin)
    }
  }

  if (isProduction) {
    config
      .plugin('clean')
      .use(CleanWebpackPlugin, [[outputPath], {
        root: rootPath,
      }])

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
          : 'assets/css/[name].[contenthash:8].css',
        chunkFilename: isDevelopment
          ? 'assets/css/[name].css'
          : 'assets/css/[name].[contenthash:8].css',
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
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }])

  if (isProduction && enableProductionPWA) {
    config
      .plugin('offline')
      .use(OfflinePlugin)
  }

  return config
}
