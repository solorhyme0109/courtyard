const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../config/webpack.prod')
const util = require('util')
const fs = require('fs-extra')
const paths = require('../config/paths')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const Gauge = require('gauge')

const gauge = new Gauge()

function build () {
  // 清空输出目录
  fs.emptyDirSync(paths.output)

  // 创建webpack complier, node环境和web 环境
  const complier = webpack(webpackConfig)
  runComplier(complier)
}

function runComplier(complier) {
  complier.apply(new ProgressPlugin((percentage, msg, ...args) => {
    gauge.show(`${msg} ${args[0] ? `| ${args[0]} |` : ''} memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB ${args[2] ? `| ${args[2].slice(-66)}` : ''}`, percentage)
  }))
  complier.run((err, stats) => {
    console.log()
    console.log(err)
  })
}

build()
