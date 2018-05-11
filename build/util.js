'use strict'
var glob    = require('glob')
var path    = require('path')
var config  = require('./config.js');

var pageObj = {
    'demo'                  : { type: 'index', title: '组件用例' },
    'index'                 : { type: 'index', title: '首页' },
}

var util = {}

util.assetsPath = function (_path) {
  const assetsSubDirectory = config.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

util.title = function (name) {
    return pageObj[name] ? pageObj[name].title : '及时油'
}

util.urlType = function(name){
    return pageObj[name] ? pageObj[name].type : 'index'
}

util.getEntries = function (globPath) {
    var entries = {}
    // 读取src目录,并进行路径裁剪
    glob.sync(globPath).forEach(function (entry) {
        var tmp = entry.split('/').slice(-3)
        var moduleName = tmp.slice(1, 2);
        entries[moduleName] = entry
    });
    return entries;
}

util.trim = function (str) { 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

module.exports = util;