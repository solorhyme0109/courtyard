const loadAppDesc = require('./utils/loadAppDesc')
const genAllComponentsFile =  require('./utils/genAllComponentsFile')
const buildAppFrame = require('./utils/buildAppFrame')

async function main() {
  // Load app.json, get App description file
  const appDesc = await loadAppDesc()

  // Generate all component files
  await genAllComponentsFile(appDesc)

  // Generate app code
  await buildAppFrame(appDesc)

}

main()
