const { uedlinkerConfig } = require('@uedlinker/load-config')
const { enableTestRaf, enableTestEnzyme } = uedlinkerConfig

if (enableTestRaf) {
  const raf = require('raf')
  raf.polyfill(global)
}

if (enableTestEnzyme) {
  const Enzyme = require('enzyme')
  const Adapter = require('enzyme-adapter-react-16')
  Enzyme.configure({ adapter: new Adapter() })
}
