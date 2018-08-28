const uedlinkerConfig = require('@uedlinker/load-config/config/uedlinker')

module.exports = (context, options = uedlinkerConfig) => {
  const presets = []
  const plugins = []

  const env = context.env() || process.env.BABEL_ENV || process.env.NODE_ENV
  const isDevelopment = env === 'development'
  const isProduction = env === 'production'
  const isTest = env === 'test'

  if (!isDevelopment && !isProduction && !isTest) {
    throw new Error(
      'Must specify `BABEL_ENV` or `NODE_ENV` environment variables when ' +
      'using `@uedlinker/babel-preset-uedlinker`. Accept "development", ' +
      `"production" and "test" values, instead of ${JSON.stringify(env)}.`
    )
  }

  const {
    // Which ES stage syntax should be supported, default stage 3.
    stage = 3,
    // Whether support Flow.js syntax, default false.
    enableFlow = false,
    // Whether support TypeScript syntax, default false.
    enableTypescript = false,
    // Whether import polyfills in preset-env.
    enableBabelPolyfill = true,
  } = options

  // Is `stage` value valid.
  // Valid values: [null, 'none', 0, 1, 2, 3, 4].
  if (stage != null && stage !== 'none') {
    if (![0, 1, 2, 3, 4].includes(stage)) {
      throw new Error(
        'Option `stage` value is invalid.' +
        'Valid values: [null, "none", 0, 1, 2, 3, 4].' +
        'When `stage` is null or "none", it will disable ES syntax in stages.'
      )
    }
  }

  presets.push([
    require('@babel/preset-env'),
    (
      isTest ? {
        targets: { node: 'current' },
        ...options['@babel/preset-env'],
      } : {
        // When testing or building UI libs, should transform ES6 modules to
        // commonjs that Node.js is using. When using other module system like Webpack,
        // there is no need to transform modules to commonjs, modules will be handled by theirself.
        modules: false,
        // Adds specific imports for polyfills when they are used in each file based on browserslist.
        // You need to add `core-js` and `regenerator-runtime` as dependencies.
        useBuiltIns: !!enableBabelPolyfill && 'usage',
        ...options['@babel/preset-env'],
      }
    ),
  ])

  presets.push([
    require('@babel/preset-react'),
    {
      // Will use the native built-in instead of polyfills.
      // The `@babel/preset-env` will create polyfills.
      useBuiltIns: true,
      development: isDevelopment || isTest,
      ...options['@babel/preset-react'],
    },
  ])

  if (enableFlow) {
    presets.push([
      require('@babel/preset-flow'),
    ])
  }

  if (enableTypescript) {
    presets.push([
      require('@babel/preset-typescript'),
      {
        isTSX: true,
        allExtensions: true,
        ...options['@babel/preset-typescript'],
      },
    ])
  }

  // If syntax in stages is enabled.
  if (stage != null && stage !== 'none') {

    // Stage 0
    if (stage === 0) {
      plugins.push([
        require('@babel/plugin-proposal-function-bind'),
      ])
    }

    // Stage 1
    if (stage <= 1) {
      plugins.push([
        require('@babel/plugin-proposal-export-default-from'),
      ], [
        require('@babel/plugin-proposal-logical-assignment-operators'),
      ], [
        require('@babel/plugin-proposal-optional-chaining'),
        {
          loose: false,
          ...options['@babel/plugin-proposal-optional-chaining'],
        },
      ], [
        require('@babel/plugin-proposal-pipeline-operator'),
        {
          proposal: 'minimal',
          ...options['@babel/plugin-proposal-pipeline-operator'],
        },
      ], [
        require('@babel/plugin-proposal-nullish-coalescing-operator'),
        {
          loose: false,
          ...options['@babel/plugin-proposal-nullish-coalescing-operator'],
        },
      ], [
        require('@babel/plugin-proposal-do-expressions'),
      ])
    }

    // Stage 2
    if (stage <= 2) {
      plugins.push([
        require('@babel/plugin-proposal-decorators'),
        {
          legacy: true,
          ...options['@babel/plugin-proposal-decorators'],
        },
      ], [
        require('@babel/plugin-proposal-function-sent'),
      ], [
        require('@babel/plugin-proposal-export-namespace-from'),
      ], [
        require('@babel/plugin-proposal-numeric-separator'),
      ], [
        require('@babel/plugin-proposal-throw-expressions'),
      ])
    }

    // Stage 3
    if (stage <= 3) {
      plugins.push([
        require('@babel/plugin-syntax-dynamic-import'),
      ], [
        require('@babel/plugin-syntax-import-meta'),
      ], [
        require('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
          ...options['@babel/plugin-proposal-class-properties'],
        },
      ], [
        require('@babel/plugin-proposal-json-strings'),
      ])
    }
  }

  plugins.push([
    require('@babel/plugin-transform-runtime'),
    {
      corejs: false,
      helpers: true,
      // Generator functions are transformed to use a regenerator runtime.
      regenerator: true,
      // Set this to true when using other module systems like Webpack.
      // Otherwise set this to false.
      useESModules: !isTest,
      ...options['@babel/plugin-transform-runtime'],
    },
  ])

  // Transform generator function to regenerator when env isn't "test".
  if (!isTest) {
    plugins.push([
      require('@babel/plugin-transform-regenerator'),
      {
        // Async functions are converted to generators by `@babel/preset-env`.
        async: false,
        ...options['@babel/plugin-transform-regenerator'],
      },
    ])
  }

  // Remove React propTypes when production.
  if (isProduction) {
    plugins.push([
      require('babel-plugin-transform-react-remove-prop-types'),
      {
        // Set this to 'unsafe-wrap'(preferred) or 'wrap' when building sharable libs.
        mode: 'remove',
        // Remove `import PropTypes from 'prop-types'` from your code.
        // You must ensure the `mode` is 'remove' when setting this to true,
        // otherwise, set this to false.
        removeImport: true,
        ...options['babel-plugin-transform-react-remove-prop-types'],
      },
    ])
  }

  return { presets, plugins }
}
