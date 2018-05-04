'use strict'

var path = require('path')

var config = {
  dev: {
    // Paths
    assetsRoot: path.resolve(__dirname, './dist/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Various Dev Server settings
    host: 'localhost', 
    port: 8080,
  },
}

module.exports = config