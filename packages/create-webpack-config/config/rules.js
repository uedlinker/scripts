const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (config, options, envs) => {
  const { isDevelopment } = envs
  const { appPath, srcPath, enableTypescript, enableSass, babelConfig } = options

  // Disable `require.ensure`, use standard dynamic import.
  config
    .module
    .rule('parser')
    .parser({ requireEnsure: false })

  // Base rule.
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

  // CSS rule.
  configStyleRule(config, 'css', isDevelopment)

  // If support Sass files
  if (enableSass) {
    configStyleRule(config, 'sass', isDevelopment)
  }

  // Images rule
  configFilesRule(config, 'images', isDevelopment)

  // Fonts rule
  configFilesRule(config, 'fonts', isDevelopment)

  // Media rule.
  configFilesRule(config, 'media', isDevelopment)

  return config
}

// Config style rule.
function configStyleRule (config, type, isDevelopment) {

  let testRe
  let importLoaders
  switch (type) {
    case 'css': testRe = /\.css$/; importLoaders = 1; break
    case 'sass': testRe = /\.scss$/; importLoaders = 2; break
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

  return config
}

// Config files rule
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
