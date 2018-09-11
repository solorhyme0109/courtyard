const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../config/webpack.prod')
const util = require('util')
const fs = require('fs-extra')
const paths = require('../config/paths')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')

function build () {
  // 清空输出目录
  fs.emptyDirSync(paths.output)

  // 运行webpack构建
  const compiler = webpack(webpackConfig)
  compiler.run((error, stats) => {
    console.log(error, stats)
  })

}

build()
