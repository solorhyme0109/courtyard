const paths = require('./paths')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (env, args) => 
{
  return (
    {
      mode: 'production',
      target: args['target'] || 'web',
      entry: paths.componentsEntry,
      output: {
        path: `${paths.output}/${args['target'] || 'web'}`,
        libraryTarget: 'commonjs2',
        filename: '[name]/index.js'
      },
      devtool: 'source-map',
      resolve: {
        extensions: [
          '.web.js',
          '.mjs',
          '.js',
          '.json',
          '.web.jsx',
          '.jsx'
        ]
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                test: [
                  /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
                ],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              }, {
                test: /\.(js|jsx|mjs)$/,
                // include: paths.componentsEntry,
                loader: require.resolve('babel-loader'),
                options: {
                  compact: true
                }
              }, {
                test: /\.css$|\.less$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  }, {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: true
                    }
                  }, {
                    loader: 'less-loader',
                    options: {
                      // less 变量注入
                      modifyVars: {}
                    }
                  }
                ]
              }, {
                loader: require.resolve('file-loader'),
                exclude: [
                  /\.(js|jsx|mjs)$/, /\.html$/, /\.json$/
                ],
                options: {
                  name: 'static/media/[name].[hash:8].[ext]'
                },
                // ** STOP ** Are you adding a new loader? Make sure to add the new loader(s)
                // before the 'file' loader.
              }
            ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output both options are
          // optional
          filename: '[name]/index.css',
          chunkFilename: '[id].css'
        })
      ],
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
          chunks: 'all',
          name: '_vendors'
        }
      },
      performance: {
        hints: 'warning'
      }
    }
  )
}
