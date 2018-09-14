const webpack = require('webpack')
const webpackConfig = require('../config/webpack.prod')
const fs = require('fs-extra')
const paths = require('../config/paths')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const Gauge = require('gauge')

const gauge = new Gauge()

function build () {
  // 清空输出目录
  fs.emptyDirSync(paths.output)

  // 执行webpack构建
  const WebComplier = webpack(webpackConfig(undefined, {target: 'web'}))
  runComplier(WebComplier)
}

function runComplier(complier) {
  complier.apply(new ProgressPlugin((percentage, msg, ...args) => {
    gauge.show(`${msg} ${args[0] ? `| ${args[0]} |` : ''} memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB ${args[2] ? `| ${args[2].slice(-66)}` : ''}`, percentage)
  }))
  complier.run()
}

build()
