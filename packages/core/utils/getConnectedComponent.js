const path = require('path')
const fs = require('fs-extra')

const downloadComponentSource = require('./downloadComponentSource')
const getComponentOutputCode = require('./getComponentOutputCode')
const genComponentCodeFile = require('./genComponentCodeFile')

const config = require('../config/runbuildConfig.json')

module.exports = async function getConnectedComponent(componentMeta, pageMeta) {
  const componentPackageDist = await downloadComponentSource(componentMeta.src)

  const componentOutputCode = await getComponentOutputCode(
    /* raw component source */
    componentPackageDist,
     /*config*/
     {
      pageId: pageMeta.pageId,
      componentMeta,
     }
  )

  const targetDir = path.join(config.runbuildOutput, config.connectedComponentOutput)
  await fs.ensureDir(targetDir)
  const componentOutputFilename = `${componentPackageDist}.connected.js`
  const componentOutputPath = path.join(targetDir, componentOutputFilename)
  await genComponentCodeFile(componentOutputPath, componentOutputCode)
  componentMeta.resolve = componentOutputFilename
}
