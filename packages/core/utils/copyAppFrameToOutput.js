const fs = require('fs-extra')
const path = require('path')

const config = require('../config/runbuildConfig.json')

module.exports = async () => {
  await fs.ensureDir(config.runbuildOutput)
  const appFramePath = path.join(__dirname, '../appFrame')
  await fs.copy(appFramePath, config.runbuildOutput)
}
