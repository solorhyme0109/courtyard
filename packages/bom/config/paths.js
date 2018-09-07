const fs =  require('fs')
const path = require('path')

const componentDirPath = path.join(__dirname, '../components')

const componentsEntry =
  fs.readdirSync(componentDirPath)
    .map(filepath => path.join(componentDirPath, filepath))
    .filter((filepath) => fs.statSync(filepath).isDirectory())
    .reduce(
      (acc, filepath) => Object.assign(acc, {[path.basename(filepath)]: path.normalize(path.join(filepath, 'index.js'))}),
      {}
    )

module.exports = {
  componentsEntry,
  output: path.join(__dirname, '../', 'dist')
}
