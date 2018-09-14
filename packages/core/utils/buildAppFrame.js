const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const util = require('util')

const config = require('../config/runbuildConfig.json')

// const logmore = (object) => util.inspect(object, {depth: 6})

module.exports = async (appDesc) => {
  const tmp = path.join(config.tmpDir, 'appFrame')
  await fs.ensureDir(tmp)
  await fs.copy(path.join(__dirname, '../appFrame'), tmp)

  // output page.json with pages data
  const pickProps = ['route', 'pageId', 'title', 'style', 'components', 'exact']
  const pageData = _.map(appDesc.pages, (item) => _.pick(item, pickProps))
  await fs.writeFile(path.join(tmp, 'data/pages.json'), JSON.stringify(pageData))

  // output components menifest
  const menifestTemplate = await fs.readFile(path.join(tmp, 'helpers/componentMenifest.jst'), {encoding: 'utf8'})
  const componentTemplate = await fs.readFile(path.join(__dirname, '../codeTemplates/componentLoadablePiece.jst'), {encoding: 'utf8'})
  const componentsData = []
  function recur(pages) {
    _.forEach(pages, (page) => {
      _.forEach(page.components, (component) => {
        componentsData.push(component.resolve)
      })
      if (page.pages) {
        recur(page.pages)
      }
    })
  }
  recur(appDesc.pages)
  const componentList = componentsData.map(componentResolve => componentTemplate.replace(/<%=\s*componentSrc\s*%>/g, componentResolve)).join(',\n')
  componentMenifestData = menifestTemplate.replace('<%= componentList %>', componentList)
  await fs.writeFile(path.join(tmp, 'helpers/componentMenifest.js'), componentMenifestData)
  await fs.unlink(path.join(tmp, 'helpers/componentMenifest.jst'))

  // outputInitialState
}
