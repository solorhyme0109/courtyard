const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const util = require('util')

const config = require('../config/runbuildConfig.json')

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
  recurPages(appDesc.pages, 'component', (component) => componentsData.push(component.resolve))
  const componentList = componentsData.map(componentResolve => componentTemplate.replace(/<%=\s*componentSrc\s*%>/g, componentResolve)).join(',\n')
  componentMenifestData = menifestTemplate.replace('<%= componentList %>', componentList)
  await fs.writeFile(path.join(tmp, 'helpers/componentMenifest.js'), componentMenifestData)
  await fs.unlink(path.join(tmp, 'helpers/componentMenifest.jst'))

  // output InitialState
  const initialState = {}
  recurPages(appDesc.pages, 'page', (page) => Object.assign(initialState, {[page.pageId]: page.store}))
  Object.assign(initialState, _.omit(config.app_JSON_omits))
  const initialStateTemplate = await fs.readFile(path.join(tmp, 'store/appInitialState.jst'), {encoding: 'utf8'})
  const initialStateData = initialStateTemplate.replace('<%= initialState %>', JSON.stringify(initialState))
  await fs.writeFile(path.join(tmp, 'store/appInitialState.js'), initialStateData)
  await fs.unlink(path.join(tmp, 'store/appInitialState.jst'))

  // output webpack config
  const webpackConfigTemplate = await fs.readFile(path.join(tmp, 'config/webpack.prod.jst'), {encoding: 'utf8'})
  const webpackTemplateDataMap = {
    connectedComponents: config.connectedComponentOutput,
    sourceComponents: config.componentSourceOutput,
    title: appDesc.title || ''
  }
  const webpackConfigData = webpackConfigTemplate.replace(/<%=\s*(\w+)\s*%>/g, (matched, graps1) => {
    const r = webpackTemplateDataMap[graps1]
    if (!r) throw new Error('keyword invalid in webpack.prod.js!')
    return r
  })
  await fs.writeFile(path.join(tmp, 'config/webpack.prod.js'), webpackConfigData)
  await fs.unlink(path.join(tmp, 'config/webpack.prod.jst'))

  // generate package.json
  const originPackageJSON = JSON.parse(await fs.readFile(path.join(tmp, 'package.json'), { encoding: 'utf8' }))
  const packageJSON = _.merge(originPackageJSON, {
    name: appDesc.appName,
    dependencies: Object.assign(
      {},
      appDesc.dependencies,
      config.appPackageJSON.dependencies
    )
  })
  await fs.writeFile(path.join(tmp, 'package.json'), JSON.stringify(packageJSON))

  // output appFrame to the output dir
  await fs.copy(tmp, config.runbuildOutput)
  await fs.remove(tmp)
}

function recurPages(pages, handleWhich, cb) {
  _.forEach(pages, (page) => {
    if (handleWhich === 'component') {
      _.forEach(page.components, (component) => {
        cb(component)
      })
    } else if (handleWhich === 'page') {
      cb(page)
    }
    if (page.pages) {
      recurPages(page.pages, handleWhich, cb)
    }
  })
}
