const fs = require('fs-extra')
const path = require('path')
const config = require('../config/runbuildConfig.json')

module.exports = async function (src) {
  const dirname = src.replace(/\/+/g, '/').split('/').join('.')
  const dist = path.join(config.runbuildOutput, config.componentSourceOutput, dirname)
  await fs.copy(src, dist)
  return dirname
}
