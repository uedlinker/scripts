const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (config, options, envs) => {
  const { isDevelopment } = envs
  const {
    appPath, srcPath, enableTypescript, enableSass, babelConfig,
    enableLess, enableStylus, enableImages, enableFonts, enableMedia,
  } = options

  // Disable `require.ensure`, use standard dynamic import.
  config
    .module
    .rule('parser')
    .parser({ requireEnsure: false })

  config
    .module
    .rule('base')
    .test(enableTypescript ? /\.(tsx?)|(jsx?)$/ : /\.jsx?$/)

    .include
    .add(srcPath)
    .end()

    .exclude
    .add(/node_modules/)
    .end()

    .use('thread-loader')
    .loader(require.resolve('thread-loader'))
    .options(isDevelopment ? {
      poolTimeout: Infinity,
    } : void 0)
    .end()

    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options({
      babelrc: false,
      cwd: appPath,
      root: appPath,
      cacheDirectory: true,
      ...babelConfig,
    })

  configStyleRule(config, 'css', isDevelopment)

  if (enableSass) configStyleRule(config, 'sass', isDevelopment)
  if (enableLess) configStyleRule(config, 'less', isDevelopment)
  if (enableStylus) configStyleRule(config, 'stylus', isDevelopment)
  if (enableImages) configFilesRule(config, 'images', isDevelopment)
  if (enableFonts) configFilesRule(config, 'fonts', isDevelopment)
  if (enableMedia) configFilesRule(config, 'media', isDevelopment)

  return config
}

function configStyleRule (config, type, isDevelopment) {

  let testRe
  let importLoaders = 2

  switch (type) {
    case 'css': testRe = /\.css$/; importLoaders = 1; break
    case 'sass': testRe = /\.s(a|c)ss$/; break
    case 'less': testRe = /\.less$/; break
    case 'stylus': testRe = /\.styl(us)?$/; break
  }

  const base = config
    .module
    .rule(type)
    .test(testRe)

    .use('style-loader')
    .loader(
      isDevelopment
        ? require.resolve('style-loader')
        : MiniCssExtractPlugin.loader
    )
    .end()

    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      importLoaders: importLoaders,
    })
    .end()

    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .options({
      ident: 'postcss',
      plugins: [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          flexbox: 'no-2009',
        }),
      ],
    })
    .end()

  if (type === 'sass') {
    base
      .use('sass-loader')
      .loader(require.resolve('sass-loader'))
  }

  if (type === 'less') {
    base
      .use('less-loader')
      .loader(require.resolve('less-loader'))
  }

  if (type === 'stylus') {
    base
      .use('stylus-loader')
      .loader(require.resolve('stylus-loader'))
  }

  return config
}

function configFilesRule (config, type, isDevelopment) {

  let testRe
  switch (type) {
    case 'images': testRe = /\.(bmp|webp|png|jpe?g|gif|svg)$/; break
    case 'fonts': testRe = /\.(eot|ttf|woff|woff2)$/; break
    case 'media': testRe = /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/; break
  }

  config
    .module
    .rule(type)
    .test(testRe)

    .oneOf('inline')
    .resourceQuery(/inline/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .end()
    .end()

    .oneOf('external')
    .resourceQuery(/external/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: isDevelopment
        ? `assets/${type}/[name].[ext]`
        : `assets/${type}/[name].[hash].[ext]`,
    })
    .end()
    .end()

    .oneOf('default')
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: 4096,
      name: isDevelopment
        ? `assets/${type}/[name].[ext]`
        : `assets/${type}/[name].[hash].[ext]`,
    })

  return config
}
