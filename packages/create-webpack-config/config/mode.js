module.exports = (config, options, envs) => {
  const { env } = envs

  // `env`'s possible value are "development" and "production"
  config.mode(env)

  return config
}
