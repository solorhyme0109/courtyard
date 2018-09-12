const fs = require('fs-extra')
const path = require('path')
const config = require('../config/runbuildConfig.json')

module.exports = async function (src) {
  const dist = path.join(process.cwd(), config.componentSourceOutput, src.split('/').join('.'))
  await fs.copy(src, dist)
  return src.replace(/\/+/g, '/').split('/').join('.')
}
