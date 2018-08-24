module.exports = (config, options, envs) => {

  config
    .node
    .set('dgram', 'empty')
    .set('fs', 'empty')
    .set('net', 'empty')
    .set('tls', 'empty')
    .set('child_process', 'empty')

  return config
}
