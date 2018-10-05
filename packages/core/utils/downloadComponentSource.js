const fs = require('fs-extra')
const path = require('path')
const config = require('../config/runbuildConfig.json')

module.exports = async function (src) {
  const dirname = src.replace(/\/+/g, '/').split('/').join('.')

  // TODO: Install from npm
  /** The following code is mock componemts for test. */
  const mockedComponentsDir = config.mockedComponentsDir
  src = path.join(mockedComponentsDir, src.replace('@courtyardComponents/', ''))

  const dist = path.join(config.runbuildOutput, config.componentSourceOutput, dirname)
  await fs.copy(src, dist)
  return dirname
}
