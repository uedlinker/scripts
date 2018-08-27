const raf = require('raf')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

raf.polyfill(global)
Enzyme.configure({ adapter: new Adapter() })
