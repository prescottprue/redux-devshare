'use strict'
var webpack = require('webpack')
var pkg = require('./package.json')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: [ /node_modules/ ] },
      { test: /\.json$/, loaders: [ 'json' ], exclude: [] }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('<%= appName %>.js v' + pkg.version + ' | (c) <%= githubUser %>', {raw: false, entryOnly: true})
  ],
  output: {
    library: '<%= capitalAppName %>',
    libraryTarget: 'umd',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js']
  }
}
