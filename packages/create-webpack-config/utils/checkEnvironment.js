module.exports = () => {

  // Valid environment values are 'development' and 'production'.
  const env = process.env.NODE_ENV
  const isProduction = env === 'production'
  const isDevelopment = env === 'development'

  if (!isProduction && !isDevelopment) {
    throw new Error(
      'Valid values of `NODE_ENV` environment variable are ' +
    `"development" and "production", not ${JSON.stringify(env)}.`
    )
  }

  return {
    env,
    isProduction,
    isDevelopment,
  }
}
