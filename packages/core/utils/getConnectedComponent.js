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

  await fs.ensureDir(config.connectedComponentOutput)
  const componentOutputFilename = `${componentPackageDist}.connected.js`
  const componentOutputPath = path.join(config.connectedComponentOutput, componentOutputFilename)
  await genComponentCodeFile(componentOutputPath, componentOutputCode)
  componentMeta.resolve = componentOutputFilename
}
