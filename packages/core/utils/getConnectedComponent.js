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
  await genComponentCodeFile(path.join(config.connectedComponentOutput, `${componentPackageDist}.jsx`), componentOutputCode)
}
