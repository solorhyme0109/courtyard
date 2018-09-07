const paths = require('./paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssFilename = 'static/css/[name].[contenthash:8].css';

module.exports = {
  mode: 'production',
  entry: paths.componentsEntry,
  output: {
    path: paths.output,
    libraryTarget: "commonjs2",
    filename: '[name]/index.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx|mjs)$/,
        // include: paths.componentsEntry,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
      {
        test: /\.css$|\.less$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader:'less-loader',
                  options: {
                    // less 变量注入
                    modifyVars: {}
                  }
                }
              ]
            },
          )
        ),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },

      {
        loader: require.resolve('file-loader'),
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ]
}
