const Module = require('module')

const raf = require('raf')
const Enzyme = require(require.resolve('enzyme', {
  paths: Module._nodeModulePaths(process.cwd()).concat(module.paths),
}))
const Adapter = require(require.resolve('enzyme-adapter-react-16', {
  paths: Module._nodeModulePaths(process.cwd()).concat(module.paths),
}))

raf.polyfill(global)
Enzyme.configure({ adapter: new Adapter() })
