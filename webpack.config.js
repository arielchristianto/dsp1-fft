var webpack = require('webpack');

module.exports = {
    entry: './app/src/js/index.js',
    output: {
        path: './app/',
        filename: 'index.bundle.js'
    },
    module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015']
              }
          }
      ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};