#! /usr/bin/env node

const commander = require('commander')

const packageJSON = require('../package')
const dev = require('../libs/dev')
const build = require('../libs/build')

commander
  .version(packageJSON.version)
  .usage('[command] [options]')

commander
  .command('dev')
  .description('run development script')
  .action(dev)

commander
  .command('build')
  .description('run production script')
  .action(build)

commander
  .parse(process.argv)

if (commander.args.length === 0) {
  commander.help()
}
