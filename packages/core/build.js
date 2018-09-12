const loadAppDesc = require('./utils/loadAppDesc')

async function main() {
  // 获取应用描述文件, 加载app.json
  const appDesc = await loadAppDesc()

}

main()
