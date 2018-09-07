const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../config/webpack.prod')
const util = require('util')

async function build () {
  const compiler = webpack(webpackConfig)

  compiler.run((error, stats) => {
    console.log(error, stats)
  })

}

build()
