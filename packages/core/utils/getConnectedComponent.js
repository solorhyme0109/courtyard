const path = require('path')
const fs = require('fs-extra')

const downloadComponentSource = require('./downloadComponentSource')
const getComponentOutputCode = require('./getComponentOutputCode')
const genComponentCodeFile = require('./genComponentCodeFile')

const config = require('../config/runbuildConfig.json')

async function getConnectedComponent(componentMeta, pageMeta) {
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

getConnectedComponent(
  {
    "id": "packages.bom.components.Button",
    "src": "packages/bom/components/Button",
    "component": "Button",
    "props": {
      "desc": "按钮"
    },
    "effects": {
      "alert": {
        "message": "submmiting"
      },
      "request": {
        "url": "api.domian.com/login",
        "body": {
          "username": "@store.username",
          "lvl": "@query.lvl",
          "userId": "@match.userId"
        }
      }
    }
  },
  {
    "pageId": "/"
  }
)
