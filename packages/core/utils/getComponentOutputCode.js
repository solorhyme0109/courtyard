const fs = require('fs-extra')
const path = require('path')

module.exports = async (componentDist, componentConfig) => {
  const connectedComponentTemplate = await fs.readFile(path.join(__dirname, '../codeTemplates/conectedComponent.jst'), {encoding: 'utf8'})
  const replaceKeywordMap = {
    componentSource: componentDist,
    config: JSON.stringify(componentConfig)
  }
  const outputCode = connectedComponentTemplate.replace(/<%=\s*(\w+)\s*%>/g, (matched, grasp1) => replaceKeywordMap[grasp1])
  return outputCode
}
