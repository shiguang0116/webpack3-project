/**
 * @description: 配置文件通用工具
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-01-09 11:36:54 
 */
'use strict';

const glob    = require('glob');
const path    = require('path');
const config  = require('./config.js');

const util = {};

util.assetsPath = function (_path) {
    const assetsSubName = config.assetsSubName || '';
    return path.posix.join(assetsSubName, _path);
};

util.title = function (name) {
    const pageObj = config.pagesObj[name];
    return pageObj ? pageObj.title : 'webpack项目';
};

// 获取入口文件
util.getEntries = function (globPath) {
    let entries = {};
    glob.sync(globPath).forEach(function (entry) {
        let tmp = entry.split('/').slice(-2);
        let moduleName = tmp.slice(0, 1);
        entries[moduleName] = entry;
    });
    return entries;
};

module.exports = util;