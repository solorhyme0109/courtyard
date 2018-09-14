const _ = require('lodash')
const getConnectedComponent = require('./getConnectedComponent')

module.exports = async function genAllComponentsFile (appDesc) {
  async function genComponentsCode (pages) {
    _.forEach(pages, async (page) => {
      _.forEach(page.components, async (component) => {
        await getConnectedComponent(component, {pageId: page.pageId})
      })
      if (page.pages) {
        await genComponentsCode(page.pages)
      }
    })
  }
  await genComponentsCode(appDesc.pages)
}
