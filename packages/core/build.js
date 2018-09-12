const loadAppDesc = require('./utils/loadAppDesc')
const _ = require('lodash')

const getConnectedComponent = require('./utils/getConnectedComponent')

async function main() {
  // 获取应用描述文件, 加载app.json
  const appDesc = await loadAppDesc()

  // 生成所有组件代码
  function genComponentsCode (pages) {
    _.forEach(pages, (page) => {
      _.forEach(page.components, (component) => {
        getConnectedComponent(component, {pageId: page.pageId})
      })
      if (page.page) {
        genComponentsCode(page.page)
      }
    })
  }
  genComponentsCode(appDesc.pages)
}

main()
