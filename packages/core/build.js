const loadAppDesc = require('./utils/loadAppDesc')
const _ = require('lodash')

const getConnectedComponent = require('./utils/getConnectedComponent')
const copyAppFrameToOutput = require('./utils/copyAppFrameToOutput')

async function main() {
  // 获取应用描述文件, 加载app.json
  const appDesc = await loadAppDesc()

  // 生成所有组件代码
  function genComponentsCode (pages) {
    _.forEach(pages, (page) => {
      _.forEach(page.components, (component) => {
        getConnectedComponent(component, {pageId: page.pageId})
      })
      if (page.pages) {
        genComponentsCode(page.pages)
      }
    })
  }
  genComponentsCode(appDesc.pages)

  // 将app框架拷贝到app输出目录
  copyAppFrameToOutput()

}

main()
