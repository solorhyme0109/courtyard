const fs = require('fs-extra')
const util =  require('util')
const path = require('path')
const {flow, map, curryRight, filter} = require('lodash')
const getComponentShape = require('./getComponentShape')
const package = require(path.join(process.cwd(), './package.json'))

const getComponentDir = () => path.dirname(require.resolve(package.WEBPAAS_COMPONENTS_PATH))
const joinWithComponentDir = (filePath) => path.join(getComponentDir(), filePath)

function loadEachComponentFile(filepath) {
  const componentModule = require(filepath)
  const pathAsId = require.resolve(filepath)
  const shape = getComponentShape({})(componentModule)
  return {
    id: pathAsId,
    src: pathAsId,
    shape
  }
}

const mapComponents = curryRight(map)(loadEachComponentFile)

const isDir = (filepath) => fs.statSync(filepath).isDirectory()

const getAllComponentsMeta = flow([
  getComponentDir,
  fs.readdirSync,
  curryRight(map)(joinWithComponentDir),
  curryRight(filter)(isDir),
  mapComponents
])

console.log(util.inspect(getAllComponentsMeta(), {depth: 10}))

module.exports = getAllComponentsMeta
